import StylelintGenerator from "../../../../generators/common/stylelint";

export const describe = "Destroy stylelint config";

export const builder = {};

export function handler(argv) {
  new StylelintGenerator(argv).destroy();
}
