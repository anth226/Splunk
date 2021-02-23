import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from 'pages/Home';
import EntityList from 'pages/EntityList';

function Routes() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/entityList' component={EntityList} />
    </Router>
  );
};

export default Routes;