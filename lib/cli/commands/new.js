export const command = "new [path]";

export const describe = "Create new application";

export const builder = {};

export function handler(argv) {
  System.import(`../../generators/${argv.framework}/app`)
    .then(({ default: AppGenerator }) => new AppGenerator(argv).generate());
}
