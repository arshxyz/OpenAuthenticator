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
import { useState } from 'react';

const AddAccount = ({ isOpen, onOpen, onClose }) => {
  const [fields, setFields] = useState({
    id: '',
    name: '',
    url: '',
    secret: '',
  });
  function handleChange(evt) {
    const { value } = evt.target;
    setFields({
      ...fields,
      [evt.target.name]: value,
    });
  }


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
            <Button colorScheme="blue" onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAccount;
