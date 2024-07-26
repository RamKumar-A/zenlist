import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiMiniBars3BottomRight, HiXMark } from 'react-icons/hi2';
import SideBarElements from './SideBarElements';

function SidebarModal() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  function close() {
    setToggleSidebar(false);
  }
  return (
    <>
      <div
        className={` absolute top-1/2 -translate-y-1/2 right-1.5 sm:right-2.5 p-1 md:hidden z-10 bg-blue-700 dark:bg-blue-50 dark:text-blue-950 text-blue-50 rounded-full cursor-pointer `}
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <HiMiniBars3BottomRight className="" size={20} />
      </div>
      <AnimatePresence initial={false}>
        {toggleSidebar && (
          <motion.div
            className="space-y-0 fixed z-20 w-full top-0 h-full right-0 backdrop-blur-md md:hidden origin-top-right "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <div className="fixed w-3/4 border-l-2 border-blue-200 dark:border-blue-950 bg-gray-100 dark:text-gray-50 text-black dark:bg-gray-950 left-1/4 inset-0 h-full  ">
              <div className="w-full flex items-center justify-end p-1">
                <button
                  onClick={close}
                  className="bg-gray-100 dark:bg-blue-600 rounded-full text-black dark:text-white  p-1 "
                >
                  <HiXMark size={17} />
                </button>
              </div>
              <div className="overflow-y-auto h-full ">
                <SideBarElements />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SidebarModal;
