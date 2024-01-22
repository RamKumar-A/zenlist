import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
// import { useOutsideClick } from '../hooks/useOutsideClick';
import { HiMiniXMark } from 'react-icons/hi2';

const SidebarContext = createContext();

function SidebarModal({ children }) {
  const [openName, setOpenName] = useState('');
  const open = setOpenName;
  const close = () => setOpenName('');
  return (
    <SidebarContext.Provider value={{ openName, open, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(SidebarContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { close, openName } = useContext(SidebarContext);
  // const ref = useOutsideClick(close, true);

  if (name !== openName) return null;

  return createPortal(
    <div
      className="h-full w-full py-2 fixed top-0 right-0 backdrop-blur-xl z-10"
      // ref={ref}
    >
      <div className="fixed top-0 right-0 h-full w-[80%] ">
        <button
          onClick={close}
          className="text-2xl absolute top-2 z-50 md:hidden right-1 dark:text-gray-200"
        >
          <HiMiniXMark />
        </button>
        <div className="overflow-y-auto h-full">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

SidebarModal.Open = Open;
SidebarModal.Window = Window;

export default SidebarModal;
