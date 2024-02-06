// import { useNavigate } from 'react-router-dom';
// import EION from '/assets/images/eion-logo.png';

import { CardsObtained, Team, VideoStore } from "../components"

export function Shop() {
    // const navigate = useNavigate();

    return (
      <>
        <div className="bg-[#0D0D0D] flexcenter h-screen">
            <Team />
        </div>
        <CardsObtained />
        <VideoStore />
      </>
  );
}
