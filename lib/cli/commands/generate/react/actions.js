import ActionsGenerator from "../../../../generators/react/actions";
import * as generatorOptions from "../../../options/generator";

export const command = "actions <name> [actions..]";

export const describe = "Generate new actions";

export const builder = generatorOptions;

export function handler(argv) {
  new ActionsGenerator(argv).generate();
}
