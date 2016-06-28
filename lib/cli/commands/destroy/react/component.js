import ComponentGenerator from "../../../../generators/react/component";

export const command = "component <name>";

export const describe = "Destroy generated component";

export const builder = {};

export function handler(argv) {
  new ComponentGenerator(argv).destroy();
}
