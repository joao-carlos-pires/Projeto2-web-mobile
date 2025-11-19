
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);


const originalResolveRequest = config.resolver.resolveRequest;


config.resolver.resolveRequest = (context, moduleName, platform) => {
 
  if (moduleName === "ws" || moduleName === "stream") {
    return { type: "empty" };
  }

  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
