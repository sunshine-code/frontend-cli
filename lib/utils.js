import path from "path";
import fs from "fs";
import chalk from "chalk";

import { DEVELOPMENT, TEST, PRODUCTION, REACT } from "./constants";

// Flags
function compareSymbolOrString(symbol, symbolOrString) {
  return symbol == symbolOrString ||
    Symbol.keyFor(symbol) == symbolOrString;
}

export function isDevelopment(env) {
  return compareSymbolOrString(DEVELOPMENT, env);
}

export function isTest(env) {
  return compareSymbolOrString(TEST, env);
}

export function isProduction(env) {
  return compareSymbolOrString(PRODUCTION, env);
}

export function isReact(name) {
  return compareSymbolOrString(REACT, name);
}

// Paths and files
export function resolveExternal(...pathSegments) {
  return path.resolve(process.cwd(), ...pathSegments);
}

export function resolveInternal(...pathSegments) {
  return path.resolve(__dirname, "..", ...pathSegments);
}

export function exists(path) {
  try {
    return fs.statSync(path);
  } catch (e) {
    return false;
  }
}

// Formatting
export const formatError = chalk.red.bold;
export const formatHighlight = chalk.white.bold;

// Miscellaneous
export function remove(object, key) {
  let value = object[key];
  delete object[key];
  return value;
}

export function humanize(string) {
  return string
    .replace(/[_-]+/g, " ")
    .replace(/(\w+)/g, match => match.charAt(0).toUpperCase() + match.slice(1));
}
