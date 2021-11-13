import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useState } from 'react';

const AddAccount = ({ isOpen, onOpen, onClose }) => {
  const [fields, setFields] = useState({
    id: '',
    name: '',
    url: '',
    secret: '',
  });
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFields({
      ...fields,
      [evt.target.name]: value,
    });
  };

  const onSave = () => {
    window.electron.ipcRenderer.addKey({
      id: nanoid(8),
      name: fields.name,
      url: fields.url,
      secret: fields.secret,
    });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="name"
              value={fields.name}
              placeholder="Name (Eg. Protonmail)"
              onChange={handleChange}
              mb={3}
            />
            <Input
              name="url"
              value={fields.url}
              onChange={handleChange}
              placeholder="URL (https://protonmail.com)"
              mb={3}
            />
            <Input
              name="secret"
              value={fields.secret}
              onChange={handleChange}
              placeholder="Secret Key"
              mb={3}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAccount;
