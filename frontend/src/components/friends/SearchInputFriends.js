import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInputFriends(props) {
  const { setSearchName, setSearchSign } = props;

  function onKeyDown(e) {
    if(e.keyCode === 13){
      setSearchSign(1);
   }
  }
  
  return (
      <Paper
        component="span"
        sx={{ p: '2px', display: 'flex', alignItems: 'center', width: 250, height: 50, boxShadow: 0, border: 1, borderColor: "grey.400" }}
      >
        <InputBase
          component="span"
          sx={{ flex: 1, fontSize: 20, fontFamily: "Jua", ml: 2 }}
          placeholder="입력해 주세요."
          inputProps={{ 'aria-label': 'input' }}
          onChange={e => setSearchName(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Divider component="span" sx={{ height: 28 }} orientation="vertical" />
        <IconButton onClick={() => setSearchSign(1)} component="span" type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
  );
}