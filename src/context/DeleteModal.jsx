import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { HiXMark } from 'react-icons/hi2';

const ModalContext = createContext();

function DeleteModal({ children }) {
  const [openName, setOpenName] = useState();
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}{' '}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);

  if (name !== openName) return null;
  return createPortal(
    <div
      className={`w-full h-full backdrop-blur-lg rounded fixed top-0 left-0 z-50 
      `}
    >
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 dark:text-gray-50 rounded-lg shadow-lg shadow-gray-600 dark:shadow-blue-700"
      >
        <button
          className="absolute right-1 top-1 p-1 rounded-full text-gray-200 bg-red-600"
          onClick={close}
        >
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

DeleteModal.Open = Open;
DeleteModal.Window = Window;
export default DeleteModal;
