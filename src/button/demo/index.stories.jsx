/* eslint-disable vue/multi-word-component-names */
import BButton from '../Button.tsx';
import '../index.less'
import './index.less'
import { defaultProp } from '../../../stories/utils.js'
import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: BButton,
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    type: defaultProp('Props', 'default', 'string', '类型样式', {
      options: [
        'default',
        'primary',
        'danger',
        'warning',
        'success',
        'safe',
        'minor',
      ],
      control: {
        type: 'select',
      },
    }),
    text: defaultProp('Props', '-', 'string', '按钮文字'),
    size: defaultProp('Props', 'normal', 'string', '尺寸', {
      options: ['small', 'normal', 'large', 'mini'],
      control: { type: 'select' },
    }),
    color: defaultProp(
      'Props',
      'normal',
      'string',
      '按钮颜色，支持传入 linear-gradient 渐变色',
      {
        control: { type: 'color' },
      },
    ),
    icon: defaultProp(
      'Props',
      '-',
      'string',
      '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
    ),
    'icon-prefix': defaultProp(
      'Props',
      '-',
      'string',
      '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      {
        if: { arg: 'icon' },
      },
    ),
    'icon-position': defaultProp(
      'Props',
      'left',
      'string',
      '图标展示位置，可选值为 right',
      {
        options: ['left', 'right'],
        control: { type: 'select' },
        if: { arg: 'icon' },
      },
    ),
    tag: defaultProp('Props', 'button', 'string', '原生元素节点'),
    disabled: defaultProp('Props', 'false', 'boolean', '不可点击', {
      control: {
        type: 'boolean',
      },
    }),
    outline: defaultProp('Props', 'false', 'boolean', '边框样式', {
      control: {
        type: 'boolean',
      },
    }),
    block: defaultProp('Props', 'false', 'boolean', '块级元素按钮', {
      control: {
        type: 'boolean',
      },
    }),
    round: defaultProp('Props', 'false', 'boolean', '圆角按钮', {
      control: {
        type: 'boolean',
      },
    }),
    square: defaultProp('Props', 'false', 'boolean', '方形按钮', {
      control: {
        type: 'boolean',
      },
    }),
    hairline: defaultProp(
      'Props',
      'false',
      'boolean',
      '是否使用 0.5px 边框',
      {
        control: {
          type: 'boolean',
        },
      },
    ),

    onClick: defaultProp(
      'Events',
      '-',
      '回调参数：event: MouseEvent',
      '点击按钮，且按钮状态不为禁用时触发',
      {
        name: 'click',
        control: { type: '-' },
      },
    ),
    disabledEvent: defaultProp(
      'Events',
      '-',
      '回调参数：event: MouseEvent',
      '点击禁用按钮时触发',
      {
        name: 'disabled',
        control: { type: '-' },
      },
    ),

    default: {
      table: {
        category: 'Slots',
      },
      control: { type: 'text' },
      description: '按钮内容',
    },
    iconSlot: {
      name: 'icon',
      table: {
        category: 'Slots',
      },
      control: { type: 'text' },
      description: '自定义图标',
    },
  },
  parameters: {
    //👇 The viewports object from the Essentials addon
    viewport: {
      //👇 The viewports you want to use
      viewports: INITIAL_VIEWPORTS,

      //👇 Your own default viewport
      defaultViewport: 'iphone6',
    },
  },
  // parameters: {
  //   docs: {
  //     source: { withSetupScript: true },
  //   },
  // }
};

export const Template = {
  render: (args) => ({
    components: { BButton },
    setup() {
      return {
        args,
      };
    },
    template: `
    <b-button v-bind="args">
          <template #default>${args.default}</template>
          <template #icon>${args.iconSlot}</template>
      </b-button>
      `,
  }),
  args: {
    type: 'default',
    text: 'Button',
    size: 'normal',
    color: '',
    icon: '',
    default: '',
    iconSlot: 'image',
    onClick: action('测试'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};

// const Template = (args) => ({
//   components: { BButton },
//   setup() {
//     return { args }
//   },
//   template: `<b-button v-bind="args">
//       <template v-if="args.default" #default>${args.default}</template>
//       <template v-if="args.iconSlot" #icon>${args.iconSlot}</template>
//   </b-button>`,
// })

// export const Primary = Template.bind({})
// Primary.args = {
//   type: 'default',
//   text: 'Button',
//   size: 'normal',
//   color: '',
//   icon: '',
//   'icon-prefix': '',
//   'icon-position': 'left',
//   tag: 'button',
//   disabled: false,
//   outline: false,
//   block: false,
//   round: false,
//   square: false,
//   hairline: false,
//   'theme-type': '',
//   default: '',
//   iconSlot: '',
//   // onClick: action('测试'),
// }

// const ButtonWithHooks = () => {
//   return <b-button type="warning">警告按钮</b-button>;
// };

const TypeTemplate = () => ({
  components: { BButton },
  // setup() {
  //   return { args }
  // },
  // template: ButtonWithHooks()
  // https://github.com/storybookjs/storybook/issues/21662
  setup() {
    return () => <>
      
      <b-button type="primary">主要按钮</b-button>
      <b-button type="success">成功按钮</b-button>
      <b-button type="default">默认按钮</b-button>
      <b-button type="warning">警告按钮</b-button>
      <b-button type="danger">危险按钮</b-button>
      <b-button type="safe">安全按钮</b-button>
    </>
  }
})

export const Type = TypeTemplate.bind({})
// Type.args = {}
Type.parameters = {
  docs: {
    source: {
      type: 'code',
      code: `
            <b-button type="primary">主要按钮</b-button>
<b-button type="success">成功按钮</b-button>
<b-button type="default">默认按钮</b-button>
<b-button type="warning">警告按钮</b-button>
<b-button type="danger">危险按钮</b-button>
<b-button type="safe">安全按钮</b-button>`,
    },
  },
}
Type.storyName = '类型'
