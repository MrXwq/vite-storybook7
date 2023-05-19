import './index.less'
import BButton from '..'
import '../index.less'
import { action } from '@storybook/addon-actions'
import { defaultProp } from '../../../stories/utils'

export default {
    title: '基础组件/Button',
    component: BButton,
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
        selected: defaultProp(
            'Props',
            'false',
            'boolean',
            '是否选中状态，和点击状态一致',
            {
                control: {
                    type: 'boolean',
                },
            },
        ),

        click: defaultProp(
            'Events',
            '-',
            '回调参数：event: MouseEvent',
            '点击按钮，且按钮状态不为禁用时触发',
            {
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
}

export const Template = {
    render: (args) => ({
        components: { BButton },
    setup() {
        return { args }
    },
    template: `<b-button v-bind="args">
        <template v-if="args.default" #default>${args.default}</template>
        <template v-if="args.iconSlot" #icon>${args.iconSlot}</template>
    </b-button>`,
    }),
    args: {
        type: 'default',
    text: 'Button',
    size: 'normal',
    color: '',
    icon: '',
    'icon-prefix': '',
    'icon-position': 'left',
    tag: 'button',
    disabled: false,
    outline: false,
    block: false,
    round: false,
    square: false,
    hairline: false,
    selected: false,
    default: '',
    iconSlot: '',
    onClick: action('点击'),
    },
  };

const TypeTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>按钮类型</h3>
                <p>
                    按钮支持
                    default、primary、success、warning、danger、safe、minor七种类型，默认为
                    default。
                </p>
                <div class="demo-button">
                    <div class="demo-button-row">
                        <b-button type="primary">主要按钮</b-button>
                        <b-button type="success">成功按钮</b-button>
                        <b-button type="default">默认按钮</b-button>
                    </div>
                    <div class="demo-button-row">
                        <b-button type="warning">警告按钮</b-button>
                        <b-button type="danger">危险按钮</b-button>
                        <b-button type="safe">安全按钮</b-button>
                    </div>
                    <b-button type="minor">次要按钮</b-button>
                </div>
            </>
        )
    },
})

export const Type = TypeTemplate.bind({})
Type.args = {}
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
<b-button type="safe">安全按钮</b-button>
<b-button type="minor">次要按钮</b-button>
`,
        },
    },
}

const OutlineTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>边框按钮</h3>
                <p>
                    通过 outline
                    属性将按钮设置为边框按钮，边框按钮的文字为按钮颜色，背景为白色。
                </p>
                <div class="demo-button">
                    <b-button outline type="primary">
                        边框按钮
                    </b-button>
                    <b-button outline type="success">
                        边框按钮
                    </b-button>
                </div>
            </>
        )
    },
})

export const Outline = OutlineTemplate.bind({})
Outline.args = {}
Outline.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
            <b-button outline type="primary">边框按钮</b-button>
<b-button outline type="success">边框按钮</b-button>`,
        },
    },
}

const HairlineTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>细边框</h3>
                <p>设置 hairline 属性可以展示 0.5px 的细边框。</p>
                <div class="demo-button">
                    <b-button outline hairline type="primary">
                        细边框按钮
                    </b-button>
                    <b-button outline hairline type="success">
                        细边框按钮
                    </b-button>
                </div>
            </>
        )
    },
})

export const Hairline = HairlineTemplate.bind({})
Hairline.args = {}
Hairline.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
            <b-button outline hairline type="primary">细边框按钮</b-button>
<b-button outline hairline type="success">细边框按钮</b-button>`,
        },
    },
}
const DisableTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>禁用状态</h3>
                <p>通过 disabled 属性来禁用按钮，禁用状态下按钮不可点击。</p>
                <div class="demo-button">
                    <b-button disabled type="primary">
                        禁用状态
                    </b-button>
                    <b-button disabled type="success">
                        禁用状态
                    </b-button>
                </div>
            </>
        )
    },
})

export const Disable = DisableTemplate.bind({})
Disable.args = {}
Disable.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
            <b-button disabled type="primary">禁用状态</b-button>
<b-button disabled type="success">禁用状态</b-button>`,
        },
    },
}

const SquareTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>按钮形状</h3>
                <p>通过 square 设置方形按钮，通过 round 设置圆形按钮。</p>
                <div class="demo-button">
                    <b-button square type="primary">
                        方形按钮
                    </b-button>
                    <b-button round type="success">
                        圆形按钮
                    </b-button>
                </div>
            </>
        )
    },
})

export const Square = SquareTemplate.bind({})
Square.args = {}
Square.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
            <b-button square type="primary">方形按钮</b-button>
<b-button round type="success">圆形按钮</b-button>`,
        },
    },
}

const IconTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>图标按钮</h3>
                <p>
                    通过 icon 属性设置按钮图标，支持 Icon
                    组件里的所有图标，也可以传入图标 URL。
                </p>
                <div class="demo-button">
                    <b-button icon="increase" type="primary" />
                    <b-button icon="increase" type="primary">
                        按钮
                    </b-button>
                    <b-button
                        type="primary"
                    >
                        按钮
                    </b-button>
                </div>
            </>
        )
    },
})

export const Icon = IconTemplate.bind({})
Icon.args = {}
Icon.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
            <b-button icon="increase" type="primary" />
<b-button icon="increase" type="primary">按钮</b-button>
<b-button
    type="primary"
>
    按钮
</b-button>`,
        },
    },
}

const SizeTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>按钮尺寸</h3>
                <p>支持 large、normal、small、mini 四种尺寸，默认为 normal。</p>
                <div class="demo-button">
                    <b-button type="primary" size="large">
                        大号按钮
                    </b-button>
                    <b-button type="primary" size="normal">
                        普通按钮
                    </b-button>
                    <b-button type="primary" size="small">
                        小型按钮
                    </b-button>
                    <b-button type="primary" size="mini">
                        迷你按钮
                    </b-button>
                </div>
            </>
        )
    },
})

export const Size = SizeTemplate.bind({})
Size.args = {}
Size.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
            <b-button type="primary" size="large">大号按钮</b-button>
<b-button type="primary" size="normal">普通按钮</b-button>
<b-button type="primary" size="small">小型按钮</b-button>
<b-button type="primary" size="mini">迷你按钮</b-button>`,
        },
    },
}

const ColorTemplate = () => ({
    components: { BButton },
    setup() {
        return () => (
            <>
                <h3>自定义颜色</h3>
                <p>通过 color 属性可以自定义按钮的颜色。</p>
                <div class="demo-button">
                    <b-button color="#943522">单色按钮</b-button>
                    <b-button color="#943522" outline>
                        单色按钮
                    </b-button>
                    <b-button color="linear-gradient(to right, #777777, #ff5555)">
                        渐变色按钮
                    </b-button>
                </div>
            </>
        )
    },
})

export const Color = ColorTemplate.bind({})
Color.args = {}
Color.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
            <b-button color="#943522">单色按钮</b-button>
<b-button color="#943522" outline>单色按钮</b-button>
<b-button color="linear-gradient(to right, #777777, #ff5555)">
    渐变色按钮
</b-button>`,
        },
    },
}
