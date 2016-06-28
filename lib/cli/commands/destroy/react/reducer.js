import ReducerGenerator from "../../../../generators/react/reducer";

export const command = "reducer <name>";

export const describe = "Destroy generated reducer";

export const builder = {};

export function handler(argv) {
  new ReducerGenerator(argv).destroy();
}
