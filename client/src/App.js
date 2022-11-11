import { useMemo } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import PlayerList from "./components/PlayerList/PlayerList";
import "./styles.js";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#5c6bc0",
        light: "#8e99f3",
        dark: "#26418f",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
      },
    },
  });
  const date = useMemo(() => new Date().toString(), []);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid2
          container
          minHeight={160}
          alignItems="center"
          justifyContent="center"
          sx={{ paddingY: "2rem" }}
        >
          <Card sx={{ minWidth: 300 }}>
            <CardHeader title="Texas Holdem Manager" subheader={date} />
            <CardContent sx={{ paddingTop: 0 }}>
              <PlayerList />
            </CardContent>
          </Card>
        </Grid2>
      </Container>
    </ThemeProvider>
  );
}

export default App;
