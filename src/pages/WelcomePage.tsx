import { useNavigate } from 'react-router-dom';
import EION from '/assets/images/eion-logo.png';

export function Welcome() {
    const navigate = useNavigate();

  return (
    <div className="authentication-bg flexcenter">
        <div className="flexcenter ">
          <div className="roboto-condensed flexcenter-col mx-10 h-[80vh] text-left text-[16px] lg:w-1/2 ">
            <div className="bg-congrats rounded-md border border-[#0185FF] px-4 py-6 lg:px-20">
              <img className="" width={'400px'} src={EION} alt="" />
              <b>
                Welcome to EION
              </b>
              <p className="my-5">
                Get ready to dive into the world of Esports fantasy gaming. Collect cards, build your dream team, and dominate the league!
              </p>
              <p className="my-5">
                You've been granted <span className='font-bold'>Three Trial Packs</span> to kick start your experience.
              </p>
              <p className="my-5">
                Click "<span className='font-bold'>ENTER</span> to begin your adventure!
              </p>
              <button className="signup-btn w-full py-1" onClick={() => navigate('/store')}>
                ENTER
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
