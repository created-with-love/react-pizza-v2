export function isEmpty<Type extends object = {}>(obj: Type) {
  return Object.keys(obj).length === 0;
}