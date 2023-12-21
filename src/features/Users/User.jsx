import { useState } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useUser } from './UserContext';
import InputModal from '../../context/InputModal';

function User() {
  const { username, setName } = useUser();
  const [value, setValue] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('username', value);
    setName(value);
  }

  return (
    <InputModal>
      <div className="w-full">
        <InputModal.Open opens="username">
          <div className="flex justify-around items-center">
            <h1 className="pr-1 capitalize inline-block">{username}</h1>
            <HiOutlinePencilSquare className="text-xl cursor-pointer inline" />
          </div>
        </InputModal.Open>
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
