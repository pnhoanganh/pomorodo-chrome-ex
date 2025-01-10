import React from 'react'
import logo from '../assets/img/logo.png'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Toolbar from './components/Toolbar/Toolbar'
import Timer from './components/Timer/Timer'
import Task from './components/TodoList/TodoList'
import './Popup.css'

export const Popup = () => {
  return (
    <main>
      <Router>
        <header>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img src={logo} alt="Pomodoro logo" />
            </div>
            <a
              href="../../options.html"
              className="fs-3 d-flex justify-content-end pb-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-gear-fill"></i>
            </a>
          </div>

          <h3 className="mt-3 fw-medium title mb-5 lh-sm text-uppercase">Pomodoro Timer</h3>
          <div className="d-flex flex-column align-items-center">
            <Toolbar />
          </div>
        </header>

        <div className="content">
          <Switch>
            <Route exact path="/timer" component={Timer} />
            <Route exact path="/task" component={Task} />
            {/* <Route exact path="/note" component={Note} /> */}
            <Redirect to="/timer" />
          </Switch>
        </div>
      </Router>
    </main>
  )
}

export default Popup
