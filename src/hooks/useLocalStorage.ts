import { useCallback, useEffect, useState } from "react";

type UseLocalStorage = {
  (key: string): [string | null, (value: string | null) => void, () => void];
};

export const useLocalStorage: UseLocalStorage = (key) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(localStorage.getItem(key));
  }, [key]);

  const set = useCallback(
    (value: string | null) => {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
      setValue(value);
    },
    [key]
  );

  const clear = useCallback(() => {
    localStorage.removeItem(key);
    setValue(null);
  }, [key]);

  return [value, set, clear];
};
