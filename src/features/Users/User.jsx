import { useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineSun } from 'react-icons/hi2';
import { useUser } from './UserContext';
import InputModal from '../../context/InputModal';
import { useDarkMode } from '../../context/DarkModeContext';
import { IoMoonOutline } from 'react-icons/io5';

function User() {
  const { username, setName } = useUser();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [value, setValue] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('username', value);
    setName(value);
  }

  return (
    <InputModal>
      <div className="w-full">
        <div className="flex justify-between items-center gap-2">
          <h1 className="pr-1 capitalize inline flex-1">{username}</h1>
          <InputModal.Open opens="username">
            <p>
              <HiOutlinePencilSquare className=" border border-gray-800 dark:border-gray-300 rounded-full p-1 text-2xl md:text-3xl cursor-pointer" />
            </p>
          </InputModal.Open>
          <p
            onClick={toggleDarkMode}
            className="border border-gray-800 dark:border-gray-300 rounded-full p-1 text-sm md:text-xl cursor-pointer"
          >
            {isDarkMode ? <IoMoonOutline /> : <HiOutlineSun />}
          </p>
        </div>

        <InputModal.Window name="username">
          <form
            className="flex flex-col gap-2 items-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-xl font-semibold dark:text-gray-300">
              Enter Name
            </h1>
            <input
              type="text"
              value={value}
              className="h-8 text-xl pl-3 outline-none mt-2 font-medium dark:bg-gray-300"
              onChange={(e) => setValue(e.target.value)}
              maxLength={14}
              required
            />

            <button
              type="submit"
              className="bg-blue-600 rounded w-fit p-1 px-2 mt-2 text-gray-100"
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
