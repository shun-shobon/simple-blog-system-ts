import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

esbuild.build({
  entryPoints: ["src/main.ts"],
  outfile: "dist/app.js",
  platform: "node",
  minify: true,
  bundle: true,
  plugins: [nodeExternalsPlugin()],
});
