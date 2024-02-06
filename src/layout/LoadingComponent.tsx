import eion from '/assets/images/eion-icon.png';

export function LoadingComponent() {
  return (
    <div className="flexcenter h-screen bg-black">
      <img src={eion} className="h-24" alt="" />
      {/* <div className="loading-animation" /> */}
    </div>
  );
}
