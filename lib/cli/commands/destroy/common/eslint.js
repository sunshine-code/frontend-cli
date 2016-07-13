import EslintGenerator from "../../../../generators/common/eslint";

export const describe = "Destroy eslint config";

export const builder = {};

export function handler(argv) {
  new EslintGenerator(argv).destroy();
}
