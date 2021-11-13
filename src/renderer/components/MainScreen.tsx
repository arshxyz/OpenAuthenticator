import { useEffect } from 'react';

const MainScreen = () => {
  useEffect(() => {
    console.log('test');
  }, []);
  return <button type="button">OpenAuthenticator</button>;
};

export default MainScreen;
