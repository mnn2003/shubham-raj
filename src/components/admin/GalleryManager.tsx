import { useState } from 'react';
import { ref, push, remove } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { database, storage } from '@/lib/firebase';
import { useGalleryImages } from '@/hooks/useFirebaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Trash2, Upload } from 'lucide-react';

const GalleryManager = () => {
  const { images } = useGalleryImages();
  const [newImage, setNewImage] = useState({ url: '', alt: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingSize, setUploadingSize] = useState({ current: 0, total: 0 });

  const handleAdd = async () => {
    if (!imageFile && !newImage.url) {
      toast.error('Please upload an image or provide a URL');
      return;
    }
    if (!newImage.alt) {
      toast.error('Please provide alt text');
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    try {
      let imageUrl = newImage.url;

      // If file is uploaded, upload to Firebase Storage with progress tracking
      if (imageFile) {
        const fileRef = storageRef(storage, `gallery/${Date.now()}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, imageFile);
        
        setUploadingSize({ current: 0, total: imageFile.size });

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
              setUploadingSize({
                current: snapshot.bytesTransferred,
                total: snapshot.totalBytes
              });
            },
            (error) => reject(error),
            () => resolve(null)
          );
        });

        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }

      await push(ref(database, 'gallery'), {
        url: imageUrl,
        alt: newImage.alt,
        order: images.length
      });
      toast.success('Image added successfully!');
      setNewImage({ url: '', alt: '' });
      setImageFile(null);
      setUploadProgress(0);
      setUploadingSize({ current: 0, total: 0 });
    } catch (error) {
      toast.error('Failed to add image');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(database, `gallery/${id}`));
      toast.success('Image deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold">Manage Gallery</h2>
      
      <div className="space-y-4 border-b border-border pb-6">
        <h3 className="text-xl font-semibold">Add New Image</h3>
        <div className="space-y-4">
          <div>
            <Label>Upload Image File</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="flex-1"
              />
              {imageFile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setImageFile(null)}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          <div className="text-center text-muted-foreground">- OR -</div>
          <div>
            <Label>Image URL</Label>
            <Input
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              disabled={!!imageFile}
            />
          </div>
          <div>
            <Label>Alt Text *</Label>
            <Input
              value={newImage.alt}
              onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
              placeholder="Description of the image"
            />
          </div>
        </div>
        {loading && imageFile && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>
                {(uploadingSize.current / 1024 / 1024).toFixed(2)} MB / {(uploadingSize.total / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              {uploadProgress.toFixed(0)}% complete
            </p>
          </div>
        )}
        <Button 
          onClick={handleAdd} 
          disabled={loading}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Upload className="mr-2" size={16} />
          {loading ? 'Adding...' : 'Add Image'}
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Current Images</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 size={20} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{image.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
