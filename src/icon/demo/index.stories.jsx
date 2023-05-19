import './index.less'
import BIcon from '../Icon.tsx'
import '../index.less'
// import { showToast } from '../../toast/index.ts'
import { defaultProp } from '../../../stories/utils.js'
import Icons from './config.js'

const allIcons = [...Icons.basic, ...Icons.outline, ...Icons.filled]

export default {
    title: '基础组件/Icon',
    component: BIcon,
    argTypes: {
        name: defaultProp(
            'Props',
            '',
            'string',
            'icon图标库或者图片绝对地址，参考icon.less',
            {
                options: [
                    'https://img.bosszhipin.com/beijin/cms/b3dc9adbac4de3409c775e6cf89181edea38f4f6ba3949bbe44e8ad13cdd1fcf5d41947c239b42fcb8e2d33818747a71.png?x-oss-process=image%2Fresize%2Cw_150',
                    ...allIcons,
                ],
                control: {
                    type: 'select',
                },
            },
        ),
        dot: defaultProp('Props', 'false', 'boolean', '是否展示为小红点', {
            control: {
                type: 'boolean',
            },
        }),
        badge: defaultProp(
            'Props',
            '-',
            'number | string',
            '图标右上角徽标的内容',
        ),
        size: defaultProp(
            'Props',
            'inherit',
            'number | string',
            '图标大小，如 20px 2em，默认单位为 px',
        ),

        tag: defaultProp('Props', 'i', 'string', '根节点对应的 HTML 标签名'),
        color: defaultProp('Props', 'inherit', 'string', '徽标背景颜色', {
            control: { type: 'color' },
        }),
        'badge-props': defaultProp(
            'Props',
            '-',
            'BadgeProps',
            '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
            {
                control: { type: 'object' },
            },
        ),
    },
    parameters: {
        docs: {
            source: {
                // type: 'code',
                // code: `<b-button text="Button" />`
                // language: 'graphql'
            },
            description: {
                component: '按钮描述标题',
            },
        },
    },
}

export const Template = {
    render: (args) => ({
        components: { BIcon },
        setup() {
            return { args }
        },
        template: '<b-icon v-bind="args" />',
    }),
    args: {
        name: 'add-o',
        dot: false,
        badge: '',
        size: '',
        tag: 'i',
        color: 'inherit',
        'badge-props': undefined,
    },
  };

const AllTemplate = () => ({
    components: { BIcon },
    setup() {
        const copyToClipboard = (icon) => {
            const textarea = document.createElement('textarea')
            textarea.value = icon
            document.body.appendChild(textarea)
            // 选中文本框内容
            textarea.select()
            // 将选中内容复制到剪切板
            document.execCommand('Copy')
            document.body.removeChild(textarea)
            // showToast(`复制成功：${icon}`)
        }
        return () => (
            <div class="icon-demo">
                <h3>基础图标</h3>
                <ul>
                    {Icons.basic.map((item) => {
                        return (
                            <li onClick={() => copyToClipboard(item)}>
                                <b-icon name={item} />
                                <span>{item}</span>
                            </li>
                        )
                    })}
                </ul>
                <h3>线框图标</h3>
                <ul>
                    {Icons.outline.map((item) => {
                        return (
                            <li onClick={() => copyToClipboard(item)}>
                                <b-icon name={item} />
                                <span>{item}</span>
                            </li>
                        )
                    })}
                </ul>
                <h3>实底图标</h3>
                <ul>
                    {Icons.filled.map((item) => {
                        return (
                            <li onClick={() => copyToClipboard(item)}>
                                <b-icon name={item} />
                                <span>{item}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    },
})

export const All = AllTemplate.bind({})

All.parameters = {
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
All.storyName = '所有图标'
