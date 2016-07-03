import StylelintGenerator from "../../../../generators/common/stylelint";
import * as generatorOptions from "../../../options/generator";

export const describe = "Generate stylelint config";

export const builder = generatorOptions;

export function handler(argv) {
  new StylelintGenerator(argv).generate();
}
