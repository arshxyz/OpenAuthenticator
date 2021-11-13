import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MainScreen from './components/MainScreen';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainScreen />
        </Route>
      </Switch>
    </Router>
  );
}
