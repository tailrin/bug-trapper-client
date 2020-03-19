import React, {Component} from 'react';
import fakeDB from "../fakedb"
import Sidebar from "../Sidebar/Sidebar"
import Header from "../Header/Header"
import "./App.css"
import {Route, Link} from 'react-router-dom';


class App extends Component {
  state = {
    userId: 1,
    projects: [...fakeDB.projects],
    issues:[...fakeDB.issues],
    sortBy: "date"
  }

  getProjects(projects){
    return projects.filter(project => project.userId === this.state.userId)
  }

  render(){
    return (
      <div className="full">
        <Header/>
        <Sidebar projects={this.getProjects(this.state.projects)}/>
        
      </div>
    )
  }
}

export default App;
