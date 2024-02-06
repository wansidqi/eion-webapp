import { useNavigate } from 'react-router-dom';
import locker from '/assets/images/Home/locker-icon.png';
import lock from '/assets/images/Home/lock.png';

const menuItems = [
    { icon: locker, path: '/lobby', label: 'LOCKER', css: 'row-span-2 py-7' },
];

export function LockerBtn() {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 z-10 top-[12rem] mx-4">
      <div className="relative grid-rows-8 mt-8 grid grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
            <button key={index} onClick={() => navigate(item.path)} className={`black-wood ${item.css} active:blue-wood`}>
                <div className="flexcenter-col gap-1">
                <img className={item.icon === lock ? 'p-4' : ''} src={item.icon} alt="" />
                <p className="deadjim">{item.label}</p>
                </div>
            </button>
            ))}
        </div>
    </div>
  );
}
