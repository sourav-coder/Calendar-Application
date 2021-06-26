import React from "react";
import Head from "./Head";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Items from "./Items"
import "./style.css";

export default function App() {
  const [date, setDate] = React.useState(new Date().getDate());

  return (
    <Router>
      <Head date={date} />

      
      
      
    </Router>
  );
}
