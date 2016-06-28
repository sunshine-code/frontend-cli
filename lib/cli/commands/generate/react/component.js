import ComponentGenerator from "../../../../generators/react/component";

export const command = "component <name>";

export const describe = "Generate new component";

export const builder = {};

export function handler(argv) {
  new ComponentGenerator(argv).generate();
}
