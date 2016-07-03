import ReducerGenerator from "../../../../generators/react/reducer";
import * as generatorOptions from "../../../options/generator";

export const command = "reducer <name>";

export const describe = "Generate new reducer";

export const builder = generatorOptions;

export function handler(argv) {
  new ReducerGenerator(argv).generate();
}
