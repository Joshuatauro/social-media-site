
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar'
import SignUp from './Components/SignUpComponent/SignUp'
import Login from "./Components/LogInComponent/Login"
import CreatePost from './Components/CreatePostComponent/CreatePost';
import SinglePost from './Components/SinglePost/SinglePost';
import PlatformHome from './Components/PlatformHome/PlatformHome';
import UserSettings from './Components/UserSettingsComponent/UserSettings';

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

          <Route path="/post/:postID">
            <SinglePost />
          </Route>

          <Route path="/platform/:subPlatform">
            <PlatformHome />
          </Route>

          <Route path="/dev/:userName">
            <UserSettings />
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
