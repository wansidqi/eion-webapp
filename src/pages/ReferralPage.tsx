import { useState } from 'react';
import { Navigation } from '../layout';
import diamond from '/assets/images/Store/diamond.png';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';
import { InfoReferral } from '../components/referral/infoReferral';
import { EarnShardsWindow } from '../components';

export function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const { useGetReferral } = useRepositories();
  const user = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user;

  const { data } = useGetReferral(user.id);

  // const link = `localhost:5173/register/referral/${user.username}`;
  const link = `https://play.eion.gg/register/referral/${user.username}`;

  const shortName = (name: string) => (name?.length > 12 ? name.slice(0, 26) + '...' : name);

  const copyToClipboard = (e: any) => {
    try {
      const textarea = document.createElement('textarea');
      // textarea.value = 'play.eion.gg/register/userID';
      textarea.value = link;

      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand('copy');

      document.body.removeChild(textarea);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error: any) {
      alert(error.message);
    }
    e.preventDefault();
  };

  return (
    <>
      <EarnShardsWindow />
      <Navigation />
      <div className="home-bg flex h-screen flex-col items-center justify-center gap-4 px-4">
        <InfoReferral />
        <div className="mx-4 w-full bg-[#242424] bg-opacity-60">
          <div className="flex w-full flex-col">
            <div className="refbgcolor w-full">
              <p className="deadjim px-2 py-2 text-center text-[16px]">REFER A FRIEND</p>
            </div>
            <form className="roboto-condensed mx-2 my-5 flex flex-col items-center justify-center  text-base">
              <p className="text-base">
                Get a friend to register with your personal link and gain{' '}
                <span className="roboto-condensed-bold">
                  <b>1000 </b>
                </span>
                Shards!
              </p>
              <div className="roboto-condensed my-2 flex w-full items-center justify-between border-2 border-[#0185FF] bg-[#1E1E1E] px-2 py-2 text-left text-base text-white">
                <p className="ml-3">{shortName(link)}</p>
                <button onClick={copyToClipboard} className="blue-radial my-2 mr-3 px-6 py-1">
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="my-2 w-[90%]">
                <div className="flex justify-between">
                  <p>{`User(s) Referred:`}</p>
                  <p>{data?.referee.length}</p>
                </div>
                <div className="-mr-4 flex justify-between">
                  <p>Shards Received:</p>
                  <p className="flex">
                    {data?.points}
                    <span>
                      <img src={diamond} alt="" />
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
