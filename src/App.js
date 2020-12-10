
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar'
import SignUp from './Components/SignUpComponent/SignUp'
import Login from "./Components/LogInComponent/Login"
import CreatePost from './Components/CreatePostComponent/CreatePost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
