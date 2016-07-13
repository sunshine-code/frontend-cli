import EslintGenerator from "../../../../generators/common/eslint";
import * as generatorOptions from "../../../options/generator";

export const describe = "Generate eslint config";

export const builder = generatorOptions;

export function handler(argv) {
  new EslintGenerator(argv).generate();
}
