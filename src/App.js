import React from "react";
import InstructorApp from "./component/router/InstructorApp";



class App extends React.Component {
  constructor(props) {
    super(props);
    };

  render() {
    return (
      <div className="App">
        <InstructorApp />
      </div>
    );
  }

}

export default App;