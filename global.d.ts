export type Point = { x: number; y: number }

export type Line = [Point, Point]

export type HTMLInputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

export type ReactiveActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'REPLACE'
export type ElementStateType = InstanceType<typeof Proxy>
export type CreateHTMLElementType = typeof document['createElement']
export type ReactiveElement<T extends string = keyof HTMLElementTagNameMap> = {
  type: T
  key: string
  props: Readonly<Record<string, unknown>>
  state: ElementStateType
  attributes: {
    [key in keyof HTMLElementTagNameMap[T]]: HTMLElementTagNameMap[T][key]
  }
  children: ReactiveElement[]
  instance: HTMLElementTagNameMap[T] | null
  action: ReactiveActionType
  priority: number
  parent: ReactiveElement
  sibling: ReactiveElement
  prev: ReactiveElement
}
