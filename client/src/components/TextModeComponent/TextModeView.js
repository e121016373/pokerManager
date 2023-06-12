import { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2";
import CalculateIcon from "@mui/icons-material/Calculate";
import Button from "@mui/material/Button";
import {
  computeMinimumTransactions,
  computeNetBalance,
} from "../../businessLogic";
import Result from "../Result/Result";

const PLACEHOLDER_TEXT =
  "[Name], [BuyIn], [NetBalance]\nFor Example: \nJohn Doe 500 -500\nTom Dwan 500 +500";

export default function TextModeView({ setError, text, handleOnChange }) {
  const [transactions, setTransactions] = useState([]);
  const [players, setPlayers] = useState([]);

  const handleSubmit = useCallback(() => {
    const _players = [];
    let netIncome = [];
    try {
      netIncome = text.split("\n").map((data) => {
        const wordBySpace = data.split(" ");
        const net = wordBySpace.pop();
        const buyIn = wordBySpace.pop();
        const name = wordBySpace.join(" ");
        if (buyIn === undefined || isNaN(+buyIn)) {
          throw new Error("Invalid Buy In.");
        }
        if (net === undefined || isNaN(+net)) {
          throw new Error("Invalid Net Balance.");
        }
        _players.push({
          name: name.trim(),
          buyIn,
          currentAmount: +buyIn + +net,
        });
        return {
          name: name.trim(),
          net: +net,
        };
      });
    } catch (error) {
      setError(`${error.message}\n\nPlease follow this format:\nJohn Doe 500 -500\nTom Dwan 500 +500`);
      setTransactions([]);
    }

    const netBalance = computeNetBalance(netIncome);
    if (netBalance !== 0) {
      setError(
        `The net balance is off by ${
          netBalance > 0 ? "+" + netBalance : netBalance
        }`
      );
      setTransactions([]);
      return false;
    }

    const transactions = computeMinimumTransactions(netIncome);
    setPlayers(_players);
    setTransactions(transactions);
  }, [text, setError]);

  return (
    <Grid2 container sx={{ marginTop: "1rem" }}>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        fullWidth
        placeholder={PLACEHOLDER_TEXT}
        value={text}
        onChange={handleOnChange}
      />
      <Button
        fullWidth
        sx={{
          color: "primary.dark",
          backgroundColor: "secondary.light",
          marginTop: "1rem",
        }}
        onClick={handleSubmit}
      >
        <CalculateIcon />
        Compute Result
      </Button>

      {!!transactions.length && (
        <Grid2 container item sx={{ marginTop: "1rem", width: "100%" }}>
          <Result players={players} transactions={transactions} />
        </Grid2>
      )}
    </Grid2>
  );
}
