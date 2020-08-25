import React from 'react';
import clsx from 'clsx';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Menu from './components/menu';
import Footer from './components/Footer';
import TreeDashboard from './components/tree';
import SixDegrees from './components/sixdegrees';
import About from './About';

const App: React.FC = () => {
   const classes = useStyles();

   return (
      <Router>
         <div className={clsx('App', classes.root)}>
            <Menu />
            <main className={classes.content}>
               <Container maxWidth="lg" className={classes.container}>
                  <Switch>
                     <Route path="/" exact component={TreeDashboard} />
                     <Route path="/sixdegrees" component={SixDegrees} />
                     <Route path="/about" component={About} />
                  </Switch>
               </Container>
            </main>
            <Footer>
               Six Degrees of Formula One Teammates.
               <br /> Designed By{' '}
               <Link href="https://www.linkedin.com/in/pratik-chowdhury-889bb2183/">
                  {' '}
                  Pratik Chowdhury
               </Link>
            </Footer>
         </div>
      </Router>
   );
};

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex'
   },
   content: {
      flexGrow: 1,
      height: '90vh',
      overflow: 'auto',
      paddingTop: theme.spacing(4)
   },
   container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
   }
}));

export default App;
