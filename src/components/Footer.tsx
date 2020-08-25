import React from 'react';
import { Typography } from '@material-ui/core';

const Footer: React.FC = ({ children }) => {
   return (
      <div
         style={{
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            position: 'absolute'
         }}
      >
         <Typography variant="body1">{children}</Typography>
      </div>
   );
};

export default Footer;
