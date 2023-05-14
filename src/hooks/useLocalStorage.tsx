import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue?: string | number) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    
    if (!storedValue) {
      return initialValue
    } else {
      return JSON.parse(storedValue)
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
