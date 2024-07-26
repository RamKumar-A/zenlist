import { useState, cloneElement, useContext, createContext } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { motion } from 'framer-motion';

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
    <motion.div
      className={`w-full h-full backdrop-blur-lg fixed top-0 left-0 z-50 backdrop-brightness-50  ${
        taskDetails ? 'lg:block' : ''
      }`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="py-4 relative w-full  space-y-3 px-1 grid top-[40%] "
        ref={ref}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        {cloneElement(children)}
        <motion.button
          onClick={close}
          className="p-1 place-self-end rounded-full bg-blue-700 text-gray-100 w-fit absolute -top-6 
         max-md:right-0 md:left-3/4 "
          whileHover={{
            rotate: 180,
            backgroundColor: '#ff0000',
          }}
          transition={{ duration: 0.3 }}
        >
          <HiXMark className=" " />
        </motion.button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// 4.)Add an child Component as an properties to an parent component
InputModal.Open = Open;
InputModal.Window = Window;

export default InputModal;
