import RouteGenerator from "../../../../generators/react/route";

export const command = "route <component> [path]";

export const describe = "Add new route";

export const builder = {};

export function handler(argv) {
  new RouteGenerator(argv).generate();
}
