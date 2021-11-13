import { IconButton } from '@chakra-ui/button';
import { DeleteIcon, CopyIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/toast';

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
      {Object.keys(keys).map((key) => (
        <div className="account_view_card">
          <div className="logo">
            <img />
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
        </div>
      ))}
    </>
  );
};

export default ListCodes;
