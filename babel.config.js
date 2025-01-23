module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: ['transform-inline-environment-variables'],
      env: {
        production: {
          plugins: ['react-native-paper/babel'],
        },
      },
    };
};