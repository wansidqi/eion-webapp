import { useEffect } from 'react';
import { useRepositories } from '../repositories';
// import EION from '/assets/images/EION LOGO.png';
import crystal from '/assets/images/favicon.png';
import { TbPointFilled } from "react-icons/tb";
import { BsDiscord } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { Link } from 'react-router-dom';

export function SuccessGoogle() {
  const { usePostGoogleLogin } = useRepositories();
  const { refetch} = usePostGoogleLogin();

  useEffect(() => {
      refetch();
  }, []);

  // const refetchGoogle = () => {
  //   refetch();
  // };

  return (
    <div className="flexcenter test authentication-bg">
      <div className="roboto-condensed flexcenter-col mx-5 text-[16px] lg:w-1/2 ">
        <div className="justify-center items-center flex flex-col rounded-md px-4 py-6 lg:px-20 ">
          <img className="mb-5" width={100} src={crystal} alt="" />
          <p>Authenticating</p>
          <div className='mt-4 text-left'>
            <p>Please wait while we redirect you to your page. If it takes longer than expected, please try these steps:</p>
            <p className='flex items-center gap-2 ml-2'><TbPointFilled/>Clearing your caches</p>
            <p className='flex items-center gap-2 ml-2'><TbPointFilled/>Using incognito mode</p>
            <p className='flex items-center gap-2 ml-2'><TbPointFilled/>Trying a different browser</p>
            <p className='flex items-center gap-2 ml-2'><TbPointFilled />Contact support at:</p>
            <div className='flex flex-row items-center ml-8 gap-4 mt-2'>
              <Link to={'https://discord.gg/W2UfXf7NsU'} target="_blank">
                <BsDiscord className="bg-[#232323] text-[2.5rem] p-2 rounded-md" />
              </Link>
              <Link to={'mailto:support@eion.gg'} target="_blank">
                <IoMdMail className="bg-[#232323] text-[2.5rem] p-2 rounded-md"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}