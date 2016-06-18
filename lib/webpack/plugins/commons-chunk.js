import { optimize } from "webpack";

/**
 * NOTE: At the moment of release the filename setting did not affects data
 * written to the manifest file and webpack will try to load these files from
 * the wrong location. But the initial chunks are always included to index.html
 * file as a <script> tags with the correct file paths specified, so we can use
 * custom filenames for chunks as long as we not applying this setting to chunks
 * that should be loaded asynchronously.
 */
const OUTPUT_FILENAME = "[name]-[chunkhash:20].js";

export default () => [
  new optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: OUTPUT_FILENAME,
    chunks: ["application"],
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new optimize.CommonsChunkPlugin({
    name: "manifest",
    filename: OUTPUT_FILENAME
  })
];
