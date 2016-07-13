import React, { Component<% if (children) { %>, PropTypes<% } %> } from "react";
<% if (styles) { %>
import style from "./style.<%= stylesExt %>";
<% } %>
export default class <%= name %> extends Component {
  static propTypes = {<% if (children) { %>
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  <% } %>}

  render() {
    return (
      <div<% if (styles) { %> className={style.root}<% } %>><% if (content) { %>
        <%= content %><% } %><% if (children) { %>
        {this.props.children}<% } %>
      </div>
    );
  }
}
