import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Menu from './Menu';

// React runtime PropTypes
export const AppMenuItemPropTypes = {
   name: PropTypes.string.isRequired,
   link: PropTypes.string.isRequired,
   Icon: PropTypes.elementType
};

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>;

const AppMenuItem: React.FC<AppMenuItemPropTypes> = props => {
   const { name, link, Icon } = props;
   const classes = useStyles();

   const MenuItemRoot = (
      <Menu className={classes.menuItem} link={link}>
         {/* Display an icon if any */}
         {!!Icon && (
            <ListItemIcon className={classes.menuItemIcon}>
               <Icon />
            </ListItemIcon>
         )}
         <ListItemText primary={name} inset={!Icon} />
      </Menu>
   );

   return <>{MenuItemRoot}</>;
};

const useStyles = makeStyles(() =>
   createStyles({
      menuItem: {
         '&.active': {
            background: 'rgba(0, 0, 0, 0.08)',
            '& .MuiListItemIcon-root': {
               color: '#fff'
            }
         }
      },
      menuItemIcon: {
         color: '#97c05c'
      }
   })
);

export default AppMenuItem;
