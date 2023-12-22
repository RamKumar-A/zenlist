import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const ModalContext = createContext();

function CommonModal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  // console.log('working');
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);
  if (name !== openName) return null;

  return createPortal(
    <div className="fixed w-full backdrop-blur-xl h-full top-0 left-0 py-2 z-[9999]">
      <div
        className="w-[90%] bg-gray-300 dark:bg-gray-900 px-5 py-12 border border-blue-800 rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-700 sm:px-16  lg:w-1/2 "
        ref={ref}
      >
        <button onClick={close} className="absolute top-4 right-4">
          <HiXMark className=" dark:text-gray-300" />
        </button>
        <div className="px-5" onSubmit={close}>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

// function Window({ children, name }) {
//   const { openName, close } = useContext(ModalContext);
//   if (name !== openName) return null;

//   return createPortal(
//     <div className="fixed w-full backdrop-blur-xl h-full top-0 left-0 z-[1000] py-2 ">
//       <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-50 px-5 sm:px-16 py-12 border border-blue-800 ">
//         <button onClick={close} className="absolute top-4 right-4">
//           <HiXMark />
//         </button>
//         <div className="px-5">
//           {cloneElement(children, { onCloseModal: close })}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

CommonModal.Open = Open;
CommonModal.Window = Window;

export default CommonModal;
