import { createNamespace, makeStringProp, BORDER_SURROUND } from '../utils/index'
import { defineComponent } from 'vue'
import type { CSSProperties, PropType } from 'vue'
// import { Icon } from '../icon/index'

const [name, bem] = createNamespace('button')

// Types
import type { ButtonSize, ButtonType, ButtonIconPosition } from './types'

export type ThemeType = 'light' | 'dark' | ''

export default defineComponent({
  name,
  props: {
    icon: String,
    disabled: Boolean,
    outline: Boolean,
    color: String,
    block: Boolean,
    text: String,
    round: Boolean,
    hairline: Boolean,
    square: Boolean,
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div'
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default'
    },
    themeType: {
      type: String as PropType<ThemeType>,
      default: ''
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'normal'
    },
    iconPosition: makeStringProp<ButtonIconPosition>('left')
  },
  emits: ['click', 'disabled'],
  setup(props, { emit, slots }) {
    const getStyle = () => {
      const { color, outline } = props
      if (color) {
        const style: CSSProperties = {
          color: outline ? color : 'white'
        }

        if (!outline) {
          style.background = color
        }

        if (color.includes('gradient')) {
          style.border = 0
        } else {
          style.borderColor = color
        }

        return style
      }
    }
    const onClick = (event: MouseEvent) => {
      emit('disabled', event)
      if (!props.disabled) {
        emit('click', event)
      }
    }

    const renderIcon = () => {
      if (slots.icon) {
        return <div class={bem('icon')}>{slots.icon()}</div>
      }

      // if (props.icon) {
      //     return <Icon name={props.icon} class={bem('icon')} />
      // }
    }
    const renderText = () => {
      const text = slots.default ? slots.default() : props.text

      if (text) {
        return <span class={bem('text')}>{text}</span>
      }
    }
    return () => {
      const {
        tag,
        type,
        themeType,
        size,
        outline,
        disabled,
        block,
        round,
        iconPosition,
        hairline,
        square
      } = props
      const classes = [
        bem(themeType, [
          type,
          size,
          {
            outline,
            disabled,
            block,
            round,
            hairline,
            square
          }
        ]),
        { [BORDER_SURROUND]: hairline }
      ]
      return (
        <tag class={classes} style={getStyle()} disabled={disabled} onClick={onClick}>
          <div class={bem('content')}>
            {iconPosition === 'left' && renderIcon()}
            {renderText()}
            {iconPosition === 'right' && renderIcon()}
          </div>
        </tag>
      )
    }
  }
})
