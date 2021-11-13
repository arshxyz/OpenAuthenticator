import { IconButton } from '@chakra-ui/button';
import { DeleteIcon, CopyIcon } from '@chakra-ui/icons';
import { CircularProgress } from '@chakra-ui/progress';
import { useToast } from '@chakra-ui/toast';
import TimeProgress from './CircularProgressWrapper';

const ListCodes = ({ keys, tokens, deleteKey }) => {
  const toast = useToast();
  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(tokens[key]);
    toast({
      title: 'Copied!',
      position: 'top-start',
      duration: 1000,
      variant: 'left-accent',
      status: 'success',
    });
  };

  return (
    <>
      { keys && tokens && Object.keys(keys).map((key) => (
        <div className="account_view_card" key={key}>
          <div className="logo">
            {/* <img /> */}
            <img
              alt="lock"
              src="https://img.icons8.com/ios/50/000000/lock-2.png"
            />
          </div>
          <div className="account_view_card_info">
            <div className="card_info_code">
              <div className="token_display">{tokens[key]}</div>
              <IconButton
                size="sm"
                icon={<CopyIcon />}
                onClick={() => {
                  copyToClipboard(key);
                }}
              />
            </div>
            <div className="card_info_name">{keys[key].name}</div>
          </div>
          <div className="card_right_panel">
            <TimeProgress />
            <div>
              <IconButton
                size="sm"
                variant="solid"
                icon={<DeleteIcon />}
                onClick={() => {
                  deleteKey(key);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCodes;
