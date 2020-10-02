interface Shape {
  [key: string]: string;
}

export const styledBy = <T, V extends Shape>(property: keyof T, mapping: V) => (
  props: T,
): string | undefined => {
  if (property in props) {
    const propValue = props[property];
    if (typeof propValue === 'string' && propValue in mapping)
      return mapping[propValue];
  }
  return undefined;
};
