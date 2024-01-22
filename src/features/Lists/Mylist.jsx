import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaRegRectangleList } from 'react-icons/fa6';

import InputModal from '../../context/InputModal';
import { addList } from './listSlice';

function Mylist() {
  const [inputValue, setInputValue] = useState('');
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleList, setToggleList] = useState(false);

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.data);

  // console.log(lists);
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    toast.success('List added Successfully');
    dispatch(addList({ name: inputValue }));
    setInputValue('');
    setToggleForm(false);
  }

  return (
    <InputModal>
      <section>
        <header className="text-2xl pt-6 font-semibold flex items-center gap-2">
          <h1
            className=" flex items-center gap-2 cursor-pointer"
            onClick={() => setToggleList(!toggleList)}
          >
            <FaRegRectangleList />
            MyList
          </h1>

          <InputModal.Open opens="list-add-form">
            <h1
              className="pl-5 z-50 flex items-center"
              onClick={() => setToggleForm(!toggleForm)}
            >
              {toggleList ? (
                <span className="text-xs">{lists.length}</span>
              ) : (
                <span className=" cursor-pointer">+</span>
              )}
            </h1>
          </InputModal.Open>
        </header>
        <div className={toggleList ? 'hidden' : ''}>
          <div>
            <InputModal.Window name="list-add-form">
              <form
                onSubmit={handleSubmit}
                className="w-44 h-full md:w-[500px] md:h-40 md:flex items-center lg:h-40  "
              >
                <input
                  type="text"
                  value={inputValue}
                  required
                  onChange={handleChange}
                  className="w-full h-10 dark:bg-gray-800 dark:text-gray-300 text-md pl-3 font-bold border border-blue-900 rounded-lg md:h-14 md:text-xl lg:h-16 "
                  placeholder="Add List Name"
                />
              </form>
            </InputModal.Window>
          </div>
          <div>
            <ul className="text-lg pt-4 pl-2 ">
              {lists.map((list, i) => (
                <NavLink to={`mylist/${list.name}`} key={i}>
                  <li
                    key={i}
                    className="py-4 mb-4 rounded-full flex items-center gap-3 "
                  >
                    {list.name}
                    <span className="text-xs px-1 ml-2 font-bold rounded-full">
                      {list.tasks.length}
                    </span>
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </InputModal>
  );
}

export default Mylist;
