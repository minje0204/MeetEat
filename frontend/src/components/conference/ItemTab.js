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

export default function ItemTab(props) {
  const { getDroppable, isDragging, ...other } = props;
  const [activeIdx, setActiveIdx] = useState(0);
  const handleChange = (event, newValue) => {
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
      getDroppable={getDroppable}
      isDragging={isDragging}
      isActive={activeIdx === index}
      index={index}
      {...other}
      key={`tabpanel-${index}`}
    />
  ));

  return (
    <StyledWrapper>
      <Box className="item-tab-container">
        <Box
          className="item-tab"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
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
  .item-tab-container {
    display: flex;
    width: 360px;
    flex-direction: column;
    margin: 2rem 0 2rem 2rem;
  }
  .item-tab {
  }

  .MuiTab-root{
    font-family:"Jua";
    color:#babd42
  }
  .MuiTab-root.Mui-selected{
    font-size: 18px;
    color:#82954b;
  }
  .MuiTabs-indicator{
    background-color:#82954b;
  }
`;
