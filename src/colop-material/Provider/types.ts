export interface Config {
  primary: string
  error: string
  attention: string
  approval: string
  link: string
  hint: string
  border: string
  disabled: string
  spacer: string
  spacerLight: string
}

export interface BreakPoint {
  Mobile: number
  Tablet: number
  Desktop: number
}

export type ConfigProps = Partial<Config>
