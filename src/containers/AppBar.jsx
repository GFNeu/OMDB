
import React from 'react';
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../state/modal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import UserMenu from '../components/AvatarMenu'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  btn: {
      marginLeft: theme.spacing(3)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const location = useLocation();
  const showSearch = location.pathname !== '/home'
  const classes = useStyles();
  const dispatch= useDispatch();
  const isLogedin = useSelector(state => state.user.isLogedin)
  //const isLogedin = true


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            OMDB
          </Typography>
          {showSearch && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          )}
          {isLogedin? 
            <UserMenu /> 
            :
            <div>
              <Button
                color="inherit"
                className={classes.btn}
                onClick={() => dispatch(setModal({ open: true, content: "login" }))}
              >
                Login
              </Button>
              <Button
                color="secondary"
                variant="contained"
                className={classes.btn}
                onClick={() =>
                  dispatch(setModal({ open: true, content: "register" }))
                }
              >
                Register
              </Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}