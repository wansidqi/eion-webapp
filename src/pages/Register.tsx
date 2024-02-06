import { Registration, SetUsername } from '../components/';
import '../css/authentication.css';
import { useBoundStore } from '../store';

export function Register() {
  const { modal } = useBoundStore(state => state);

  return (
    <div className="authentication-bg">
      {modal.register.isOpen && <Registration />}
      {modal.setUsername.isOpen && <SetUsername />}
    </div>
  );
}
