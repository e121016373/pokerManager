import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import NumberInput from "../Widget/NumberInput";

export default function PlayerListItem({
  rowIndex,
  name,
  buyInAmount,
  currentAmount,
  handleRemovePlayer,
  updatePlayerInfo,
}) {
  const [playerName, setPlayerName] = useState(name);
  const [buyIn, setBuyIn] = useState(buyInAmount);
  const [cashOut, setCashOut] = useState(currentAmount);
  const [isEdit, setIsEdit] = useState(false);

  const handleClickEdit = useCallback(() => {
    setIsEdit((prev) => {
      if (prev) {
        updatePlayerInfo(rowIndex, {
          name: playerName,
          buyIn,
          currentAmount: cashOut,
        })();
      }
      return !prev;
    });
  }, [rowIndex, updatePlayerInfo, playerName, buyIn, cashOut]);

  const handleNameChange = useCallback((e) => {
    setPlayerName(e.target.value);
  }, []);

  const handleBuyInChange = useCallback((value) => {
    setBuyIn(value);
  }, []);

  const handleCashOutChange = useCallback((value) => {
    setCashOut(value);
  }, []);

  useEffect(() => {
    setPlayerName(name);
    setBuyIn(buyInAmount);
    setCashOut(currentAmount);
  }, [name, buyInAmount, currentAmount]);

  return (
    <Grid2 container alignItems="center" spacing={1}>
      <Grid2 container item xs={10}>
        <Grid2 xs={12} sm={4}>
          <TextField
            id="playname"
            label="Player"
            variant="outlined"
            disabled={!isEdit}
            value={playerName}
            fullWidth
            onChange={handleNameChange}
          />
        </Grid2>
        <Grid2 xs={12} sm={4}>
          <NumberInput
            id="buy-in"
            label="Buy In"
            variant="outlined"
            disabled={!isEdit}
            value={buyIn.toString()}
            onChange={handleBuyInChange}
          />
        </Grid2>
        <Grid2 xs={12} sm={4}>
          <NumberInput
            id="cash-out"
            label="Cash Out Amount"
            variant="outlined"
            disabled={!isEdit}
            value={cashOut.toString()}
            onChange={handleCashOutChange}
          />
        </Grid2>
      </Grid2>
      <Grid2 container item justifyContent="center" xs={1} sm={2}>
        <Grid2>
          <IconButton
            color={isEdit ? "success" : "primary"}
            aria-label="edit"
            onClick={handleClickEdit}
          >
            {isEdit ? <CheckIcon></CheckIcon> : <EditIcon></EditIcon>}
          </IconButton>
        </Grid2>
        <Grid2>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={handleRemovePlayer(rowIndex)}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
