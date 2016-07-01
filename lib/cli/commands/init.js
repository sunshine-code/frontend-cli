export const command = "init [name]";

export const describe = "Create base application structure";

export const builder = {};

export function handler(argv) {
  System.import(`../../generators/${argv.framework}/app`)
    .then(({ default: AppGenerator }) => new AppGenerator(argv).generate());
}
