import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import SearchFriends from "components/friends/SearchFriends";
import SearchInputFriends from "components/friends/SearchInputFriends";
import MyFriends from "components/friends/MyFriends";

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
          <Typography component={"span"}>{children}</Typography>
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
function a22yProps(index) {
  return {
    id: `sub-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabFriends() {
  const [value, setValue] = React.useState(1);
  const [subValue, setSubValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const subHandleChange = (event, newValue) => {
    setSubValue(newValue);
  };

  return (
    <StyledWrapper>
      <div id="friend-dialog">
        <Box sx={{ width: "100%", bgcolor: "#FFEF82" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              label="밥친구 요청"
              {...a11yProps(0)}
              sx={{ fontSize: 20, fontFamily: "Jua" }}
            />
            <Tab
              label="밥친구 목록"
              {...a11yProps(1)}
              sx={{ fontSize: 20, fontFamily: "Jua" }}
            />
            <Tab
              label="밥친구 검색"
              {...a11yProps(2)}
              sx={{ fontSize: 20, fontFamily: "Jua" }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div id="friend-request">
            <Tabs
              id="subtab"
              value={subValue}
              onChange={subHandleChange}
              aria-label="basic tabs example"
              centered
              sx={{ p: 1 }}
              indicatorColor=""
              textColor="inherit"
            >
              <Tab
                label="받은 요청"
                {...a22yProps(0)}
                sx={{ fontSize: 20, fontFamily: "Jua" }}
              />
              <Tab
                label="보낸 요청"
                {...a22yProps(1)}
                sx={{ fontSize: 20, fontFamily: "Jua" }}
              />
            </Tabs>
            <hr id="horizon-line" />
            <TabPanel id="subtab-detail" value={subValue} index={0}>
              <div id="request-example-1"></div>
              <div id="request-example-1"></div>
              <div id="request-example-1"></div>
              <div id="request-example-1"></div>
              <div id="request-example-1"></div>
            </TabPanel>
            <TabPanel id="subtab-detail" value={subValue} index={1}>
              <div id="request-example-1"></div>
              <div id="request-example-1"></div>
            </TabPanel>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} id="friend-list">
          <div>
            <MyFriends />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div id="search">
            <SearchFriends />
            <SearchInputFriends />
          </div>
          <hr id="horizon-line" />
          <div id="search-result">
            <div id="example-1"></div>
            <div id="example-1"></div>
            <div id="example-1"></div>
            <div id="example-1"></div>
            <div id="example-1"></div>
          </div>
        </TabPanel>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #friend-dialog {
    width: 450px;
    height: 580px;
    border: 6px dashed #efd345;
    overflow: auto;
  }
  #friend-request {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #simple-tabpanel-0 > div {
    padding: 0px;
  }
  #subtab-detail > div {
    padding: 0px;
  }
  #subtab-detail > div > span {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #request-example-1 {
    width: 346.792px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 4px solid #efd345;
    border-radius: 20px;
  }
  #subtab {
    color: #82954b;
    margin-top: 15px;
  }
  #subtab-detail {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  #search {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 30%;
  }
  #friend-list {
    overflow: auto;
    height: 530px;
  }
  #search-result {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #horizon-line {
    margin: 10px 0 5px;
    width: 100%;
    border: 0;
    height: 1px;
    background-color: #e2e2e2;
  }
  #example-1 {
    height: 70px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 4px solid #efd345;
    border-radius: 20px;
  }
`;
