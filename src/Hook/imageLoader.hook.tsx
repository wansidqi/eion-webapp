import { useEffect, useState } from 'react';

interface BlurryLoadingImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const UseImageLoader = ({ src, alt = '', className }: BlurryLoadingImageProps) => {
  const [currentImage, setCurrentImage] = useState(src);
  const [loading, setLoading] = useState(true);

  const fetchImage = (src: string) => {
    const loadingImage = new Image();
    loadingImage.src = src;
    loadingImage.onload = () => {
      setCurrentImage(loadingImage.src);
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchImage(src);
  }, [src]);

  return (
    <img
      style={{
        filter: `${loading ? 'blur(20px)' : ''}`,
        transition: '0.8s filter linear',
        background: 'transparent',
      }}
      src={currentImage}
      alt={alt}
      className={className}
    />
  );
};
