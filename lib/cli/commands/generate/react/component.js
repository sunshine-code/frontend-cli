import * as generatorOptions from "../../../options/generator";
import { symbolizeValues } from "../../../../utils";
import ComponentGenerator from "../../../../generators/react/component";

export const command = "component <name>";

export const describe = "Generate new component";

export const builder = Object.assign({
  route: {
    describe: "Assign route for the component",
    group: "Generator options:",
    default: true
  },
  children: {
    describe: "Component should render children components",
    group: "Generator options:",
    type: "boolean"
  },
  assets: {
    describe: "Create assets folder",
    group: "Generator options:",
    type: "boolean",
    default: true
  }
}, generatorOptions);

export function handler(argv) {
  symbolizeValues(argv, "lang", "styles");

  new ComponentGenerator(argv).generate();
}
