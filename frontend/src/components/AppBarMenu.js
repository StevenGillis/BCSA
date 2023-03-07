import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
/*
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';*/


export function AppBarMenu() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#13100b' }}>
         <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Thesis Demo
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Insurance claims management on the blockchains
          </Typography>
         </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}