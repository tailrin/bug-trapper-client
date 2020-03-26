import React, {Component} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Welcome from "../Welcome/Welcome";
import Header from "../Header/Header";
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import AddIssue from '../AddIssue/AddIssue';
import Issue from '../Issue/Issue';
import AddProject from '../AddProject/AddProject';
import ThankYou from '../ThankYou/ThankYou';
import Main from '../Main/Main';
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
    this.setState({
      userId: null,
      projects: [],
      issues: [],
      loggedIn: false,
      checkedProjects: false,
      checkedIssues: false
    })
  }

  renderBottom = () => {
    if(this.state.loggedIn){
      return (
        <>
          <Route exact path="/" render={
            () => <Sidebar projects={this.state.projects}/>
          }/>
          <Route exact path="/" render={
            () => <Main issues={this.state.issues} userId={this.state.userId} />
          }/>
        </>
      )
    }
    return <Route exact path="/" component={Welcome}/>
  }

  

  render(){
    return (
      <div className="full">
        <Header loggedIn={this.state.loggedIn} logout={this.logout}/>
        <div className="bottom-wrapper">
          {this.renderBottom()}
          <Route exact path="/login" render={({history}) => {
            return <Login history={history} handleLogin={this.handleLogin}/>
          }} />
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/AddProject" component={AddProject}/>
          <Route exact path="/ThankYou" component={ThankYou}/>
          <Route exact path="/AddIssue" render={({history}) => {
            return <AddIssue history={history} userId={this.props.userId} />
          }}/>
          <Route exact path="/issues/:issue_id" render={
            () => <Sidebar projects={this.state.projects}/>
          }/>
          <Route exact path="/issues/:issue_id" render={({match}) => {
            return <Issue getById={this.getById} match={match}/>
          }}/>
        </div>
      </div>
    )
  }
}

export default App;

