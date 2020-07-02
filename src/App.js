import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import PostMap from "./containers/PostMap";
import  {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  deviceType
} from "react-device-detect"; 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <PostMap deviceType={deviceType}/>
    );
  }
}

