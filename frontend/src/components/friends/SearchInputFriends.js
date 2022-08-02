import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInputFriends() {
  return (
      <Paper
        component="span"
        sx={{ p: '2px', display: 'flex', alignItems: 'center', width: 250, height: 52 }}
      >
        <InputBase
          component="span"
          sx={{ flex: 1 }}
          placeholder=" 입력해 주세요."
          inputProps={{ 'aria-label': 'input' }}
        />
        <Divider component="span" sx={{ height: 28 }} orientation="vertical" />
        <IconButton component="span" type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
  );
}