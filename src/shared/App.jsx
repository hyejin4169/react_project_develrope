import React from "react";
import { Button, Grid } from '../elements';
import './App.css';
import Main from './../page/Main';
import Detail from '../page/Detail';

import Login from "../page/Login";
import Signup from "../page/Signup";
import PostWrite from "../page/PostWrite";
import Header from "../component/Header";

import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user'

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  React.useEffect(()=>{
    if(token){
      console.log('토큰있다!')
      dispatch(userActions.loginCheckDB());
    }
  },[])

  return (
    <>
      <Header></Header>
      <Grid maxWidth="1200px" margin="0 auto">
        <ConnectedRouter history={history}>
          <Header />
          <Route path="/" exact component={Main} />
          <Grid margin="120px 0 0 0">
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/detail" exact component={Detail} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/write" exact component={PostWrite} />
            <Route path="/write/:id" exact component={PostWrite} />
          </Grid>
        </ConnectedRouter>
      </Grid>
    </>
  );
}

export default App;
