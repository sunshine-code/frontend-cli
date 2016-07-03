import React, { Component } from "react";
<% if (styles) { %>
import style from "./style.<%= stylesExt %>";
<% } %>
export default class <%= name %> extends Component {
  render() {
    return (
      <div><% if (content) { %>
        <%= content %><% } %><% if (children) { %>
        {this.props.children}<% } %>
      </div>
    );
  }
}
