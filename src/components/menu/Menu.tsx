import React, { forwardRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { NavLink, NavLinkProps } from 'react-router-dom';

const Menu: React.FC<{
   className: string;
   link: string;
}> = props => {
   const { className, link, children } = props;

   // Return a LitItem with a link component
   return (
      <ListItem
         button
         className={className}
         component={forwardRef((props2: NavLinkProps, ref: any) => (
            <NavLink exact {...props2} innerRef={ref} />
         ))}
         to={link}
      >
         {children}
      </ListItem>
   );
};

export default Menu;
