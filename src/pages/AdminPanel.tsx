import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logOut } from '@/lib/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ProfileManager from '@/components/admin/ProfileManager';
import GalleryManager from '@/components/admin/GalleryManager';
import WorksManager from '@/components/admin/WorksManager';
import VideosManager from '@/components/admin/VideosManager';
import ContactLeadsManager from '@/components/admin/ContactLeadsManager';

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await logOut();
    if (error) {
      toast.error(error);
    } else {
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="works">Works</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="works">
            <WorksManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideosManager />
          </TabsContent>

          <TabsContent value="leads">
            <ContactLeadsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
