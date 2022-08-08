import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from "@emotion/styled";
import SearchFriends from 'components/friends/SearchFriends';
import SearchInputFriends from 'components/friends/SearchInputFriends';
import MyFriends from 'components/friends/MyFriends';
// import CloseIcon from '@mui/icons-material/Close';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabFriends() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledWrapper>
      <div id="friend-dialog">
        <Box sx={{ width: "100%", bgcolor: "#FFEF82" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered indicatorColor="secondary" textColor= "secondary" >
            <Tab label="밥친구 요청" {...a11yProps(0)} sx={{fontSize: 20, fontFamily: "Jua"}} />
            <Tab label="밥친구 목록" {...a11yProps(1)} sx={{fontSize: 20, fontFamily: "Jua"}}/>
            <Tab label="밥친구 검색" {...a11yProps(2)} sx={{fontSize: 20, fontFamily: "Jua"}}/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div>
            친구 추가를 보낸 유저들
          </div>
        </TabPanel>
        <TabPanel component="span" value={value} index={1} id="friend-list">
          <div>
            <MyFriends />
          </div>
        </TabPanel>
        <TabPanel component="span" value={value} index={2}>
          <div id="search">
            <SearchFriends />
            <SearchInputFriends />
          </div>
        </TabPanel>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  p.MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root {
    component: span;
  }
  #friend-dialog {
    width: 450px;
    height: 580px;
    border: 6px dashed #EFD345;
  }
  #search {
    display: flex;
    justify-content: space-around;
  }
  #friend-list {
    overflow: auto;
    height: 530px;
  }
`;