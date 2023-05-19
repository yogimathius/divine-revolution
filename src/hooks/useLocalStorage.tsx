import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue?: string | number) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    
    if (!storedValue || storedValue === "undefined") {
      console.log(initialValue);
      
      return initialValue
    } else {
      console.log(storedValue, !storedValue, storedValue === "undefined");
      
      return JSON.parse(storedValue)
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
