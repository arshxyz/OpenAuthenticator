import { IconButton } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';

const ListCodes = ({ keys, tokens, deleteKey }) => {
  return (
    <>
      {Object.keys(keys).map((key) => (
        <div className="account_view_card">
          <div id={key}>
            {keys[key].name} : {key} : {tokens[key]}
            <IconButton
              colorScheme="red"
              size="sm"
              onClick={() => deleteKey(key)}
              icon={<DeleteIcon />}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCodes;
