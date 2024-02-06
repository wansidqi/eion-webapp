import { Link } from 'react-router-dom';

export function MobileDevice() {
  return (
    <div className="scrollbar-hidden overflow-hidden">
      <div className="fixed inset-0 z-50 hidden h-screen w-full min-w-[100wh] md:block">
        <div className="desktop-bg flexcenter">
          <div className="blue-radial w-[70%] p-[0.01rem] lg:w-[60%] 2xl:w-[40%]">
            <div className="black-wood-desktop roboto-condensed flex flex-col py-4 text-[16px] md:px-12 xl:px-20 2xl:px-28">
              <b className="my-4 text-[20px]">NOTICE</b>
              <p className="mb-4">
                Game Access Limited to{' '}
                <span className="font-extrabold">
                  <b>Mobile Phones </b>
                </span>
                Only
              </p>
              <div className="flex flex-col gap-2 text-justify">
                <p className="my-10">Dear valued player,</p>
                <p>The Eion Dashboard play.eion.gg is exclusively available and limited to mobile view only.</p>
                <p>
                  Our team is working diligently to optimize the game for desktop usage, but for the time being, you can
                  enjoy the full experience on your mobile devices.
                </p>
                <p>We appreciate your understanding. Thank you for your continued support.</p>
                <p>See you in the game!</p>
              </div>
              <div className="metal flexcenter my-12 w-full">
                <Link className="w-full" to={import.meta.env.VITE_EION_WEB}>
                  <button className="blue-radial-btn h-full w-full py-2">DISMISS</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
