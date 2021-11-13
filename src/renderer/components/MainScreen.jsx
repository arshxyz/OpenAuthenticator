import { useDisclosure } from '@chakra-ui/hooks';
import { useEffect, useState } from 'react';
import AddAccount from './AddAccount';
import './MainScreen.css';

const MainScreen = () => {
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState(false);
  const [tokens, setTokens] = useState({});
  const [timeRemainging, setTimeRemaining] = useState(30);
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
    setTimeRemaining(toks.time);
    console.log(toks.tokens);
  }, [keys]);

  useEffect(() => {
    const newKeys = window.electron.ipcRenderer.readKeys();
    setKeys(newKeys);
    setLoading(false);
  }, []);

  const AccountView = () => {
    // returing JSON skeleton for now
    // add ui later
    return (
      <>
        {Object.keys(keys).map((key) => (
          <div>
            {key} : {tokens[key]}
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
