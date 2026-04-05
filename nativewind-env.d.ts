/// <reference types="nativewind/types" />

// Allow `import "./global.css"` in _layout.tsx without a TS error.
// Metro handles the actual CSS transform; TypeScript just needs to
// know the module exists.
declare module "*.css";
