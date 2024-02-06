import { useNavigate } from 'react-router-dom';
import { ProfileSettingButton, TitleLayout } from '../layout';
import {
  UserSetting,
  GoogleAccountSetting,
  DeleteAccount,
  UnlinkGoogleModal,
  DeleteAccountModal,
  ChangePassword,
} from '../components';

export function Setting() {
  const navigate = useNavigate();

  return (
    <div className="authentication-bg border border-transparent">
      <TitleLayout title="Setting" hasClose={true} callback={() => navigate(-1)} />
      <div className="mx-4">
        <ProfileSettingButton />
        <div className="roboto-condensed mx-5 my-8 text-[16px]">
          <UserSetting />
          <GoogleAccountSetting />
          <DeleteAccount />
          <UnlinkGoogleModal />
          <DeleteAccountModal />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
