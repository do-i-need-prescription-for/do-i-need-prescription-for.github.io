require("esbuild").buildSync({
    entryPoints: [
        "./src/app.ts",
    ],
    bundle: true,
    minify: process.env.MINIFY === "true",
    outdir: "../docs/assets/js",
});
