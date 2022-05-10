/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAUGE_LINK: string;
  readonly VITE_SECTION_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_IMAGE_URL_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
