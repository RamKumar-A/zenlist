import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { motion } from 'framer-motion';

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
    <motion.div
      className={`fixed w-full h-full py-2 z-50 overflow-auto sm:w-full backdrop-blur-lg top-0 left-0 backdrop-brightness-50 ${
        todayTasks ? 'lg: block' : 'xl:hidden'
      }  `}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 p-1 px-2 sm:w-full rounded-lg h-full grid justify-items-center place-items-center place-content-center space-y-3 "
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          className="place-self-end rounded-full bg-blue-600 text-blue-50 p-1"
          onClick={close}
          whileHover={{ rotate: 360, backgroundColor: '#ff0000' }}
        >
          <HiXMark className="" size={18} />
        </motion.button>
        <div className="sm:w-96 h-full bg-white border rounded border-gray-700  dark:bg-gray-900 dark:text-gray-300 overflow-y-auto  relative">
          {cloneElement(children)}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// 4.)Add an child component as an properties to an parent component

DetailsModal.Open = Open;
DetailsModal.Window = Window;

export default DetailsModal;
