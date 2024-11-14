import { createContext, useContext, useState } from 'react';

const DetailsContext = createContext();

function DetailsProvider({ children }) {
  const [details, setDetails] = useState(null);
  function handleDetails(task) {
    setDetails(task);
  }
  // useEffect(() => {
  //   console.log(details);
  // }, [details]);

  return (
    <DetailsContext.Provider value={{ details, handleDetails }}>
      {children}
    </DetailsContext.Provider>
  );
}

function useDetails() {
  const context = useContext(DetailsContext);
  if (context === undefined) throw new Error('Used outside the context!');
  return context;
}

export { useDetails, DetailsProvider };
