import { useMemo, useState, useCallback } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArticleIcon from "@mui/icons-material/Article";
import ListIcon from "@mui/icons-material/List";
import Alert from "@mui/material/Alert";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

import ListModeView from "./components/ListModeComponent/ListModeView";
import "./styles.js";
import TextModeView from "./components/TextModeComponent/TextModeView";
import { useText } from "./hooks/useText";
import { usePlayer } from "./hooks/usePlayer";

const MODE = {
  LIST: "listMode",
  TEXT: "textMode",
};

function App() {
  const [mode, setMode] = useState(MODE.LIST);
  const [error, setError] = useState("");

  const { text, handleOnTextChange } = useText();
  const { players, handleAddPlayer, handleRemovePlayer, updatePlayerInfo } =
    usePlayer();

  const clearError = useCallback(() => setError(""), []);

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

  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: theme.palette.secondary.light,
      backgroundColor: "#3f51b5",
    },
  });

  const handleModeChange = useCallback((evt, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  }, []);

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
              <ToggleButtonGroup
                fullWidth
                value={mode}
                exclusive
                onChange={handleModeChange}
                sx={{
                  color: "#3f51b5",
                }}
              >
                <ToggleButton value={MODE.LIST}>
                  <ListIcon />
                  List Input Mode
                </ToggleButton>
                <ToggleButton value={MODE.TEXT}>
                  <ArticleIcon />
                  Text Input Mode
                </ToggleButton>
              </ToggleButtonGroup>
              {mode === MODE.LIST && (
                <ListModeView
                  setError={setError}
                  players={players}
                  handleAddPlayer={handleAddPlayer}
                  handleRemovePlayer={handleRemovePlayer}
                  updatePlayerInfo={updatePlayerInfo}
                />
              )}
              {mode === MODE.TEXT && (
                <TextModeView
                  setError={setError}
                  text={text}
                  handleOnChange={handleOnTextChange}
                />
              )}
              {error && (
                <Grid2 container item sx={{ marginTop: "1rem", width: "100%" }}>
                  <Alert
                  onClose={clearError}
                    severity="error"
                    sx={{ width: "100%", whiteSpace: 'pre-line' }}
                  >
                    {error}
                  </Alert>
                </Grid2>
              )}
            </CardContent>
          </Card>
        </Grid2>
      </Container>
    </ThemeProvider>
  );
}

export default App;
