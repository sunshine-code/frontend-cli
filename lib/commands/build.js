export const command = "build";

export const describe = "Build app"

export const builder = {
  env: {
    alias: "e",
    describe: "Set build environment",
    choices: ["development", "test", "production"]
  }
}

export function handler(argv) {
  console.log("You run build. Here is args:", argv);
}
