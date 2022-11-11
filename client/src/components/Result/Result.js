import { useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Unstable_Grid2";

import Summary from "./Summary";
import Transaction from "./Transaction";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ marginY: "1rem" }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Result({ players, transactions }) {
  const [tab, setTab] = useState(0);

  const handleChange = useCallback((e, newValue) => {
    setTab(newValue);
  }, []);

  return (
    <Grid2 xs={12}>
      <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
        <Tabs value={tab} onChange={handleChange} aria-label="result tab">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <Summary players={players} transactions={transactions} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Transaction transactions={transactions} />
      </TabPanel>
    </Grid2>
  );
}
