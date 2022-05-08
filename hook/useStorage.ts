type UseStorageReturnValue = {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

const useStorage = (): UseStorageReturnValue => {
  const getItem = (key: string): string => {
    return localStorage[key];
  };

  const setItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  const removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useStorage;
