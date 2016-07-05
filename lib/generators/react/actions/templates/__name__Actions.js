import Types from "../constants/ActionTypes";
<% actions.forEach(actionName => { %>
export function <%= actionName %>() {
  return {
    type: Types.<%= constantize(actionName) %>
  };
}
<% }); %>