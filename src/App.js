import logo from './logo.svg';
import './App.css';
import { CreateNotification } from './CreateNotification';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import { Route, BrowserRouter as Router, 
  Routes 
  // Switch
}   from 'react-router-dom';
import Subscriptions from './Subscriptions';
import HalfScreen from './HalfScreen';
import Notifications from './Notifications';
import { NotificationHook } from './NotificationHook';

function App() {
  return (
    <div className='App'>

      
      <Router>
      <NavBar></NavBar>
      {/* <HalfScreen></HalfScreen> */}
        <Routes>
            <Route element={<Subscriptions/>} path='/' />
            {/* <Route element={<Notifications/>} path='/notifications'></Route> */}
            <Route element={<NotificationHook/>} path='/notifications'></Route>
            <Route element={<CreateNotification/>} path='/notification'></Route>
        </Routes>
        {/* <Switch>
            <Route component={Subscriptions} path='/' />
            <Route component={Notifications} path='/notifications'></Route>
            <Route component={CreateNotification} path='/notification'></Route>
        </Switch> */}
      </Router>
    </div>
  );
}

export default App;
