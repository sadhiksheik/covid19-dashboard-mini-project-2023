import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Vaccination from './components/Vaccination'
import StateSpecifiedRoute from './components/StateSpecifiedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route exact path="/state/:stateCode" component={StateSpecifiedRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
