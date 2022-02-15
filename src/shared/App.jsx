import { Button, Grid } from "../elements";
import "./App.css";

import Login from "../page/Login";
import Signup from "../page/Signup";
import Main from "./../page/Main";
import Detail from "../page/Detail";
import PostWrite from "../page/PostWrite";
import Header from "../component/Header";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

function App() {
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
          </Grid>
          <Button
            float_btn
            _onClick={() => {
              history.push("/write");
            }}
          ></Button>
        </ConnectedRouter>
      </Grid>
    </>
  );
}

export default App;
