import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '../../store';
import video from '/assets/video/vid.mp4';
import { LoadingComponent } from '../../layout';

export function VideoStore() {
  const { store, setStoreState } = useBoundStore();
  const { showVideo, showOpenImage } = store;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const closeVideo = () => {
    setIsVideoPlaying(false);
    setIsVideoFinished(false);
    setStoreState({ showVideo: false, buy: false, cardObtained: true });
  };

  useEffect(() => {
    if (isVideoFinished) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      closeVideo();
    }
  }, [isVideoFinished]);

  useEffect(() => {
    setIsVideoPlaying(false);
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }
    return () => {
      setIsVideoPlaying(false);
    };
  }, []);

  useEffect(() => {
    if (showVideo) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [showVideo]);

  const handleVideoEnded = () => {
    setIsVideoFinished(true);
    setIsVideoPlaying(false); // Video has finished, so reset video playing state
  };

  const handlePlayAgain = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsVideoFinished(false);
      setIsVideoPlaying(true); // Video is played again, update video playing state
      videoRef.current.play();
    }
  };

  return (
    <div className="absolute left-0 top-0 z-50 max-h-screen w-full overflow-hidden bg-black">
      {showVideo && (
        <>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              {!isVideoPlaying && (
                <button
                  onClick={handlePlayAgain}
                  className="absolute bottom-1/2 right-1/2 top-1/2 z-20 translate-x-1/2"
                >
                  <Button />
                </button>
              )}
              {/* <div className="roboto-condensed absolute top-10 pl-5 pt-5 text-[16px]">1/10</div> */}
              {isVideoPlaying && (
                <button onClick={closeVideo} className="roboto-condensed absolute bottom-20 right-5 z-20 text-[16px]">
                  <div className="flexcenter gap-2">
                    <p>SKIP ALL</p>
                    {skip}
                  </div>
                </button>
              )}
              <video
                ref={videoRef}
                onEnded={handleVideoEnded}
                className={` min-h-[100vh] w-screen ${showOpenImage ? 'hidden' : ''}`}
                controls={false}
                // autoPlay={false}
                playsInline
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          )}
        </>
      )}
    </div>
  );
}

const Button = () => {
  return (
    <svg width="147" height="83" viewBox="0 0 147 83" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_486_579)">
        <g filter="url(#filter1_d_486_579)">
          <mask id="path-1-inside-1_486_579" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M141 15.5V41.5V64L74.0114 77L6 64V41.5V15.5L74 6L141 15.5Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M141 15.5V41.5V64L74.0114 77L6 64V41.5V15.5L74 6L141 15.5Z"
            fill="#726565"
          />
          <path
            d="M141 15.5H141.633V14.9505L141.089 14.8734L141 15.5ZM141 64L141.121 64.6213L141.633 64.5219V64H141ZM74.0114 77L73.8925 77.6217L74.0123 77.6445L74.1319 77.6213L74.0114 77ZM6 64H5.36709V64.5234L5.88117 64.6217L6 64ZM6 15.5L5.91243 14.8732L5.36709 14.9494V15.5H6ZM74 6L74.0889 5.37336L74.0007 5.36085L73.9124 5.37318L74 6ZM141.633 41.5V15.5H140.367V41.5H141.633ZM140.367 41.5V64H141.633V41.5H140.367ZM140.879 63.3787L73.8908 76.3787L74.1319 77.6213L141.121 64.6213L140.879 63.3787ZM74.1302 76.3783L6.11883 63.3783L5.88117 64.6217L73.8925 77.6217L74.1302 76.3783ZM6.63291 64V41.5H5.36709V64H6.63291ZM5.36709 15.5V41.5H6.63291V15.5H5.36709ZM73.9124 5.37318L5.91243 14.8732L6.08757 16.1268L74.0876 6.62682L73.9124 5.37318ZM141.089 14.8734L74.0889 5.37336L73.9111 6.62664L140.911 16.1266L141.089 14.8734Z"
            fill="url(#paint0_linear_486_579)"
            mask="url(#path-1-inside-1_486_579)"
          />
        </g>
      </g>
      <g filter="url(#filter2_d_486_579)">
        <g filter="url(#filter3_d_486_579)">
          <mask id="path-3-inside-2_486_579" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M136 20V40.0186V60.0371L74.1248 71.5L12 60.0371V40.0186V20L74 10.5L136 20Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M136 20V40.0186V60.0371L74.1248 71.5L12 60.0371V40.0186V20L74 10.5L136 20Z"
            fill="#2754F3"
            fillOpacity="0.8"
            shapeRendering="crispEdges"
          />
          <path
            d="M136 20H136.316V19.7284L136.048 19.6872L136 20ZM136 60.0371L136.058 60.3482L136.316 60.3003V60.0371H136ZM74.1248 71.5L74.0674 71.8112L74.1249 71.8218L74.1825 71.8112L74.1248 71.5ZM12 60.0371H11.6835V60.3005L11.9426 60.3483L12 60.0371ZM12 20L11.9521 19.6872L11.6835 19.7284V20H12ZM74 10.5L74.0479 10.1872L74 10.1799L73.9521 10.1872L74 10.5ZM136.316 40.0186V20H135.684V40.0186H136.316ZM135.684 40.0186V60.0371H136.316V40.0186H135.684ZM135.942 59.7259L74.0672 71.1888L74.1825 71.8112L136.058 60.3482L135.942 59.7259ZM74.1823 71.1888L12.0574 59.7259L11.9426 60.3483L74.0674 71.8112L74.1823 71.1888ZM12.3165 60.0371V40.0186H11.6835V60.0371H12.3165ZM11.6835 20V40.0186H12.3165V20H11.6835ZM73.9521 10.1872L11.9521 19.6872L12.0479 20.3128L74.0479 10.8128L73.9521 10.1872ZM136.048 19.6872L74.0479 10.1872L73.9521 10.8128L135.952 20.3128L136.048 19.6872Z"
            fill="white"
            mask="url(#path-3-inside-2_486_579)"
          />
        </g>
      </g>
      <path
        d="M60.2387 39.7871V42.1602C60.2387 43.1628 60.115 44.0417 59.8676 44.7969C59.6267 45.5456 59.2816 46.1738 58.8324 46.6816C58.3897 47.1829 57.8526 47.5605 57.2211 47.8145C56.5961 48.0684 55.9027 48.1953 55.141 48.1953C54.3793 48.1953 53.6827 48.0684 53.0512 47.8145C52.4262 47.5605 51.8858 47.1829 51.4301 46.6816C50.9809 46.1738 50.6326 45.5456 50.3852 44.7969C50.1378 44.0417 50.0141 43.1628 50.0141 42.1602V39.7871C50.0141 38.7585 50.1345 37.86 50.3754 37.0918C50.6163 36.3171 50.9646 35.6725 51.4203 35.1582C51.876 34.6374 52.4164 34.2467 53.0414 33.9863C53.6664 33.7194 54.3598 33.5859 55.1215 33.5859C55.8832 33.5859 56.5766 33.7194 57.2016 33.9863C57.8266 34.2467 58.3669 34.6374 58.8227 35.1582C59.2784 35.6725 59.6267 36.3171 59.8676 37.0918C60.115 37.86 60.2387 38.7585 60.2387 39.7871ZM57.3969 42.1602V39.7676C57.3969 39.0905 57.348 38.5143 57.2504 38.0391C57.1527 37.5573 57.0063 37.1634 56.8109 36.8574C56.6156 36.5514 56.378 36.3268 56.098 36.1836C55.8181 36.0404 55.4926 35.9688 55.1215 35.9688C54.7504 35.9688 54.4216 36.0404 54.1352 36.1836C53.8552 36.3268 53.6176 36.5514 53.4223 36.8574C53.2335 37.1634 53.0902 37.5573 52.9926 38.0391C52.9014 38.5143 52.8559 39.0905 52.8559 39.7676V42.1602C52.8559 42.8112 52.9047 43.3678 53.0023 43.8301C53.1 44.2923 53.2465 44.6699 53.4418 44.9629C53.6371 45.2559 53.8747 45.474 54.1547 45.6172C54.4411 45.7539 54.7699 45.8223 55.141 45.8223C55.5056 45.8223 55.8279 45.7539 56.1078 45.6172C56.3943 45.474 56.6319 45.2559 56.8207 44.9629C57.0095 44.6699 57.1527 44.2923 57.2504 43.8301C57.348 43.3678 57.3969 42.8112 57.3969 42.1602ZM68.2625 42.9902H65.3523V40.6172H68.2625C68.6661 40.6172 68.9949 40.526 69.2488 40.3438C69.5092 40.1615 69.698 39.9108 69.8152 39.5918C69.9324 39.2663 69.991 38.9017 69.991 38.498C69.991 38.0879 69.9292 37.707 69.8055 37.3555C69.6883 36.9974 69.5027 36.7077 69.2488 36.4863C69.0014 36.265 68.6727 36.1543 68.2625 36.1543H66.2703V48H63.4188V33.7812H68.2625C69.2195 33.7812 70.0431 33.9831 70.7332 34.3867C71.4233 34.7904 71.9507 35.347 72.3152 36.0566C72.6863 36.7598 72.8719 37.5671 72.8719 38.4785C72.8719 39.3965 72.6863 40.194 72.3152 40.8711C71.9507 41.5417 71.4233 42.0625 70.7332 42.4336C70.0431 42.8047 69.2195 42.9902 68.2625 42.9902ZM84.0402 45.6367V48H77.8586V45.6367H84.0402ZM78.7473 33.7812V48H75.8859V33.7812H78.7473ZM83.2102 39.543V41.8379H77.8586V39.543H83.2102ZM84.0207 33.7812V36.1543H77.8586V33.7812H84.0207ZM96.7516 33.7812V48H93.9879L89.525 39.1035V48H86.8102V33.7812H89.5348L94.0367 42.7754V33.7812H96.7516Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_486_579"
          x="0"
          y="0"
          width="147"
          height="83"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.151076 0 0 0 0 0.327756 0 0 0 0 0.954167 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_486_579" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_486_579" result="shape" />
        </filter>
        <filter
          id="filter1_d_486_579"
          x="3.46836"
          y="3.46836"
          width="140.063"
          height="76.0633"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.26582" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_486_579" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_486_579" result="shape" />
        </filter>
        <filter
          id="filter2_d_486_579"
          x="3"
          y="1.5"
          width="142"
          height="79"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.00416666 0 0 0 0 0.522 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_486_579" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_486_579" result="shape" />
        </filter>
        <filter
          id="filter3_d_486_579"
          x="9.46836"
          y="7.96836"
          width="129.063"
          height="66.0633"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.26582" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_486_579" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_486_579" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_486_579" x1="73.5" y1="6" x2="73.5" y2="77" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const skip = (
  <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0.375V14.625L9.5 7.5L0 0.375ZM9.5 7.5V14.625L19 7.5L9.5 0.375V7.5Z" fill="#B6B6B6" />
  </svg>
);
