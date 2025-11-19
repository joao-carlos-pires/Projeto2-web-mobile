// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Guardamos o resolver padrão do Expo
const originalResolveRequest = config.resolver.resolveRequest;

// Interceptamos apenas os módulos "ws" e "stream"
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Qualquer require("ws") ou require("stream") vira módulo vazio
  if (moduleName === "ws" || moduleName === "stream") {
    return { type: "empty" };
  }

  // Usa o resolver padrão do Expo
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
