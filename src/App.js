import logo from './logo.svg';
import './App.css';
import {history} from './history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './containers/HomePage';
import ReadPage from './containers/ReadPage';
import CreatePage from './containers/CreatePage';
import EditPage from './containers/EditPage';


import "../src/assets/css/style.css";
// react-loader-spinner css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Switch history={history}>
         <Route exact path="/" component={HomePage} />
         <Route exact path="/read-info/:id" component={ReadPage} />
         <Route exact path="/add-employee" component={CreatePage} />
         <Route exact path="/edit-info/:id" component={EditPage} />



      </Switch>
    </Router>
  );
}

export default App;
