import ReducerGenerator from "../../../../generators/react/reducer";

export const command = "reducer <name>";

export const describe = "Generate new reducer";

export const builder = {};

export function handler(argv) {
  new ReducerGenerator(argv).generate();
}
