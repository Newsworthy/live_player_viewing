import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import StreamList from "./components/StreamList";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  StreamList;
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <StreamList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
