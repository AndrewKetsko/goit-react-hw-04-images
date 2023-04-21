import { useState } from 'react';
import { Card, Image } from './Image.styled';
import {Modal} from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { webformatURL, tags, largeImageURL } = image;
  return (
    <Card>
      <Image onClick={openModal} src={webformatURL} alt={tags} />
      {isOpen && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </Card>
  );
};
