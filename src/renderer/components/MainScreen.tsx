import { useDisclosure } from '@chakra-ui/hooks';
import { useEffect, useState } from 'react';
import AddAccount from './AddAccount';
import './MainScreen.css';

const MainScreen = () => {
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const refreshKeys = () => {
    setLoading(true);
    console.log("loading");
    const newKeys = window.electron.ipcRenderer.readKeys();
    setKeys(newKeys);
    setLoading(false);
    console.log("loaded");
  };

  const onClose = () => {
    setOpen(false);
    refreshKeys();
  };

  useEffect(() => {
    const newKeys = window.electron.ipcRenderer.readKeys();
    setKeys(newKeys);
    setLoading(false);
  }, []);

  const AccountView = () => {
    // returing JSON skeleton for now
    // add ui later
    return <div>{JSON.stringify(keys)}</div>;
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
      {keys ? <AccountView /> : <EmptyView />}
      <button className="add_btn" type="button" onClick={onOpen}>
        Add an account
      </button>
      <AddAccount isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
};

export default MainScreen;
