import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

// 1.)Create Context
const ModalContext = createContext();
// 2.)Create Parent component
function DetailsModal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3.)Create child component to help implementing an common target

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, todayTasks }) {
  const { openName, close } = useContext(ModalContext);
  if (name !== openName) return null;

  return createPortal(
    <div
      className={`fixed w-full h-full py-2 z-[1000] overflow-auto sm:w-full backdrop-blur-xl top-0 left-0 ${
        todayTasks ? 'lg: block' : 'lg:hidden'
      }  `}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-14 py-16 rounded-lg ">
        <button
          className="absolute sm:p-2 translate-x-3 top-12 sm:top-20 right-16 sm:right-8  rounded-lg"
          onClick={close}
        >
          <HiXMark className="dark:text-gray-300 sm:font-bold text-2xl" />
        </button>
        <div className="w-[300px] h-full bg-gray-300  lg:text-gray-900 dark:bg-gray-900 dark:text-gray-300 py-3 rounded-lg shadow-lg shadow-blue-700 md:w-[500px]  ">
          {cloneElement(children)}
        </div>
      </div>
    </div>,
    document.body
  );
}

// 4.)Add an child component as an properties to an parent component

DetailsModal.Open = Open;
DetailsModal.Window = Window;

export default DetailsModal;
