import ActionsGenerator from "../../../../generators/react/actions";

export const command = "actions <name>";

export const describe = "Destroy generated actions";

export const builder = {};

export function handler(argv) {
  new ActionsGenerator(argv).destroy();
}
