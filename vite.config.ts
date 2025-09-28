import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // basicSsl(),
    nodePolyfills({ include: ["buffer"] }),
    preact(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Ryan's Collection of Tools",
        short_name: "ryans-tools",
        description:
          "A collection of tools I put together that I believe should be free and shouldn't need to run on someone elses servers",
        theme_color: "#ffffff",
        display: "standalone",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,wasm}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      $lib: path.resolve(__dirname, "./src/lib"),
    },
  },
  optimizeDeps: {
    exclude: [
      "@jsquash/avif",
      "@jsquash/jpeg",
      "@jsquash/oxipng",
      "@jsquash/png",
      "@jsquash/webp",
    ],
  },
  worker: {
    format: "es",
  },
});
