import path from "path";
import fs from "fs";
import chalk from "chalk";
import { camelCase, snakeCase, toUpper, upperFirst } from "lodash";

import {
  DEVELOPMENT,
  TEST,
  PRODUCTION,
  REACT,
  JAVASCRIPT,
  TYPESCRIPT,
  SCSS,
  POSTCSS
} from "./constants";

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

export function isJavascript(name) {
  return compareSymbolOrString(JAVASCRIPT, name);
}

export function isTypescript(name) {
  return compareSymbolOrString(TYPESCRIPT, name);
}

export function isSCSS(name) {
  return compareSymbolOrString(SCSS, name);
}

export function isPostcss(name) {
  return compareSymbolOrString(POSTCSS, name);
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

export function camelize(string, uppercaseFirst = true) {
  string = camelCase(string);
  return uppercaseFirst ? upperFirst(string) : string;
}

export function constantize(string) {
  return toUpper(snakeCase(string));
}

export function symbolizeValues(object, ...keys) {
  keys.forEach(key => {
    object[key] = Symbol.for(object[key]);
  });
}
