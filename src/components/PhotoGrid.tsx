import { useEffect, useState, useRef } from 'react';
import { storageService } from '@/lib/storage';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton';

interface PhotoGridProps {
  folderPath: string;
}

interface Photo {
  id: string;
  name: string;
  path: string;
  thumbnailUrl?: string;
  lastModified: Date;
}

export default function PhotoGrid({ folderPath }: PhotoGridProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const newPhotos = await storageService.listFiles(folderPath);
      setPhotos(prev => [...prev, ...newPhotos]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [folderPath]);

  useEffect(() => {
    if (inView && !loading) {
      loadPhotos();
    }
  }, [inView]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {photos.map((photo, index) => (
        <div key={photo.id} className="relative group">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            {photo.thumbnailUrl ? (
              <img
                src={photo.thumbnailUrl}
                alt={photo.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-sm">{photo.name}</p>
            <p className="text-white/80 text-xs">{formatDate(photo.lastModified)}</p>
          </div>
        </div>
      ))}
      
      {/* Loading indicator */}
      <div ref={ref} className="h-20 flex items-center justify-center">
        {loading && <Skeleton className="w-8 h-8 rounded-full" />}
      </div>
    </div>
  );
} 