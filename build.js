const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['./src/ts/index.ts'], // Your entry TypeScript file
        bundle: true, // Bundle the dependencies into a single file
        outfile: './dist/index.js', // Output file
        target: ['es6'], // Target ES6 for older browser compatibility
        format: 'iife', // Immediately Invoked Function Expression (no modules)
        platform: 'browser', // Targeting the browser environment
        sourcemap: true, // Optional: Generate a sourcemap for debugging
    })
    .catch(() => process.exit(1));
