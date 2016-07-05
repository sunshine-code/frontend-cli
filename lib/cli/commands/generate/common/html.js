import HTMLGenerator from "../../../../generators/common/html";
import * as generatorOptions from "../../../options/generator";

export const describe = "Generate index.html template";

export const builder = generatorOptions;

export function handler(argv) {
  new HTMLGenerator(argv).generate();
}
