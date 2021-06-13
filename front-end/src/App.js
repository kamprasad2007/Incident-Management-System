import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { host_url } from "./route";
import SummaryPage from "./pages/SummaryPage";
import ViewPage from "./pages/ViewPage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";

const InitialState = { users: [], active: null };

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "CHANGE_ACTIVE_USER":
      return {
        ...state,
        active: state.users.find((user) => user.id === action.payload),
      };
    default:
      throw new Error();
  }
};

const APP = () => {
  const [state, dispatch] = useReducer(Reducer, InitialState);

  useEffect(() => {
    axios.get(`${host_url}/api/user`).then((res) => {
      dispatch({ type: "ADD_USERS", payload: res.data });
    });
  }, []);

  const props = { state, dispatch };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <SummaryPage {...props} />} />
        <Route path="/view/:id" component={() => <ViewPage {...props} />} />
        <Route path="/edit/:id" component={() => <EditPage {...props} />} />
        <Route path="/create" component={() => <CreatePage {...props} />} />
      </Switch>
    </Router>
  );
};

export default APP;
