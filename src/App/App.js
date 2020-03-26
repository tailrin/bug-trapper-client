import React, {Component} from 'react';
import BottomWrapper from '../BottomWrapper/BottomWrapper';
import Welcome from "../Welcome/Welcome";
import Header from "../Header/Header";
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import AddProject from '../AddProject/AddProject';
import AddIssue from '../AddIssue/AddIssue';
import ThankYou from '../ThankYou/ThankYou';
import config from '../config';
import "./App.css";
import {Route} from 'react-router-dom';


class App extends Component {
  state = {
    userId: null,
    projects: [],
    issues: [],
    loggedIn: false,
    checkedProjects: false,
    checkedIssues: false
  }

  componentDidUpdate = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${window.localStorage.jwt}`
      }
    } 

    if(this.state.loggedIn && !this.state.checkedProjects){
      fetch(`${config.API}/projects?user_id=${this.state.userId}`, options).then(res => res.json()).then(res => {
        console.log(res)
        this.setState({projects: [...res], checkedProjects: true})
      });
      fetch(`${config.API}/issues?user_id=${this.state.userId}`, options).then(res => res.json()).then(res => {
        console.log(res)
        this.setState({issues: [...res], checkedIssues: true})
      });
    }
  }

  handleLogin = (userId) => {
    const loggedInStatus = !this.state.loggedIn
    this.setState({loggedIn: loggedInStatus, userId: userId})
  }

  logout = () => {
    window.localStorage.removeItem('jwt')
    const loggedInStatus = !this.state.loggedIn
    this.setState({loggedIn: loggedInStatus})
  }

  renderBottom = () => {
    if(this.state.loggedIn){
      return <Route exact path="/" render={
        () => <BottomWrapper projects={this.state.projects} issues={this.state.issues}/>
      }/>
    }
    return <Route exact path="/" component={Welcome}/>
  }

  

  render(){
    return (
      <div className="full">
        <Header loggedIn={this.state.loggedIn} logout={this.logout}/>
        {this.renderBottom()}
        <Route exact path="/login" render={({history}) => {
          return <Login history={history} handleLogin={this.handleLogin}/>
        }} />
        <Route exact path="/SignUp" component={SignUp}/>
        <Route exact path="/AddIssue" component={AddIssue}/>
        <Route exact path="/AddProject" component={AddProject}/>
        <Route exact path="/ThankYou" component={ThankYou}/>
      </div>
    )
  }
}

export default App;
