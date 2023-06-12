import { useState, useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import PlayerListItem from "./PlayerListItem";
import {
  computeMinimumTransactions,
  isEveryoneCashedOut,
  computeNetBalance,
} from "../../businessLogic";
import Result from "../Result/Result";

export default function ListModeView({
  setError,
  players,
  handleAddPlayer,
  handleRemovePlayer,
  updatePlayerInfo,
}) {
  const [transactions, setTransactions] = useState([]);

  const computeResult = useCallback(() => {
    const netIncome = players.map((player) => {
      const { name, buyIn, currentAmount } = player;
      return {
        name,
        net: currentAmount - buyIn,
      };
    });

    if (!isEveryoneCashedOut(players)) {
      setError("Please make sure that every row has been filled.");
      setTransactions([]);
      return false;
    }

    const netBalance = computeNetBalance(netIncome);
    if (netBalance !== 0) {
      setError(`The net balance is off by ${netBalance}`);
      setTransactions([]);
      return false;
    }
    const transactions = computeMinimumTransactions(netIncome);
    setTransactions(transactions);
  }, [players, setError]);

  return (
    <List>
      {!!players.length &&
        players.map((player, i) => {
          const { id, name, buyIn, currentAmount } = player;

          return (
            <ListItem key={id} divider sx={{ paddingY: "2rem" }}>
              <PlayerListItem
                rowIndex={i}
                name={name}
                buyInAmount={buyIn}
                currentAmount={currentAmount}
                handleRemovePlayer={handleRemovePlayer}
                updatePlayerInfo={updatePlayerInfo}
              />
            </ListItem>
          );
        })}
      <ListItem
        disablePadding
        sx={{
          color: "primary.dark",
          backgroundColor: "secondary.light",
          borderRadius: "0.5rem 0.5rem 0rem 0rem",
          marginTop: "1rem",
        }}
      >
        <ListItemButton
          onClick={handleAddPlayer}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AddIcon />
            <ListItemText primary="Add a Player" />
          </Box>
        </ListItemButton>
      </ListItem>

      <ListItem
        disablePadding
        sx={{
          color: "secondary.light",
          backgroundColor: "#3f51b5",
          borderRadius: "0rem 0rem 0.5rem 0.5rem",
        }}
      >
        <ListItemButton
          onClick={computeResult}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalculateIcon />
            <ListItemText primary="Compute Result" />
          </Box>
        </ListItemButton>
      </ListItem>

      {!!transactions.length && (
        <>
          <Divider sx={{ paddingTop: "1rem" }} />
          <ListItem disablePadding>
            <Result players={players} transactions={transactions} />
          </ListItem>
        </>
      )}
    </List>
  );
}
