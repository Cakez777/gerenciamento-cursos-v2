/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    VITE_API_URL?: string;
    // Adicione outras variáveis de ambiente aqui
  };
}