import { useState, useEffect } from 'react';
import { ref, onValue, Database } from 'firebase/database';
import { database } from '@/lib/firebase';

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  order?: number;
}

export interface Work {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  order?: number;
}

export interface Video {
  id: string;
  title: string;
  embedUrl: string;
  description: string;
  order?: number;
}

export const useGalleryImages = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const imagesRef = ref(database, 'gallery');
    
    const unsubscribe = onValue(
      imagesRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const imagesList = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            // Sort by order if available
            imagesList.sort((a, b) => (a.order || 0) - (b.order || 0));
            setImages(imagesList);
          } else {
            setImages([]);
          }
          setLoading(false);
        } catch (err) {
          setError('Failed to load gallery images');
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { images, loading, error };
};

export const useWorks = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const worksRef = ref(database, 'works');
    
    const unsubscribe = onValue(
      worksRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const worksList = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            // Sort by order if available
            worksList.sort((a, b) => (a.order || 0) - (b.order || 0));
            setWorks(worksList);
          } else {
            setWorks([]);
          }
          setLoading(false);
        } catch (err) {
          setError('Failed to load works');
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { works, loading, error };
};

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const videosRef = ref(database, 'videos');
    
    const unsubscribe = onValue(
      videosRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const videosList = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            // Sort by order if available
            videosList.sort((a, b) => (a.order || 0) - (b.order || 0));
            setVideos(videosList);
          } else {
            setVideos([]);
          }
          setLoading(false);
        } catch (err) {
          setError('Failed to load videos');
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { videos, loading, error };
};

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  status: 'new' | 'read';
}

export const useContactLeads = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const contactsRef = ref(database, 'contacts');
    
    const unsubscribe = onValue(
      contactsRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const leadsList = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            // Sort by timestamp, newest first
            leadsList.sort((a, b) => b.timestamp - a.timestamp);
            setLeads(leadsList);
          } else {
            setLeads([]);
          }
          setLoading(false);
        } catch (err) {
          setError('Failed to load contact leads');
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { leads, loading, error };
};
