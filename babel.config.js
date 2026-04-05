// NativeWind v5: do NOT add 'nativewind/babel' here.
// NativeWind v5 uses the PostCSS/Metro transformer pipeline instead.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
