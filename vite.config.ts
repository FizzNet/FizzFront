import {defineConfig} from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    resolve: {
        alias: [
            { find: '@src', replacement: resolve(__dirname, 'src') },
        ],
    },

    plugins: [tsconfigPaths()]
})