import ActionsGenerator from "../../../../generators/react/actions";

export const command = "actions <name> [actions..]";

export const describe = "Generate new actions";

export const builder = {};

export function handler(argv) {
  new ActionsGenerator(argv).generate();
}
