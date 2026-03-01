/// <reference types="node" />

declare module "tailwindcss" {
  export interface Config {
    content?: string | string[];
    theme?: object;
    plugins?: unknown[];
    darkMode?: string | string[];
    prefix?: string;
    [key: string]: unknown;
  }
}

declare module "tailwindcss-animate" {
  const plugin: unknown;
  export default plugin;
}
