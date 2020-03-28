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
import {Route, Switch} from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';


class App extends Component {
  constructor(props) {
    super(props);
    const initialState = {
      userId: "",
      projects: [],
      issues: [],
      loggedIn: !!window.sessionStorage.jwt,
      checkedProjects: false,
      checkedIssues: false,
      filterByProject: false,
      filteredIssues: [],
      projectToFilter: ""
    }           
    this.state = JSON.parse(sessionStorage.getItem('state'))
        ? JSON.parse(sessionStorage.getItem('state'))
        : initialState
    const orginial = this.setState;     
    this.setState = function() {
      let arguments0 = arguments[0];
      let arguments1 = () => (arguments[1], sessionStorage.setItem('state', JSON.stringify(this.state)));
      orginial.bind(this)(arguments0, arguments1);
    };
    
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

  handleLogin = (userId) => {
    const loggedInStatus = !this.state.loggedIn
    this.setState({loggedIn: loggedInStatus, userId: userId})
  }

  logout = () => {
    window.sessionStorage.removeItem('jwt')
    window.sessionStorage.removeItem('state')
    this.setState({
      userId: null,
      projects: [],
      issues: [],
      loggedIn: false,
      checkedProjects: false,
      checkedIssues: false
    })
  }

  renderSidebar = () => {
    return <Sidebar projects={this.state.projects} filterByProject={this.filterByProject} reloadUser={this.reloadUser}/>
  }

  getProjectNameById = id => {
    const project = this.state.projects.find(project => project.id === id)
    return project.name
  }

  filterByProject = id => {
    console.log(this.state.filterByProject && this.state.projectToFilter === id)
    if(this.state.filterByProject && this.state.projectToFilter === id){
      this.setState({filteredIssues: [], projectToFilter: "", filterByProject: false})
    }else{
      const filteredIssues = this.state.issues.filter(issue => issue.project_id === id)
      this.setState({filteredIssues: filteredIssues, projectToFilter: id, filterByProject: true})
    }
  }

  getIssues = () => {
    if(this.state.filterByProject){
      return this.state.filteredIssues
    }
    return this.state.issues
  }

  renderHome = () => {
    if(this.state.loggedIn){
      return (
        <Route exact path="/" render={
            () => <Main issues={this.getIssues()} userId={this.state.userId} getProjectNameById={this.getProjectNameById}>
              {this.renderSidebar()}
            </Main>
        }/>
      )
    } 
    return <Route exact path="/" component={Welcome}/>
  }

 

  render(){
   
    return (
      <div className="full" >
        <Header loggedIn={this.state.loggedIn} logout={this.logout} reloadUser={this.reloadUser}/>
        <div className="bottom-wrapper">
          <Switch>
            <Route exact path="/issues/:issue_id" render={({match, history}) => {
              return (
                <Issue getById={this.getById} match={match} history={history}>
                  <Sidebar projects={this.state.projects} reloadUser={this.reloadUser} filterByProject={this.filterByProject}/>
                </Issue>
              )
            }}/>
            <Route exact path="/AddIssue" render={({history}) => {
                return <AddIssue history={history} userId={this.state.userId} projects={this.state.projects} reloadUser={this.reloadUser}/>
            }}/>
            <Route exact path="/AddProject" render={({history}) => {
                return <AddProject history={history} userId={this.state.userId} reloadUser={this.reloadUser}/>
            }}/>
            {this.renderHome()}
            <Route exact path="/login" render={({history}) => {
              return <Login history={history} handleLogin={this.handleLogin}/>
            }} />
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/ThankYou" component={ThankYou}/>
            <Route component={PageNotFound}/>
          </Switch>
          
        </div>
      </div>
    )
  }
}

export default App;

