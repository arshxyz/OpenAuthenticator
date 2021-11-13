import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// Chakra-UI for modals
import { ChakraProvider } from '@chakra-ui/react';
import MainScreen from './components/MainScreen';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainScreen />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
