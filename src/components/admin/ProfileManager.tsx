import { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    email: '',
    phone: '',
    imageUrl: '',
    social: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedin: ''
    }
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const profileRef = ref(database, 'profile');
    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      }
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      let updatedProfile = { ...profile };

      // If image file is uploaded, upload to Firebase Storage
      if (imageFile) {
        const fileRef = storageRef(storage, `profile/${Date.now()}_${imageFile.name}`);
        await uploadBytes(fileRef, imageFile);
        const imageUrl = await getDownloadURL(fileRef);
        updatedProfile.imageUrl = imageUrl;
      }

      await set(ref(database, 'profile'), updatedProfile);
      setProfile(updatedProfile);
      setImageFile(null);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Age</Label>
          <Input
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Height</Label>
          <Input
            value={profile.height}
            onChange={(e) => setProfile({ ...profile, height: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Phone</Label>
          <Input
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Profile Image</h3>
        {profile.imageUrl && (
          <div className="mb-4">
            <img 
              src={profile.imageUrl} 
              alt="Current profile" 
              className="w-40 h-40 object-cover rounded-lg border border-border"
            />
          </div>
        )}
        
        <div>
          <Label>Upload New Profile Image</Label>
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
            value={profile.imageUrl}
            onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
            disabled={!!imageFile}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Social Media</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Instagram URL</Label>
            <Input
              value={profile.social.instagram}
              onChange={(e) => setProfile({ 
                ...profile, 
                social: { ...profile.social, instagram: e.target.value }
              })}
            />
          </div>
          
          <div>
            <Label>Facebook URL</Label>
            <Input
              value={profile.social.facebook}
              onChange={(e) => setProfile({ 
                ...profile, 
                social: { ...profile.social, facebook: e.target.value }
              })}
            />
          </div>
          
          <div>
            <Label>Twitter URL</Label>
            <Input
              value={profile.social.twitter}
              onChange={(e) => setProfile({ 
                ...profile, 
                social: { ...profile.social, twitter: e.target.value }
              })}
            />
          </div>
          
          <div>
            <Label>LinkedIn URL</Label>
            <Input
              value={profile.social.linkedin}
              onChange={(e) => setProfile({ 
                ...profile, 
                social: { ...profile.social, linkedin: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      <Button 
        onClick={handleSave} 
        disabled={loading}
        className="bg-gradient-primary hover:opacity-90"
      >
        <Upload className="mr-2" size={16} />
        {loading ? 'Saving...' : 'Save Profile'}
      </Button>
    </div>
  );
};

export default ProfileManager;
