import { withInstall } from '../utils'
import _Button from './Button'

export const Button = withInstall(_Button)
export default Button
export type { ButtonType, ButtonSize, ButtonIconPosition } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    BButton: typeof Button
  }
}
