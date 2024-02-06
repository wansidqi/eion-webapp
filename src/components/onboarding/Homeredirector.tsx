import { useNavigate } from 'react-router-dom';
import locker from '/assets/images/Home/locker-icon.png';
import lock from '/assets/images/Home/lock.png';
import invoke from '/assets/images/Home/invoke-icon.png';
import vault from '/assets/images/Home/vault-icon.png';
import refinement from '/assets/images/Home/refinement-icon.png';
import shop from '/assets/images/Home/shop-icon.png';
import lb from '/assets/images/Home/lb-icon.png';

export function HomeRedirector() {
  const navigate = useNavigate();

  // const menuItems = [
  //   { icon: locker, path: '/lobby', label: 'LOCKER', css: 'row-span-2 py-7' },
  //   { icon: invoke, path: '/invoke', label: 'INVOKE', css: 'row-span-2 py-7' },
  //   { icon: vault, path: '/vault', label: 'VAULT', css: 'row-span-2 row-start-3 py-7' },
  //   { icon: refinement, path: '/refinement', label: 'REFINEMENT', css: 'col-start-1 row-span-2 row-start-5 py-7' },
  //   { icon: shop, path: '/store', label: 'SHOP', css: 'col-start-2 row-span-4 row-start-3' },
  //   { icon: lb, path: '/leaderboard', label: 'LEADERBOARD', css: 'col-span-2 row-span-2 row-start-7 py-7' },
  // ];

  ///for testing
  const menuItems = [
    { icon: locker, path: '/lobby', label: 'LOCKER', css: 'row-span-2 py-7' },
    { icon: invoke, path: '/invoke', label: 'INVOKE', css: 'row-span-2 py-7' },
    { icon: vault, path: '/vault', label: 'VAULT', css: 'row-span-2 row-start-3 py-7' },
    { icon: refinement, path: '/refinement', label: 'REFINEMENT', css: 'col-start-1 row-span-2 row-start-5 py-7' },
    { icon: shop, path: '/store', label: 'SHOP', css: 'col-start-2 row-span-4 row-start-3' },
    { icon: lb, path: '/leaderboard', label: 'LEADERBOARD', css: 'col-span-2 row-span-2 row-start-7 py-7' },
  ];

    return (
      <>
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

      </>
    );
}
