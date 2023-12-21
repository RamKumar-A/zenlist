import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

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
    <div className="fixed w-full backdrop-blur-xl h-full top-0 left-0 z-[1000] py-2 ">
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-900 rounded px-5 sm:px-16 py-12  shadow-lg shadow-blue-700"
        // ref={ref}
      >
        <button
          onClick={close}
          className="dark:text-gray-300 absolute top-4 right-4 hover:bg-blue-700 hover:text-gray-900 p-1 rounded "
        >
          <HiXMark />
        </button>
        <div className="">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

// 4.) Add child component as an property to an parent component

CalendarModal.Open = Open;
CalendarModal.Window = Window;

export default CalendarModal;
