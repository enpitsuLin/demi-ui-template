import { PropType } from 'vue'

export const buttonTypes = [
  'default',
  'primary',
  'info',
  'success',
  'error',
  '',
] as const

export type ButtonType = (typeof buttonTypes)[number]

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
}
