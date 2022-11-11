import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { indigo } from "@mui/material/colors";

const Row = ({ data, transactions, index }) => {
  const { name, buyIn, currentAmount } = data;
  const [open, setOpen] = useState(false);

  const net = currentAmount - buyIn;

  return (
    <>
      <TableRow
        sx={{
          border: "none",
          backgroundColor: index % 2 ? "white" : "grey.50",
        }}
        onClick={() => setOpen(!open)}
        hover
        selected={open}
      >
        <TableCell sx={{ paddingX: 0 }}>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{buyIn}</TableCell>
        <TableCell align="right">{currentAmount}</TableCell>
        <TableCell
          align="right"
          sx={{
            color: net > 0 ? "success.main" : "warning.main",
            fontWeight: "bold",
          }}
        >
          {net}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: indigo[100],
            border: "none",
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <Table size="small" aria-label="transactions">
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <TableCell>Sender</TableCell>
                    <TableCell>Recipient</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!transactions?.length &&
                    transactions.map(([sender, recipient, amount], i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {sender}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {recipient}
                        </TableCell>
                        <TableCell align="right">{amount}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function Summary({ players, transactions }) {
  const transactionMap = useMemo(
    () =>
      transactions.reduce((prev, curr) => {
        if (prev[curr[0]] || prev[curr[1]]) {
          return {
            ...prev,
            [curr[0]]: [...(prev[curr[0]] ? prev[curr[0]] : []), curr],
            [curr[1]]: [...(prev[curr[1]] ? prev[curr[1]] : []), curr],
          };
        } else {
          return {
            ...prev,
            [curr[0]]: [curr],
            [curr[1]]: [curr],
          };
        }
      }, {}),
    [transactions]
  );

  return (
    <TableContainer>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontWeight: "bold",
              },
            }}
          >
            <TableCell size="small" sx={{ paddingX: 0 }} />
            <TableCell size="small">Player</TableCell>
            <TableCell align="right">Buy In</TableCell>
            <TableCell align="right">Cash Out Amount</TableCell>
            <TableCell align="right">Net Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players
            .map((player, i) => (
              <Row
                key={player.name}
                data={player}
                transactions={transactionMap[player.name]}
                index={i}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
