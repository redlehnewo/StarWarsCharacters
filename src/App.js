import React, { Component } from "react";
import { Route } from "react-router-dom";

// import ListView from "./list-view/ListView";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import CharacterList from "./containers/Characters/CharacterList";
import Character from "./containers/Characters/Character/Character";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <main className="container">
          <Route path="/:id" component={Character} />
          <Route exact path="/" component={CharacterList} />
        </main>
      </div>
    );
  }
}

export default App;
