import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import PostMap from "./containers/PostMap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <PostMap/>
    );
  }
}

