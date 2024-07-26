import { useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineSun } from 'react-icons/hi2';
import { useUser } from './UserContext';
import InputModal from '../../context/InputModal';
import { useDarkMode } from '../../context/DarkModeContext';
import { IoMoonOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

function User() {
  const { username, setName } = useUser();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [value, setValue] = useState('');
  // const [toggleForm, setToggleForm] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('username', value);
    setName(value);
    toast.success('Name changed successfully');
  }

  return (
    <InputModal>
      <div className="w-full">
        <div className="flex justify-between items-center gap-2 ">
          <h1 className="capitalize inline flex-1 text-sm sm:text-md ">
            {username}
          </h1>
          <InputModal.Open opens="username">
            <span className="cursor-pointer border border-gray-400 rounded-full p-1 w-fit text-xs sm:text-sm">
              <HiOutlinePencilSquare className="" />
            </span>
          </InputModal.Open>
          <span
            onClick={toggleDarkMode}
            className="cursor-pointer border border-gray-400 rounded-full p-1 w-fit text-xs sm:text-sm"
          >
            {isDarkMode ? <IoMoonOutline /> : <HiOutlineSun />}
          </span>
        </div>

        <InputModal.Window name={'username'} taskDetails={true}>
          <form
            className="w-full grid justify-items-center gap-2 p-1  "
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-xl font-semibold text-white">
              Enter Name
            </h1>
            <input
              type="text"
              value={value}
              className="h-10 lg:h-16 text-md   w-full md:w-1/2  pl-3 outline-none mt-2 font-medium dark:bg-gray-800 dark:text-gray-300 rounded border  border-blue-900"
              onChange={(e) => setValue(e.target.value)}
              maxLength={14}
              required
            />

            <button
              type="submit"
              className="bg-blue-600 rounded w-fit p-1 px-2  text-gray-100"
            >
              Save
            </button>
          </form>
        </InputModal.Window>
      </div>
    </InputModal>
  );
}

export default User;
