export const command = "server";

export const describe = "Run development server"

export const builder = {
}

export function handler(argv) {
  console.log("You run server. Here is args:", argv);
}
