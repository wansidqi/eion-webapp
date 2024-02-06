import { useEffect, useRef } from 'react';
import { useBoundStore } from '../../store';
import html2canvas from 'html2canvas';

export function ShareDraftModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const { playmat, setPlaymatState } = useBoundStore();
  const { showShare, screenshotCanvas } = playmat;

  // const getBase64FromUrl = async (url: any) => {
  //   const img = new Image();
  //   img.crossOrigin = 'anonymous';
  //   img.src = `${url}?__v=${Date.now()}`;
  //   return new Promise(resolve => {
  //     img.onload = function () {
  //       const canvas = document.createElement('canvas');
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const ctx = canvas.getContext('2d');
  //       ctx?.drawImage(img, 0, 0);
  //       const base64String = canvas.toDataURL('image/png');
  //       resolve(base64String);
  //     };
  //   });
  // };

  const handleScreenshot = async () => {
    const elementToCapture = document.getElementById('screenshot');
    if (elementToCapture) {
      const canvas = await html2canvas(elementToCapture, {
        useCORS: true,
        allowTaint: true,
        // proxy:'https://d3bmt85musy2ue.cloudfront.net',
        // onclone: async (_, html) => {
        //   const images = html.querySelectorAll('img');
        //   for await (const img of images) {
        //     if (img.src.includes('data:image')) continue;
        //     console.log(img.src);

        //     if (img.src === undefined || img.src === null) continue;
        //     img.src = (await getBase64FromUrl(img.src)) as string;
        //   }
        // },
      });
      setPlaymatState({ screenshotCanvas: canvas });
    }
  };

  useEffect(() => {
    if (showShare) {
      document.body.style.overflowY = 'hidden';
      handleScreenshot();
    } else {
      document.body.style.overflowY = 'scroll';
    }

    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setPlaymatState({ showShare: false });
      }
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [showShare]);

  const handleDownload = () => {
    if (screenshotCanvas) {
      screenshotCanvas.toBlob(blob => {
        const downloadLink = document.createElement('a');
        downloadLink.download = 'my-draft.png'; // Set the desired file name
        downloadLink.href = URL.createObjectURL(blob as any);
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
        setPlaymatState({ showShare: false });
      }, 'image/png');
    }
  };

  return (
    <div>
      {showShare && (
        <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-50">
          <div className="w-full bg-opacity-90 text-[16px]">
            <div className="flexcenter mb-10 text-[16px]"></div>

            <div className="absolute right-1/2 top-1/2 flex -translate-y-1/2 translate-x-1/2 flex-col items-center border border-[#0185FF] bg-[#242424] px-20">
              <b className="roboto-condensed my-5">Share</b>
              {screenshotCanvas && (
                <div className="flexcenter" id="draftShareImg">
                  <img
                    src={screenshotCanvas.toDataURL('image/png')}
                    alt="Draft Screenshot"
                    style={{ width: '80%', height: '80%' }}
                  />
                </div>
              )}
              <button onClick={handleDownload} className="blue-radial my-10 rounded-sm px-8 py-2">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
