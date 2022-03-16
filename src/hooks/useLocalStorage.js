const STORAGE_KEY = "local_data";

const useLocalStorage = () => {
  const reset = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
  };

  const getState = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(data);
  };

  const set = (data) => {
    const currentState = getState();
    if (currentState) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...currentState,
          ...data,
        })
      );
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  return {
    getState,
    reset,
    set,
  };
};

export default useLocalStorage;
