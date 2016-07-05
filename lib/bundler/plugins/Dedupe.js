import { optimize } from "webpack";

export default () => new optimize.DedupePlugin();
