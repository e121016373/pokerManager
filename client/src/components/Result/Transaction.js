import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Transaction({ transactions }) {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
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
          {transactions
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([sender, recipient, amount], index) => (
              <TableRow
                key={`${sender}:${recipient}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: index % 2 ? "white" : "grey.50",
                }}
              >
                <TableCell component="th" scope="row">
                  {sender}
                </TableCell>
                <TableCell>{recipient}</TableCell>
                <TableCell align="right">{amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
