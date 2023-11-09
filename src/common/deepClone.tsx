const isObject = (yourVariable: any) => {
  return typeof yourVariable === 'object' && !Array.isArray(yourVariable)
}

export const deepClone = <T, E>(source: T, target: E): T => {
  if (!isObject(source) || !isObject(target)) return source
  const sourceValue = source as object
  const targetValue = target as object
  const sourceKeys = Object.keys(sourceValue)
  const targetKeys = Object.keys(targetValue)
  let output = {}
  sourceKeys.forEach((skey) => {
    const currentValue = sourceValue[skey as keyof typeof sourceValue]
    if (targetKeys.includes(skey)) {
      const currentTargetValue = targetValue[skey as keyof typeof targetValue]
      if (isObject(currentValue)) {
        output = {
          ...output,
          [skey]: deepClone<typeof currentValue, typeof currentTargetValue>(
            currentValue,
            currentTargetValue
          ),
        }
      } else {
        output = { ...output, [skey]: currentTargetValue }
      }
    } else {
      output = { ...output, [skey]: currentValue }
    }
  })
  return output as T
}
