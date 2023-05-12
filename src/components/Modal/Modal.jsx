import { useEffect } from 'react';
import { Overlay, BigPic } from './Modal.styled';
import { createPortal } from 'react-dom';

export const Modal = ({ onClose, children }) => {
  
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <BigPic>{children}</BigPic>
    </Overlay>,
    document.querySelector('#modal')
  );
};
