import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import ItemTabPanel from "./ItemTabPanel";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ItemTab() {
  const [activeIdx, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabContArr = [
    {
      tabTitle: "식기류",
    },
    {
      tabTitle: "한식",
    },
    {
      tabTitle: "일식",
    },
    {
      tabTitle: "양식",
    },
  ];

  const listTabs = tabContArr.map((tabCont, index) => (
    <Tab
      label={tabCont.tabTitle}
      {...a11yProps(index)}
      key={`${tabCont}-${index}`}
    />
  ));

  const listTabPanels = tabContArr.map((tabCont, index) => (
    <TabPanel
      isActive={activeIdx === index}
      index={index}
      key={`tabpanel-${index}`}
    />
  ));

  return (
    <StyledWrapper>
      <h2>식탁 꾸미기</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeIdx}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={activeIdx} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={activeIdx} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={activeIdx} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .is-active {
    font-weight: bold;
    text-decoration: underline;
  }
`;
