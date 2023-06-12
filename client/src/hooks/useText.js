import { useCallback, useState } from "react";

export const useText = () => {
  const [text, setText] = useState("");

  const handleOnTextChange = useCallback((evt) => {
    setText(evt.target.value);
  }, []);

  return { text, setText, handleOnTextChange };
};
