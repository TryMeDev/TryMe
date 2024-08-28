import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "TryMe",
    short_name: "TryMe",
    description: "Try Me!",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {
    globPatterns: [
      "**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,otf}",
      "src/assets/**/*",
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
