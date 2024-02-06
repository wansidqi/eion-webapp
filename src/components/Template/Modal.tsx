import { useRef, useEffect, useState } from 'react';

export function VaultCardPreview(): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false); ///replace with your state modal

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
            <div className="flexcenter-col absolute bottom-1/2 left-1/2 right-1/2 top-1/2">{/* content here */}</div>
          </div>
        </>
      )}
    </div>
  );
}
