import { useState, cloneElement, useContext, createContext } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

// 1.) Create Context
const ModalContext = createContext();

// 2.)Create Parent component

function InputModal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3.) create child component to help implementing an common target

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, taskDetails }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);

  if (name !== openName) return null;
  return createPortal(
    <div
      className={`w-full h-full backdrop-blur-lg rounded fixed top-0 left-0 z-50  ${
        taskDetails ? 'lg:block' : ''
      }`}
    >
      <div
        className="bg-gray-300 dark:bg-gray-900 px-16 py-8 border border-gray-800 rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-700 "
        ref={ref}
      >
        <button
          onClick={close}
          className="p-2 absolute top-5 right-8 flex items-center justify-center hover:bg-blue-700 hover:text-gray-100 rounded-full hover:rotate-180 transition-transform duration-300"
        >
          {taskDetails ? 'Save' : <HiXMark className="dark:text-gray-300 " />}
        </button>

        {taskDetails ? (
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        ) : (
          <div onSubmit={close} className="">
            <div>{cloneElement(children, { onCloseModal: close })}</div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// 4.)Add an child Component as an properties to an parent component
InputModal.Open = Open;
InputModal.Window = Window;

export default InputModal;
