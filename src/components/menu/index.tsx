import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';

import IconDashboard from '@material-ui/icons/Dashboard';
import IconInfo from '@material-ui/icons/Description';
import IconAbout from '@material-ui/icons/InfoOutlined';
import MenuIcon from '@material-ui/icons/Menu';

import Divider from '@material-ui/core/Divider';
import {
   CssBaseline,
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Hidden,
   Drawer
} from '@material-ui/core';

import AppMenuItem from './MenuItem';

const appMenuItems = [
   {
      name: 'Dashboard',
      link: '/',
      Icon: IconDashboard
   },
   {
      name: 'Six Degrees',
      link: '/sixdegrees',
      Icon: IconInfo
   },
   {
      name: 'About',
      link: '/about',
      Icon: IconAbout
   }
];

export function MenuItems({ classes }: { classes: { toolbar: string } }) {
   return (
      <>
         {' '}
         <div className={classes.toolbar} />
         <Divider />
         <List component="nav" disablePadding>
            {appMenuItems.map((item, index) => (
               // eslint-disable-next-line react/no-array-index-key
               <AppMenuItem {...item} key={`${index}333a`} />
            ))}
         </List>
      </>
   );
}

const AppMenu: React.FC = () => {
   const theme = useTheme();
   const classes = useStyles();
   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const container = window != null ? () => window.document.body : null;
   return (
      <>
         <CssBaseline />
         <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" noWrap>
                  Six Degrees of F1
               </Typography>
            </Toolbar>
         </AppBar>
         <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
               <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                     paper: classes.drawerPaper
                  }}
                  ModalProps={{
                     keepMounted: true // Better open performance on mobile.
                  }}
               >
                  <MenuItems classes={classes} />
               </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
               <Drawer
                  classes={{
                     paper: classes.drawerPaper
                  }}
                  variant="permanent"
                  open
               >
                  <MenuItems classes={classes} />
               </Drawer>
            </Hidden>
         </nav>
      </>
   );
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex'
   },
   drawer: {
      [theme.breakpoints.up('sm')]: {
         width: drawerWidth,
         flexShrink: 0
      }
   },
   appBar: {
      [theme.breakpoints.up('sm')]: {
         width: `calc(100% - ${drawerWidth}px)`,
         marginLeft: drawerWidth
      }
   },
   menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
         display: 'none'
      }
   },
   // necessary for content to be below app bar
   toolbar: theme.mixins.toolbar,
   drawerPaper: {
      width: drawerWidth,
      position: 'relative',
      whiteSpace: 'nowrap',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      background: '#535454',
      color: '#fff',
      height: '100vh'
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3)
   }
}));

export default AppMenu;
