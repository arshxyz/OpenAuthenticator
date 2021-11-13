import { useDisclosure } from '@chakra-ui/hooks';
import { DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import AddAccount from './AddAccount';
import './MainScreen.css';

const MainScreen = () => {
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState(false);
  const [tokens, setTokens] = useState({});
  const [counter, setCounter] = useState(Date.now() % 30);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const refreshKeys = () => {
    setLoading(true);
    const newKeys = window.electron.ipcRenderer.readKeys();
    setKeys(newKeys);
    setLoading(false);
  };

  const onClose = () => {
    setOpen(false);
    refreshKeys();
  };

  useEffect(() => {
    const toks = window.electron.ipcRenderer.getTokens();
    setTokens(toks.tokens);
    console.log(toks.tokens);
  }, [keys]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = Math.floor(Date.now() / 1000) % 30;
      console.log(timeLeft);
      setCounter(parseInt(Date.now()/1000) % 30);
      if (timeLeft === 0) {
        console.log('test');
        refreshKeys();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    const newKeys = window.electron.ipcRenderer.readKeys();
    setKeys(newKeys);
    setLoading(false);
  }, []);

  const deleteKey = (key) => {
    window.electron.ipcRenderer.deleteKey(key);
    setKeys((prevKeys) => {
      delete prevKeys[key];
      return prevKeys;
    });
  };

  const AccountView = () => {
    // returing JSON skeleton for now
    // add ui later
    return (
      <>
        {Object.keys(keys).map((key) => (
          <div id={key}>
            {keys[key].name} : {key} : {tokens[key]}
            <DeleteIcon onClick={() => deleteKey(key)} />
          </div>
        ))}
      </>
    );
  };

  const EmptyView = () => {
    return (
      <div>
        {loading ? (
          <div>loading</div>
        ) : (
          <div className="header">No accounts here :/</div>
        )}
      </div>
    );
  };
  return (
    <div className="main">
      {JSON.stringify(keys) !== '{}' ? <AccountView /> : <EmptyView />}
      <button className="add_btn" type="button" onClick={onOpen}>
        Add an account
      </button>
      <AddAccount isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
};

export default MainScreen;
