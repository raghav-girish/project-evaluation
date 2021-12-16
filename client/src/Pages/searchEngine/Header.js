import React from 'react';

import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component {

  render() {
    console.log(this.state);
    return (
      <div>
<AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" >
      KRCE Search Engine
      </Typography>
  </Toolbar>
</AppBar>

      </div>
    )
  }
}

export default Header;
