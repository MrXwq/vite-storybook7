const config = {
  stories: [
    '../stories/**/*.stories.mdx',
    // '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../**/demo/*.stories.@(js|jsx|ts|tsx)',
  ],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-mdx-gfm"],
  "framework": {
    name: "@storybook/vue3-vite",
    options: {}
  },
  "features": {
    "storyStoreV7": true
  },
  docs: {
    //👇 See the table below for the list of supported options
    autodocs: true,
    defaultName: 'Documentation',
  },
  // docs: {
  //   autodocs: 'tag'
  // }
  // docs: {
  //   autodocs: true
  // }
};
export default config;