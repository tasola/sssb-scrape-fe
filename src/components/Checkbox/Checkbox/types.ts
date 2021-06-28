export type Props = {
  checked: boolean
  onChange: (e: object) => void
  id: string
  value: string
  color: 'primary' | 'secondary' | 'default' | undefined
}
