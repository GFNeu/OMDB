import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../state/user'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles((theme) => ({
    root:{
        marginLeft: theme.spacing(3)
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    negativeMargin:{
        marginLeft: theme.spacing(2)
    },
    littleMargin: {
        marginRight: theme.spacing(1)
    }
  }));

const AvatarMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const user = useSelector(state => state.user.userData)
    const dispatch = useDispatch()
    console.log("avatar",user)
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleAccount = () => {
        setAnchorEl(null);
    };

    const handleFav = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout()).then(()=>setAnchorEl(null))
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setAnchorEl(null);
        }
      }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div className={classes.root}>
        <IconButton
          aria-label="user"
          aria-describedby={id}
          size="small"
          onClick={handleClick}
        >
          <Avatar alt={user.fullName} className={classes.orange}>
            {user.fullName[0]}
          </Avatar>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className={classes.negativeMargin}
        >
          <Paper>
            <MenuList
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              <MenuItem onClick={handleAccount} name="account"><AccountCircleIcon className={classes.littleMargin}/> Profile</MenuItem>
              <MenuItem onClick={handleFav} name="fav"><FavoriteBorderIcon className={classes.littleMargin}/>My favourites</MenuItem>
              <MenuItem onClick={handleLogout} name="logout"><PowerSettingsNewIcon className={classes.littleMargin}/>Logout</MenuItem>
            </MenuList>
          </Paper>
        </Popover>
      </div>
    );
}

export default AvatarMenu
