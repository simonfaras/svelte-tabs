const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  stories: ["../stories/**/*.stories.[tj]s"],
  addons: ["@storybook/preset-typescript"],
  webpackFinal: async (config) => {
    const svelteLoader = config.module.rules.find(({ loader }) =>
      /svelte-loader/.test(loader),
    );

    svelteLoader.options = {
      ...svelteLoader.options,
      preprocess: sveltePreprocess(),
    };

    return config;
  },
};
