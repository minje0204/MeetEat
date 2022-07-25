import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ItemTabPanel from "./ItemTabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ItemTab() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleChange = newValue => {
    setActiveIdx(newValue);
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
    <ItemTabPanel
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
            {listTabs}
          </Tabs>
        </Box>
        {listTabPanels}
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
