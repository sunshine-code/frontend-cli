export const WEBPACK_STATS = Object.freeze({
  colors: true,
  assets: false,
  chunkModules: false,
  children: false
});

export function registerCompiler(moduleDescriptor) {
  if (!moduleDescriptor) return Promise.resolve();

  if (typeof moduleDescriptor === "string") {
    return System.import(moduleDescriptor);
  } else if (!Array.isArray(moduleDescriptor)) {
    return System.import(moduleDescriptor.module)
      .then(m => { typeof m === "function" && moduleDescriptor.register(m) });
  } else {
    return new Promise((resolve, reject) => {
      if (!moduleDescriptor.length) return reject();

      registerCompiler(moduleDescriptor[0])
        .then(resolve)
        .catch(() => registerCompiler(moduleDescriptor.slice(1)).then(resolve));
    });
  }
}

export function logger(error, stats) {
  console.log(stats.toString(WEBPACK_STATS));
}
