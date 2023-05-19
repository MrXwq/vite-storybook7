import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
// import { defaultProp } from '../stories/utils.js'

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//     expanded: true,
//   },
//   docs: {
//     source: {
//       excludeDecorators: true,
//     },
//   },
//   viewport: {
//     viewports: INITIAL_VIEWPORTS,
//     defaultViewport: 'iphone6',
//   },
// }

// export const argTypes = {
//   'theme-type': defaultProp('Props', '', 'string', 'light|dark', {
//     options: ['light', 'dark', ''],
//     control: { type: 'select' },
//   }),
// };

// export const args = {
//   'theme-type': ''
// }

const preview = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // tags: ['autodocs'],
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  // docs: {
  //   source: {
  //     excludeDecorators: true,
  //   },
  // },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
};

export default preview;
