import * as generatorOptions from "../options/generator";

export const command = "init [name]";

export const describe = "Create base application structure";

export const builder = Object.assign({
  git: {
    describe: "Create .gitignore file",
    group: "Generator options:",
    type: "boolean",
    default: true
  },
  install: {
    describe: "Run npm install",
    group: "Generator options:",
    type: "boolean",
    default: true
  }
}, generatorOptions);

export function handler(argv) {
  System.import(`../../generators/${argv.framework}/app`)
    .then(({ default: AppGenerator }) => new AppGenerator(argv).generate());
}
