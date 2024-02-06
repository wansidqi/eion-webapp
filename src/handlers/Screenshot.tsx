import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';

export function UseScreenshotHandler() {
  const [imageURL, setImageURL] = useState<string | null>(null);

  const captureComponent = async () => {
    const component = document.getElementById('screenshot');

    if (component) {
      try {
        const canvas = await html2canvas(component);
        const imgData = canvas.toDataURL('image/png');
        setImageURL(imgData);
      } catch (error) {
        console.error('Error capturing component:', error);
      }
    }
  };

  useEffect(() => {
    captureComponent();
  }, []);

  return { imageURL, captureComponent };
}
