import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const usePlayer = () => {
  const [players, setPlayers] = useState([]);
  
  const handleAddPlayer = useCallback(() => {
    setPlayers((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        buyIn: 0,
        currentAmount: 0,
      },
    ]);
  }, []);

  const handleRemovePlayer = useCallback(
    (rowIndex) => () => {
      setPlayers((prev) => {
        const left = prev.slice(0, rowIndex);
        const right = prev.slice(rowIndex + 1);
        return [...left, ...right];
      });
    },
    []
  );

  const updatePlayerInfo = useCallback(
    (rowIndex, data) => () => {
      setPlayers((prev) => {
        prev[rowIndex] = {
          ...prev[rowIndex],
          ...data,
        };
        return prev;
      });
    },
    []
  );


  return { players, setPlayers, handleAddPlayer, handleRemovePlayer, updatePlayerInfo };
};
