import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import AddAccount from './AddAccount';
import './MainScreen.css';
import ListCodes from './ListCodes';

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
    // console.log(toks.tokens);
  }, [keys]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = Math.floor(Date.now() / 1000) % 30;
      // console.log(timeLeft);
      if (timeLeft === 0) {
        // console.log('test');
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
    refreshKeys();
  };

  const AccountView = () => {
    // returing JSON skeleton for now
    // add ui later
    return (
      <>
        <div className="account_view">
          <ListCodes keys={keys} tokens={tokens} deleteKey={deleteKey} />
        </div>
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
      <div className="add_btn">
        <IconButton
          colorScheme="teal"
          size="lg"
          onClick={onOpen}
          icon={<AddIcon />}
        />
      </div>
      <AddAccount isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
};

export default MainScreen;
