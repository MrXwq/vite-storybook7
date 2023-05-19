import { createNamespace, addUnit, numericProp, makeStringProp } from '../utils'
import { defineComponent, type PropType, type ExtractPropTypes } from 'vue'
import Badge from '../badge'
import type { BadgeProps } from '../badge'

const [name, bem] = createNamespace('icon')

function isImage(name: string | undefined): boolean {
  return name ? name.includes('/') : false
}

export const iconProps = {
  dot: Boolean,
  tag: makeStringProp<keyof HTMLElementTagNameMap>('i'),
  name: String,
  size: numericProp,
  badge: numericProp,
  color: String,
  badgeProps: Object as PropType<Partial<BadgeProps>>
}
export type IconProps = ExtractPropTypes<typeof iconProps>

export default defineComponent({
  name,
  props: iconProps,
  setup(props, { slots }) {
    return () => {
      const { tag, dot, name, size, badge, color } = props
      const isImageIcon = isImage(name)

      return (
        <Badge
          dot={dot}
          tag={tag}
          class={[bem(), `b-icon-${name}`]}
          style={{
            color,
            fontSize: addUnit(size)
          }}
          content={badge}
          {...props.badgeProps}
        >
          {slots.default?.()}
          {isImageIcon && <img class={bem('image')} src={name} />}
        </Badge>
      )
    }
  }
})
