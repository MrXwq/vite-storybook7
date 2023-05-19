import {
  createNamespace,
  makeStringProp,
  addUnit,
  type Numeric,
  numericProp,
  truthProp,
  isDef,
  isNumeric,
  type ThemeType
} from '../utils'
import {
  defineComponent,
  computed,
  type CSSProperties,
  type PropType,
  type ExtractPropTypes
} from 'vue'

const [name, bem] = createNamespace('badge')
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export const badgeProps = {
  dot: Boolean,
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
  max: numericProp,
  position: makeStringProp<BadgePosition>('top-right'),
  color: String,
  offset: Array as unknown as PropType<[Numeric, Numeric]>,
  content: numericProp,
  showZero: truthProp,
  themeType: makeStringProp<ThemeType>('')
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>

export default defineComponent({
  name,
  props: badgeProps,
  setup(props, { slots }) {
    const themeTypeString = props.themeType ? `${props.themeType}__` : ''

    const getOffsetWithMinusString = (val: string) =>
      val.startsWith('-') ? val.replace('-', '') : `-${val}`
    const style = computed(() => {
      const style: CSSProperties = {
        background: props.color
      }

      if (props.offset) {
        const [x, y] = props.offset
        const { position } = props
        const offsetY = position.indexOf('top') > -1 ? 'top' : 'bottom'
        const offsetX = position.indexOf('left') > -1 ? 'left' : 'right'
        if (slots.default) {
          if (typeof y === 'number') {
            style[offsetY] = addUnit(offsetY === 'top' ? y : -y)
          } else {
            style[offsetY] = offsetY === 'top' ? addUnit(y) : getOffsetWithMinusString(y)
          }
          if (typeof x === 'number') {
            style[offsetX] = addUnit(offsetX === 'left' ? x : -x)
          } else {
            style[offsetX] = offsetX === 'left' ? addUnit(x) : getOffsetWithMinusString(x)
          }
        } else {
          style.marginTop = addUnit(y)
          style.marginLeft = addUnit(x)
        }
      }

      return style
    })
    const hasContent = () => {
      if (slots.content) {
        return true
      }
      const { content, showZero } = props
      return isDef(content) && content !== '' && (showZero || (content !== 0 && content !== '0'))
    }
    const renderContent = () => {
      const { dot, max, content } = props

      if (!dot) {
        if (slots.content) {
          return slots.content()
        }

        if (isDef(max) && isNumeric(content!) && +content > max) {
          return `${max}+`
        }

        return content
      }
    }
    const renderBadge = () => {
      if (hasContent() || props.dot) {
        return (
          <div
            class={bem(props.themeType, [
              props.position,
              { dot: props.dot, fixed: !!slots.default }
            ])}
            style={style.value}
          >
            {renderContent()}
          </div>
        )
      }
    }
    return () => {
      if (slots.default) {
        const { tag } = props
        return (
          <tag class={bem(`${themeTypeString}wrapper`)}>
            {slots.default()}
            {renderBadge()}
          </tag>
        )
      }

      return renderBadge()
    }
  }
})
