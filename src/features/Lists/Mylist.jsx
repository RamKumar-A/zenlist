import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaRegRectangleList } from 'react-icons/fa6';

import InputModal from '../../context/InputModal';
import { addList, getList } from './listSlice';
import { motion, AnimatePresence } from 'framer-motion';

function Mylist() {
  const [inputValue, setInputValue] = useState('');
  const [toggleList, setToggleList] = useState(false);

  const dispatch = useDispatch();
  const lists = useSelector(getList);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    toast.success('List added Successfully');
    dispatch(addList({ name: inputValue }));
    setInputValue('');
  }

  return (
    <section>
      <header className="text-md py-5 font-semibold flex items-center justify-between gap-2">
        <h1
          className=" flex items-center gap-2 cursor-pointer"
          onClick={() => setToggleList(!toggleList)}
        >
          <FaRegRectangleList size={18} />
          <span>My List</span>
        </h1>
        <InputModal>
          <InputModal.Open opens="list-add-form">
            <h1 className="pl-5 z-50 flex items-center">
              {toggleList ? (
                <span className=" cursor-pointer">+</span>
              ) : (
                <span className="text-xs">{lists.length}</span>
              )}
            </h1>
          </InputModal.Open>
          <InputModal.Window name={'list-add-form'}>
            <form
              onSubmit={handleSubmit}
              className="w-full grid justify-items-center p-1 h-16  "
            >
              <input
                type="text"
                value={inputValue}
                required
                maxLength={16}
                onChange={handleChange}
                className="w-full h-10 lg:h-16 sm:w-1/2 dark:bg-gray-800 dark:text-gray-300 border rounded pl-2  border-blue-900 outline-none "
                placeholder="Add List Name"
              />
            </form>
          </InputModal.Window>
        </InputModal>
      </header>
      <AnimatePresence>
        {toggleList && (
          <motion.ul
            className="pb-5 px-2 overflow-x-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="animate"
            exit="hidden"
          >
            {lists.map((list, i) => (
              <motion.li
                className="py-4 text-sm md:text-base rounded-full flex items-center gap-3 line-clamp-1 "
                variants={childVariants}
                key={i + list.name}
              >
                <NavLink
                  to={`/mylist/${list?.name}`}
                  state={{ listName: list.name }}
                >
                  <span>{list.name}</span>
                  <span className="text-xs pl-5 font-bold ">
                    {list.tasks.length}
                  </span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
const containerVariants = {
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.5,
    transition: {
      staggerChildren: 0.1,
      when: 'afterChildren',
    },
  },
};

const childVariants = {
  animate: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

export default Mylist;

// <motion.li
//   className="py-4 text-sm md:text-base rounded-full flex items-center gap-3 line-clamp-1 "
//   key={i + list.name}
//   variants={childVariants}
// >
//   <NavLink
//     to={`/mylist/${list?.name}`}
//     state={{ listName: list.name }}
//   >
//     <span>{list.name}</span>
//     <span className="text-xs pl-5 font-bold ">
//       {list.tasks.length}
//     </span>
//   </NavLink>
// </motion.li>
