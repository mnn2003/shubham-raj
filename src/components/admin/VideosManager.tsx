import { useState } from 'react';
import { ref, push, remove } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, storage } from '@/lib/firebase';
import { useVideos } from '@/hooks/useFirebaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Trash2, Upload } from 'lucide-react';

const VideosManager = () => {
  const { videos } = useVideos();
  const [newVideo, setNewVideo] = useState({
    title: '',
    embedUrl: '',
    description: ''
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newVideo.title || (!videoFile && !newVideo.embedUrl)) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      let videoUrl = newVideo.embedUrl;

      // If file is uploaded, upload to Firebase Storage
      if (videoFile) {
        const fileRef = storageRef(storage, `videos/${Date.now()}_${videoFile.name}`);
        await uploadBytes(fileRef, videoFile);
        videoUrl = await getDownloadURL(fileRef);
      }

      await push(ref(database, 'videos'), {
        title: newVideo.title,
        embedUrl: videoUrl,
        description: newVideo.description,
        order: videos.length
      });
      toast.success('Video added successfully!');
      setNewVideo({ title: '', embedUrl: '', description: '' });
      setVideoFile(null);
    } catch (error) {
      toast.error('Failed to add video');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(database, `videos/${id}`));
      toast.success('Video deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold">Manage Videos</h2>
      
      <div className="space-y-4 border-b border-border pb-6">
        <h3 className="text-xl font-semibold">Add New Video</h3>
        <div className="space-y-4">
          <div>
            <Label>Title *</Label>
            <Input
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Upload Video File</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="flex-1"
              />
              {videoFile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVideoFile(null)}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          <div className="text-center text-muted-foreground">- OR -</div>
          <div>
            <Label>YouTube Embed URL</Label>
            <Input
              value={newVideo.embedUrl}
              onChange={(e) => setNewVideo({ ...newVideo, embedUrl: e.target.value })}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              disabled={!!videoFile}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={newVideo.description}
              onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            />
          </div>
        </div>
        <Button 
          onClick={handleAdd} 
          disabled={loading}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Upload className="mr-2" size={16} />
          {loading ? 'Adding...' : 'Add Video'}
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Current Videos</h3>
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-secondary/50 p-4 rounded-lg flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-bold text-lg">{video.title}</h4>
                {video.description && <p className="text-sm mt-2">{video.description}</p>}
                <p className="text-xs text-muted-foreground mt-2">{video.embedUrl}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(video.id)}
              >
                <Trash2 size={20} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosManager;
