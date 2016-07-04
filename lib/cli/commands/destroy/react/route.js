import RouteGenerator from "../../../../generators/react/route";

export const command = "route <component>";

export const describe = "Remove generated route";

export const builder = {};

export function handler(argv) {
  new RouteGenerator(argv).destroy();
}
