import path from "path";
import fs from "fs";

import { DEVELOPMENT, TEST, PRODUCTION } from "./constants";

export function isDevelopment(env) {
  return env == DEVELOPMENT;
}

export function isTest(env) {
  return env == TEST;
}

export function isProduction(env) {
  return env == PRODUCTION;
}

export function resolve(...names) {
  return path.resolve(process.cwd(), ...names);
}

export function exists(path) {
  try {
    return fs.statSync(path);
  } catch (e) {
    return false;
  }
}

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
