import { TValidateFunction } from './type-validation'

export type ObjectValidator<T extends object> = {
  [key in keyof T]?: TValidateFunction
}

export const validate = async <T extends object>(
  entity: T,
  validateObject: ObjectValidator<T>,
  query?: any
) => {
  let error = {} as Record<keyof T, string>
  Object.keys(entity).forEach((key) => {
    error = { ...error, [key]: '' }
  })
  const validateKeys = Object.keys(validateObject)
  const errorArray = await Promise.all(
    validateKeys.map(async (key) => {
      const vFunc = validateObject[key as keyof typeof validateObject] as TValidateFunction
      const result = await vFunc(
        error as Record<keyof T, string>,
        entity[key as keyof T],
        key as keyof T,
        query
      )
      return {
        [`${key}`]: result[key as keyof typeof result],
      }
    })
  )
  errorArray.forEach((item) => {
    error = { ...error, ...item }
  })
  const isError: boolean =
    Object.keys(error).filter((keyError) => error[keyError as keyof typeof error])?.length > 0
  return {
    error: error as Record<keyof T, string>,
    isError,
  }
}

export * from './IS_EMAIL'
export * from './IS_NUMBER'
export * from './IS_PASSWORD'
export * from './IS_PHONE'
export * from './IS_REQUIRED'
export * from './IS_USERNAME'
