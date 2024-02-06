import { Link, useNavigate } from 'react-router-dom';
import { ModalLayout } from '../../layout';
import { useRepositories } from '../../repositories';
import { useQueriesHandler } from '../../handlers';
import { useBoundStore } from '../../store';
import '../../css/onboard.css';

// import EION from '/assets/images/EION LOGO.png';
import invokeBg from '/assets/images/onboard/invoke.png';
import earnShards from '/assets/images/onboard/earnShards.png';
import lockerBg from '/assets/images/onboard/lockerBg.png';
import vaultBg from '/assets/images/onboard/vaultBg.png';
import storeBg from '/assets/images/onboard/storeBg.png';
import lbBg from '/assets/images/onboard/lbBg.png';

export function MainPageOB() {
  const navigate = useNavigate();
  const { userQry } = useQueriesHandler();
  const { useGetInventory } = useRepositories();
  const { data: inventory } = useGetInventory(userQry.id);
  const { onboarding, setOnboardingState } = useBoundStore();
  const { sequence } = onboarding;

  const firstTime = inventory?.cards && inventory.cards.length <= 0;

  const onClickNext = async () => {
    sequence !== 5 ? setOnboardingState({ sequence: sequence + 1 }) : navigate('/store');
  };

  const TextBlue = ({ content }: { content: string }) => (
    <span className="roboto-condensed-bold text-[#0185FF]">{content}</span>
  );

  const data = [
    {
      welcomeTo: 'INVOKE',
      title: 'INVOKE',
      img: invokeBg,
      content: [
        <p>Field your best five players and complete in the leaderboard with your dream team. </p>,
        <p>
          Gain access to <span className="roboto-condensed-bold text-[#0185FF]">Team Rewards</span> from your beloved
          esports teams. Show your allegiance and be part of the action both in-game and in the real world!
        </p>,
        <Link target="_blank" to={import.meta.env.VITE_HOW_TO_PLAY_INVOKE}>
          <p className="mt-4 text-[#0185FF] underline">CLICK HERE TO WATCH A TUTORIAL</p>
        </Link>
      ],
    },
    {
      welcomeTo: 'EION',
      title: 'EARN SHARDS',
      img: earnShards,
      content: [
        <p>
          Shards are EION's valuable in-game currency to unlock{' '}
          <span className="roboto-condensed-bold text-[#0185FF]">Booster Packs</span>. Here's how you can earn them:
        </p>,
        <div className="flexcenter my-2 gap-2">
          <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">LOCKER MATCHES</p>
          <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">INVOKE</p>
          <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">REFER A FRIEND</p>
        </div>,
      ],
    },
    {
      welcomeTo: 'LOCKER',
      title: 'LOCKER',
      img: lockerBg,
      content: [
        <p>
          Use <TextBlue content="Leader" />, <TextBlue content="Support" /> and <TextBlue content="Player" /> cards to
          predict on the outcome of matches.{' '}
        </p>,
        <p>
          Make correct predictions, collect <TextBlue content="Shards" />, open packs and acquire more player cards!
          These cards are your key to building your ultimate dream team.
        </p>,
      ],
    },
    {
      welcomeTo: 'EION',
      title: 'STORE',
      img: storeBg,
      content: [
        <p>
          Eion is free to play, use Shards earned from <TextBlue content="Locker" />, <TextBlue content="Invoke" />, etc
          to open standard packs.
        </p>,
        <p>You may also purchase player cards from your favorite teams which have a higher gold drop rate.</p>,
        <>
          <div className="my-2 ml-3 w-full">
            <span className="mx-1 rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">STANDARD PACK</span>
            <span className="mx-1 rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">ROTATING UTILITY PACK</span>
          </div>
          <div className="-mt-2 ml-3 w-full">
            <span className="rounded-md bg-[#262626] px-3 py-1 text-left text-[#0185FF]">TEAM SPECIFIC PACK</span>
          </div>
        </>,
      ],
    },
    {
      welcomeTo: 'EION',
      title: 'VAULT',
      img: vaultBg,
      content: [
        <p>
          In the Vault, you'll discover your entire card collection, from Leader cards to Player cards and everything in
          between. It's a showcase of your esports journey, your strategies, and your triumphs. Dive in and explore the
          cards that tell your story!
        </p>,
      ],
    },
    {
      welcomeTo: 'EION',
      title: 'LEADERBOARD',
      img: lbBg,
      content: [
        <p className='mb-10'>
          Eion is taking esports to the next level! We're thrilled to unveil our amazing{' '}
          <TextBlue content="Intangible Rewards" />! Conquer the leaderboards and claim a slice of the action.
        </p>,
        // <div className="flexcenter my-2 gap-2">
        //   <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">WEEKLY LEADERBOARD</p>
        //   <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">SEASONAL LEADERBOARD</p>
        // </div>,
      ],
    },
  ];

  return (
    <ModalLayout modalState={firstTime as boolean}>
      <div className="roboto-condensed mx-2 rounded-md border border-[#0185FF] bg-[#00061D] text-left lg:px-20">
        <div className="flex w-full items-center justify-between bg-[#4584BF] py-3">
          <p className="flex-1 text-center">WELCOME TO {data[sequence].welcomeTo}</p>
          <p className="mr-2">{`[${sequence + 1}/6]`}</p>
        </div>

        <div className="flexcenter-col gap-3 px-3 py-6 text-[14px]">
          <p className="roboto-condensed-bold text-ob text-[32px]">{data[sequence].title}</p>
          <img className="mb-2" src={data[sequence].img} alt="" />
          {data[sequence].content.map(item => item)}
          <button onClick={onClickNext} className="mt-4 w-full border py-2">
            {sequence === 5 ? 'ENTER' : 'NEXT'}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
