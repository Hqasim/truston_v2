import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BellIcon from '@mui/icons-material/Notifications';

import ThemeSwitch from '../themeSwitch/ThemeSwitch';
import CompanyIcon from "../../assets/company-logo.svg";
import UserAvatar from "../../assets/userAvatar.png";

function Header({ darkTheme, setDarkTheme }) {
  const [user, setUser] = useState("")

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    console.log(darkTheme)
  })

  return (
    <AppBar position="static" className={darkTheme ? 'dark-bg' : 'light-bg'}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={CompanyIcon} alt="Company Icon"/>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Badge badgeContent={3} color='warning' style={{marginTop: '1rem', marginRight: '1rem'}}>
            <MailIcon className={darkTheme && 'light-font'} color="action"/>
          </Badge>
          <Badge badgeContent={3} color="warning" style={{marginTop: '1rem', marginRight: '1rem'}}>
            <BellIcon className={darkTheme && 'light-font'} color="action" />
          </Badge>
          <Avatar alt="User Avatar" src={UserAvatar} style={{marginTop:'0.2rem'}}/>
          <Box sx={{ minWidth: 125}}>
            <FormControl fullWidth variant='standard'>
              <InputLabel id="demo-simple-select-label" className={darkTheme && 'light-font'} >Jenny Wilson</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                label="user"
                onChange={handleUserChange}
                disableUnderline
                className={darkTheme && 'light-font'}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box style={{marginTop:'0.5rem'}}>
            <ThemeSwitch checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)}/>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar> 
  );
}

export default Header
