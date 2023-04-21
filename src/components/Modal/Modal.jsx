import { useEffect } from 'react';
import { Overlay, BigPic } from './Modal.styled';
import { createPortal } from 'react-dom';

export const Modal = ({onClose, children}) => {
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  }, [])
  
  const keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <BigPic>
        {children}
      </BigPic>
    </Overlay>,
    document.querySelector('#modal')
  )
};
