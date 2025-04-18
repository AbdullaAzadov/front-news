export function propToParam<T>(
  param: T,
  key: keyof T,
  defaultValue?: string
): string {
  return param[key]
    ? `${key.toString()}=${param[key]}&`
    : defaultValue
    ? defaultValue + '&'
    : '';
}
