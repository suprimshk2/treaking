import { useState } from 'react';
import { Login as LoginComponent } from '../components/Login';
import { OTPVerification } from '../components/OTPVerification';
import { ILoginData } from '../interfaces';

function Login() {
  const [loginData, setLoginData] = useState<ILoginData>({
    otpToken: '',
    username: '',
    password: '',
  });

  const onBackClick = () => {
    setLoginData((prevState) => ({ ...prevState, otpToken: '' }));
  };

  if (loginData?.otpToken) {
    return (
      <OTPVerification
        loginData={loginData}
        setLoginData={setLoginData}
        onBackClick={onBackClick}
      />
    );
  }

  return <LoginComponent loginData={loginData} setLoginData={setLoginData} />;
}

export default Login;
