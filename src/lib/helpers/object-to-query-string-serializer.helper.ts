export type SerializableToQueryStringObject = {
  [key: string]:
    | SerializableToQueryStringObject
    | string
    | number
    | null
    | boolean
    | number[]
    | string[];
};

export const objectToQueryStringSerializer = (
  obj: SerializableToQueryStringObject,
  prefix?: string,
) => {
  const str: string[] = [];
  let p = '';

  for (p in obj) {
    if (Object.hasOwn(obj, p)) {
      const value = obj[p];

      if (Array.isArray(value)) {
        const k = prefix ? prefix + '[' + p + '][]' : p + '[]';

        for (let i = 0; i < value.length; i++)
          str.push(encodeURIComponent(k) + '=' + encodeURIComponent(value[i]));
      } else {
        const k = prefix ? prefix + '[' + p + ']' : p;
        const v = value;

        str.push(
          v !== null && typeof v === 'object'
            ? objectToQueryStringSerializer(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v ?? ''),
        );
      }
    }
  }

  return str.join('&');
};
