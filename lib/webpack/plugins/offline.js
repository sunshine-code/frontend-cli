import OfflinePlugin from "offline-plugin";

export default (options) => new OfflinePlugin({
  caches: {
    main: [":rest:"],
    optional: ["chunks/*.js"]
  },
  safeToUseOptionalCaches: true,
  excludes: ["manifest-*.js", "**/.*", "**/*.map"],
  /**
   * NOTE: It will be better to use the "changed" strategy here, but currently,
   * this plugin cannot track changes in the index.html when the hash of the
   * initial chunks are changing.
   */
  updateStrategy: "all",
  version: "[hash]"
});
