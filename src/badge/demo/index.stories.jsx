import BBadge from '..'
import '../index.less'
import './index.less'
import { defaultProp } from '../../../stories/utils.js'
import BIcon from '../../icon'

export default {
    title: '基础组件/Badge',
    component: BBadge,
    argTypes: {
        dot: defaultProp('Props', 'false', 'boolean', '是否展示为小红点', {
            control: {
                type: 'boolean',
            },
        }),
        tag: defaultProp(
            'Props',
            'div',
            'string',
            '有默认内容时，根节点对应的 HTML 标签名',
        ),
        max: defaultProp(
            'Props',
            'false',
            'number',
            '有默认内容时，根节点对应的 HTML 标签名',
            {
                control: {
                    type: 'number',
                },
            },
        ),
        position: defaultProp(
            'Props',
            'top-right',
            'string',
            '徽标位置，可选值为 top-left bottom-left bottom-right',
            {
                options: [
                    'top-right',
                    'top-left',
                    'bottom-left',
                    'bottom-right',
                ],
                control: {
                    type: 'select',
                },
            },
        ),
        color: defaultProp('Props', '#FF4753', 'string', '徽标背景颜色', {
            control: { type: 'color' },
        }),
        offset: defaultProp(
            'Props',
            '-',
            '[number | string, number | string]',
            '设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为 px',
            {
                control: { type: 'object' },
            },
        ),
        content: defaultProp('Props', '-', 'number | string', '徽标内容'),
        'show-zero': defaultProp(
            'Props',
            'true',
            'boolean',
            "当 content 为数字 0 或字符串 '0' 时，是否展示徽标",
            {
                control: {
                    type: 'boolean',
                },
            },
        ),
        default: defaultProp('Slots', '-', '-', '徽标包裹的子元素'),
        contentSlot: defaultProp('Slots', '-', '-', '自定义徽标内容', {
            name: 'content',
        }),
    },
    parameters: {
        docs: {
            source: {
                type: 'code',
                code: '<b-badge content="20">徽标</b-badge>',
            },
            description: {
                component: '在右上角展示徽标数字或小红点。',
            },
        },
    },
}

export const Template = {
    render: (args) => ({
        components: { BBadge },
        setup() {
            return { args }
        },
        template: `
            <b-badge v-bind="args">
                <template v-if="args.default" #default>${args.default}</template>
                <template v-if="args.contentSlot" #content>${args.contentSlot}</template>
            </b-badge>
        `
    }),
    args: {
        dot: false,
        tag: 'div',
        max: undefined,
        position: 'top-right',
        color: '#FF4753',
        offset: undefined,
        content: '20',
        'show-zero': true,

        default: '徽标',
        contentSlot: '',
    },
  };

const BasicTemplate = () => ({
    components: { BBadge },
    setup() {
        return () => (
            <div class="demo-badge">
                <b-badge content="3">
                    <div class="content" />
                </b-badge>
                <b-badge content="15">
                    <div class="content" />
                </b-badge>
                <b-badge content="Hot">
                    <div class="content" />
                </b-badge>
                <b-badge dot>
                    <div class="content" />
                </b-badge>
            </div>
        )
    },
})

export const Basic = BasicTemplate.bind({})

Basic.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
    <b-badge content="3">
        <div class="content"/>
    </b-badge>
    <b-badge content="15">
        <div class="content"/>
    </b-badge>
    <b-badge content="Hot">
        <div class="content"/>
    </b-badge>
    <b-badge dot>
        <div class="content"/>
    </b-badge>
            `,
        },
        description: {
            story: '设置 content 属性后，Badge会在子元素的右上角显示对应的徽标，也可以通过 dot 来显示小红点。',
        },
    },
}
Basic.storyName = '基础用法'
const MaxTemplate = () => ({
    components: { BBadge },
    setup() {
        return () => (
            <div class="demo-badge">
                <b-badge content="100" max="5">
                    <div class="content" />
                </b-badge>
                <b-badge content="100" max="55">
                    <div class="content" />
                </b-badge>
                <b-badge content="100" max="99">
                    <div class="content" />
                </b-badge>
            </div>
        )
    },
})

export const Max = MaxTemplate.bind({})

Max.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
<b-badge content="100" max="5">
    <div class="content" />
</b-badge>
<b-badge content="100" max="55">
    <div class="content" />
</b-badge>
<b-badge content="100" max="99">
    <div class="content" />
</b-badge>
            `,
        },
        description: {
            story: '设置 max 属性后，当 content 的数值超过最大值时，会自动显示为max+。',
        },
    },
}
Max.storyName = '最大值'

const ColorTemplate = () => ({
    components: { BBadge },
    setup() {
        return () => (
            <div class="demo-badge">
                <b-badge content="5" color="#15B3B3">
                    <div class="content" />
                </b-badge>
                <b-badge content="55" color="#15B3B3">
                    <div class="content" />
                </b-badge>
                <b-badge dot color="#15B3B3">
                    <div class="content" />
                </b-badge>
            </div>
        )
    },
})

export const Color = ColorTemplate.bind({})

Color.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
<b-badge content="5" color="#15B3B3">
    <div class="content" />
</b-badge>
<b-badge content="55" color="#15B3B3">
    <div class="content" />
</b-badge>
<b-badge dot color="#15B3B3">
    <div class="content" />
</b-badge>
            `,
        },
        description: {
            story: '通过 color 属性来设置徽标的颜色。',
        },
    },
}
Color.storyName = '自定义颜色'

const CustomTemplate = () => ({
    components: { BBadge, BIcon },
    setup() {
        return () => (
            <div class="demo-badge">
                <b-badge
                    v-slots={{
                        content: () => <b-icon name="download" size="12" />,
                    }}
                >
                    <div class="content" />
                </b-badge>
                <b-badge
                    v-slots={{
                        content: () => <b-icon name="cross" size="12" />,
                    }}
                >
                    <div class="content" />
                </b-badge>
                <b-badge
                    v-slots={{
                        content: () => <b-icon name="collect-o" size="12" />,
                    }}
                >
                    <div class="content" />
                </b-badge>
            </div>
        )
    },
})

export const Custom = CustomTemplate.bind({})

Custom.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
<b-badge>
    <div class="content" />
    <template #content>
        <b-icon name="download" size="12" />
    </template>
</b-badge>
<b-badge>
    <div class="content" />
    <template #content>
        <b-icon name="cross" size="12" />
    </template>
</b-badge>
<b-badge>
    <div class="content" />
    <template #content>
        <b-icon name="collect-o" size="12" />
    </template>
</b-badge>
            `,
        },
        description: {
            story: '通过 content 插槽可以自定义徽标的内容，比如插入一个图标。',
        },
    },
}
Custom.storyName = '自定义徽标内容'

const PositionTemplate = () => ({
    components: { BBadge },
    setup() {
        return () => (
            <div class="demo-badge">
                <b-badge content="5" position="top-left">
                    <div class="content" />
                </b-badge>
                <b-badge content="55" position="bottom-left">
                    <div class="content" />
                </b-badge>
                <b-badge dot position="bottom-right">
                    <div class="content" />
                </b-badge>
            </div>
        )
    },
})

export const Position = PositionTemplate.bind({})

Position.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
<b-badge content="5" position="top-left">
    <div class="content" />
</b-badge>
<b-badge content="55" position="bottom-left">
    <div class="content" />
</b-badge>
<b-badge dot position="bottom-right">
    <div class="content" />
</b-badge>
            `,
        },
        description: {
            story: '通过 position 属性来设置徽标的位置。',
        },
    },
}
Position.storyName = '自定义徽标位置'

const OnlyTemplate = () => ({
    components: { BBadge },
    setup() {
        return () => (
            <div class="demo-badge">
                <b-badge content="5" />
                <b-badge content="55" max="50" />
            </div>
        )
    },
})

export const Only = OnlyTemplate.bind({})

Only.parameters = {
    docs: {
        source: {
            type: 'code',
            code: `
<b-badge content="5"/>
<b-badge content="55" max="50"/>
            `,
        },
        description: {
            story: '当 Badge 没有子元素时，会作为一个独立的元素进行展示。',
        },
    },
}
Only.storyName = '独立展示'
