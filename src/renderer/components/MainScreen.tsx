import { useEffect } from 'react';

const MainScreen = () => {
  useEffect(() => {
    console.log('test');
    const test = {
      name: 'name',
      url: 'url',
      secert: 'secret',
      id: 'id',
    };
    window.electron.ipcRenderer.addKey('add', test);
  }, []);
  return <button type="button">OpenAuthenticator</button>;
};

export default MainScreen;
