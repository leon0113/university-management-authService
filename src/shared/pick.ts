const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[], // ['page', 'limit', 'sortBy', 'sortOrder']
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
