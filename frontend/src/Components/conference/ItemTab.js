import React, { useState } from "react";
import TableItems from "./TableItems";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ItemTabPanel from "./ItemTabPanel";

export default function ItemTab() {
  const [a, setA] = useState(0);
  console.log(a);
  const tabClickHandler = index => {
    setA(index);
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
      isActive={a === index}
      index={index}
      key={`tabpanel-${index}`}
    />
  ));

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <StyledWrapper>
      <h2>식탁 꾸미기</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={a}
          onChange={tabClickHandler}
          aria-label="basic tabs example"
        >
          {/* {listTabs} */}
          <Tab label="aaaa" {...a11yProps(10)} />
          <Tab label="bbbb" {...a11yProps(10)} />
        </Tabs>
      </Box>
      {listTabPanels}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .is-active {
    font-weight: bold;
    text-decoration: underline;
  }
`;
