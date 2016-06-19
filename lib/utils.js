import path from "path";
import fs from "fs";

import { DEVELOPMENT, TEST, PRODUCTION, REACT } from "./constants";

export function isDevelopment(env) {
  return env == DEVELOPMENT;
}

export function isTest(env) {
  return env == TEST;
}

export function isProduction(env) {
  return env == PRODUCTION;
}

export function isReact(name) {
  return name == REACT;
}

export function resolveExternal(...pathSegments) {
  return path.resolve(process.cwd(), ...pathSegments);
}

export function resolveInternal(...pathSegments) {
  return path.resolve(__dirname, "..", ...pathSegments);
}

export function resolveExternalModule(...pathSegments) {
  return resolveExternal("node_modules", ...pathSegments)
}

export function resolveInternalModule(...pathSegments) {
  return resolveInternal("node_modules", ...pathSegments)
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
