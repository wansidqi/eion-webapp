import close from '/assets/images/Layout/close.png';

type Props = {
  callback?: () => any;
  hasClose: boolean;
  title: string;
};

export function TitleLayout({ callback, hasClose, title }: Props) {
  return (
    <div className="flexcenter relative gap-x-4 bg-[#010E1A] bg-opacity-80 px-5 py-5 text-[20px]">
      {hasClose && (
        <button onClick={callback} className="absolute -left-2 scale-[1.1]">
          <img src={close} alt="" />
        </button>
      )}
      <b className="deadjim">{title}</b>
    </div>
  );
}
