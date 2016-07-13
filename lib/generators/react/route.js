import fs from "fs";
import { snakeCase } from "lodash";

import Generator from "../../generator";
import { GENERATE, DESTROY, APPEND, TRUNCATE, logAction } from "../../generator/support";
import { ENTRY_PATH } from "../../constants";
import { camelize, resolveExternal } from "../../utils";

const ROUTES_PATH = resolveExternal(ENTRY_PATH, "Routes.jsx");

export default class RouteGenerator extends Generator {
  constructor(options) {
    options.path = options.path || snakeCase(options.component);
    options.component = camelize(options.component);

    const CHECK_PRESENCE_REGEXP = new RegExp(`Route[^>]+component={${options.component}}`);

    super(options);

    this.routes = fs.readFileSync(ROUTES_PATH).toString();

    this.actions = [
      !CHECK_PRESENCE_REGEXP.test(this.routes) && {
        action: this.addRoute.bind(this),
        modes: [GENERATE]
      },

      CHECK_PRESENCE_REGEXP.test(this.routes) && {
        action: this.removeRoute.bind(this),
        modes: [DESTROY]
      }
    ].filter(Boolean);
  }

  addRoute() {
    const COMPONENT_IMPORT = `import ${this.options.component} from "./components/${this.options.component}";`;
    const ROUTE = `<Route path="${this.options.path}" component={${this.options.component}} />`;

    fs.writeFileSync(
      ROUTES_PATH,
      this.routes
        .replace(/(import[^\n]+\n)(\s*export)/, `$1${COMPONENT_IMPORT}\n$2`)
        .replace(/(\s*)<\/Route>\s*<\/Router>/, `$1  ${ROUTE}$&`)
    );

    logAction(APPEND, ROUTES_PATH);
  }

  removeRoute() {
    const COMPONENT_IMPORT_REGEXP = new RegExp(`import[^\\n]+\\./components/${this.options.component}[^\\n]+\\n`);
    const ROUTE_REGEXP = new RegExp(`\\s*<[^>]*Route[^>]+component={${this.options.component}}[^>]*/>[^<\\n]*`);

    fs.writeFileSync(
      ROUTES_PATH,
      this.routes
        .replace(COMPONENT_IMPORT_REGEXP, "")
        .replace(ROUTE_REGEXP, "")
    );

    logAction(TRUNCATE, ROUTES_PATH);
  }
}
