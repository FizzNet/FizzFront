import {defineConfig} from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    resolve: {
        alias: [
            // { find: '@', replacement: resolve(__dirname, 'src') },
            { find: '@src', replacement: resolve(__dirname, 'src') },
            { find: '@comps', replacement: resolve(__dirname, 'src/components') },
            { find: '@routes', replacement: resolve(__dirname, 'src/components/routes') },
            { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
        ],
    },

    plugins: [tsconfigPaths()]
})