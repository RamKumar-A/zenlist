import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [name, setName] = useState('');

  const username = localStorage.getItem('username') || name;
  return (
    <UserContext.Provider value={{ username, setName }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('used outside the context');
  return context;
}

export { useUser, UserProvider };
