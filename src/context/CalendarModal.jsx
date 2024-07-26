import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { motion } from 'framer-motion';
// 1.) Create Context

const ModalContext = createContext();

// 2.) Create Parent Component

function CalendarModal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3.) Create child component to help implementing an common target

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, calendarClose, setCalendarClose }) {
  const { openName, close } = useContext(ModalContext);

  // most not use useOutsideClick because Calendar will not open, (ie)it considers the calender as clickedoutside
  // const ref = useOutsideClick(close, true);
  if (name !== openName) return null;

  if (calendarClose) {
    close();
    setCalendarClose(!calendarClose);
  }

  return createPortal(
    <motion.div
      className="fixed w-full backdrop-blur-lg backdrop-brightness-50 h-full top-0 left-0 z-[1000] py-2 "
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 py-10 md:w-1/4 grid place-items-center ">
        <motion.button
          onClick={close}
          className="dark:text-gray-300 absolute top-4 right-4 bg-blue-700 text-gray-100 p-1 rounded-full "
          whileHover={{ rotate: 180, backgroundColor: '#ff0000' }}
          transition={{ duration: 0.3 }}
        >
          <HiXMark />
        </motion.button>
        <div className="relative  px-1">{cloneElement(children)}</div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// 4.) Add child component as an property to an parent component

CalendarModal.Open = Open;
CalendarModal.Window = Window;

export default CalendarModal;
