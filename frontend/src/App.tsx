import { Navigate, Route, Router } from "@solidjs/router";
import './App.css'
import HomeLayout from './routes';
import type { Component } from "solid-js";
import ConfidentialityView from "./routes/confidentiality/ConfidentialityView";

const App: Component = () => {

  return (
    <Router>
      <Route path="/" component={HomeLayout} />
      {/* <Route path="/auth" component={AuthView} /> */}
      <Route path="/" component={() => <Navigate href="/" />} />
      <Route path="/private" component={ConfidentialityView} />
      <Route path="*" component={() => <Navigate href="/" />} />
    </Router>


  );
};

export default App;



