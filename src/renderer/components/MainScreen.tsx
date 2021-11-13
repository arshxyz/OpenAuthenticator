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
    const myKeys = window.electron.ipcRenderer.readKeys();
    console.log(myKeys);
    window.electron.ipcRenderer.addKey(test);
    console.log(myKeys);
  }, []);
  return <button type="button">OpenAuthenticator</button>;
};

export default MainScreen;
