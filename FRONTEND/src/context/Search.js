import { useState, useContext, createContext, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = (props) => {
  const [value, setvalue] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[value, setvalue]}>
      {props.children}
    </SearchContext.Provider>
  );
};

//custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
