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
    userId: "",
    projects: [],
    issues: [],
    loggedIn: !!window.localStorage.jwt,
    checkedProjects: false,
    checkedIssues: false,
    filterByProject: false,
    filteredIssues: [],
    projectToFilter: ""
  }

  componentDidUpdate = () => {
    const options = config.getOptions('get')
    if(this.state.loggedIn && !this.state.checkedProjects){
      fetch(`${config.API}/projects?user_id=${this.state.userId}`, options).then(res => res.json()).then(res => {
        fetch(`${config.API}/issues?user_id=${this.state.userId}`, options).then(response => response.json()).then(response => {
          this.setState({issues: [...response], checkedIssues: true, projects: [...res], checkedProjects: true})
        });
      });
    }
  }

  reloadUser= () => {
    const options = config.getOptions('get')
    if(this.state.loggedIn){
      fetch(`${config.API}/issues?user_id=${this.state.userId}`, options).then(res => res.json()).then(async res => {
        fetch(`${config.API}/projects?user_id=${this.state.userId}`, options).then(response => response.json()).then(response => {
          this.setState({projects: [...response], checkedProjects: true, issues: [...res], checkedIssues: true})
        });
      });
    }
    
  }
  componentDidMount = () => {
    window.addEventListener('load', this.reloadUser())
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

  getProjectNameById = id => {
    const project = this.state.projects.find(project => project.id === id)
    return project.name
  }

  filterByProject = id => {
    const filterBy = !this.state.filterByProject
    if(this.state.filterByProject && this.state.projectToFilter === id){
      this.setState({projectToFilter: [], projectToFilter: "", filterByProject: filterBy})
    }else{
      const filteredIssues = this.state.issues.filter(issue => issue.project_id === id)
      this.setState({filteredIssues: filteredIssues, projectToFilter: id, filterByProject: filterBy})
    }
  }

  renderBottom = () => {
    if(this.state.loggedIn && this.state.filterByProject){
      return (
        <>
          <Route exact path="/" render={
            () => <Sidebar projects={this.state.projects} filterByProject={this.filterByProject}/>
          }/>
          <Route exact path="/" render={
            () => <Main issues={this.state.filteredIssues} userId={this.state.userId} getProjectNameById={this.getProjectNameById}/>
          }/>
        </>
      )
    }
    if(this.state.loggedIn){
      return (
        <>
          <Route exact path="/" render={
            () => <Sidebar projects={this.state.projects} filterByProject={this.filterByProject}/>
          }/>
          <Route exact path="/" render={
            () => <Main issues={this.state.issues} userId={this.state.userId} getProjectNameById={this.getProjectNameById}/>
          }/>
        </>
      )
    } 
    return <Route exact path="/" component={Welcome}/>
  }

 

  render(){
    if(this.state.loggedIn){
      this.state.userId = JSON.parse(Buffer.from(window.localStorage.jwt.split('.')[1], 'base64').toString('ascii')).user_id 
    }
    return (
      <div className="full" >
        <Header loggedIn={this.state.loggedIn} logout={this.logout} reloadUser={this.reloadUser}/>
        <div className="bottom-wrapper">
          {this.renderBottom()}
          <Route exact path="/login" render={({history}) => {
            return <Login history={history} handleLogin={this.handleLogin}/>
          }} />
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/AddProject" render={({history}) => {
            return <AddProject history={history} userId={this.state.userId} reloadUser={this.reloadUser}/>
          }}/>
          <Route exact path="/ThankYou" component={ThankYou}/>
          <Route exact path="/AddIssue" render={({history}) => {
            return <AddIssue history={history} userId={this.state.userId} projects={this.getProjects()} reloadUser={this.reloadUser}/>
          }}/>
          <Route exact path="/issues/:issue_id" render={
            () => <Sidebar projects={this.getProjects()}/>
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

