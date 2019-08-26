import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Main, User, SelectedUser} from './App.js'

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path="/user" component={User}/>
                <Route path="/user:id" component={SelectedUser} />
                <Route exact path="/" component={Main} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
)
