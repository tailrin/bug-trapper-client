import React, {Component} from 'react';
import fakeDB from "../fakedb";
import BottomWrapper from '../BottomWrapper/BottomWrapper';
import Welcome from "../Welcome/Welcome";
import Header from "../Header/Header";
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import "./App.css";
import {Route} from 'react-router-dom';


class App extends Component {
  state = {
    userId: null,
    projects: [...fakeDB.projects],
    issues:[...fakeDB.issues],
    loggedIn: false
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

  getProjects(){
    return this.state.projects.filter(project => project.userId === this.state.userId)
  }

  renderBottom = () => {
    if(this.state.loggedIn){
      return <Route exact path="/" render={
        () => <BottomWrapper projects={this.getProjects()} issues={this.state.issues}/>
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
      </div>
    )
  }
}

export default App;
