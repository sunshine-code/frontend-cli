import StylelintGenerator from "../../../../generators/common/stylelint";

export const describe = "Generate stylelint config";

export const builder = {};

export function handler(argv) {
  new StylelintGenerator(argv).generate();
}
