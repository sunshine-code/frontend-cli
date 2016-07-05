import HTMLGenerator from "../../../../generators/common/html";

export const describe = "Destroy index.html template";

export const builder = {};

export function handler(argv) {
  new HTMLGenerator(argv).destroy();
}
