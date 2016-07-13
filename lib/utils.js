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
export function compareSymbolOrString(symbol, symbolOrString) {
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
  } catch (error) {
    return false;
  }
}

export function loadRC() {
  try {
    const CONFIG_PATH = resolveExternal(".frontendrc");
    const DEFAULTS = {
      framework: Symbol.keyFor(REACT),
      lang: Symbol.keyFor(JAVASCRIPT),
      styles: Symbol.keyFor(SCSS)
    };

    return (
      exists(CONFIG_PATH)
      ? Object.assign({}, DEFAULTS, JSON.parse(fs.readFileSync(CONFIG_PATH)))
      : DEFAULTS
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(formatError(`Unable to parse .frontendrc: ${error.message}`));
    } else {
      console.error(formatError(error));
    }

    process.exit(1);
  }
}

// Formatting
export const formatError = chalk.red.bold;
export const formatHighlight = chalk.white.bold;

// Transformations
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
    let value = object[key];
    if (typeof value !== "string") return;

    object[key] = Symbol.for(value);
  });
}
