declare module "*.vue";
declare module "*.ts";

// / <reference types="vite-svg-loader" />

declare module "*.svg?component" {
  import { ComponentOptions } from "vue";
  const component: ComponentOptions;
  export default component;
}

interface ImportMetaEnv {
  VITE_PEXELS_KEY: string;
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
