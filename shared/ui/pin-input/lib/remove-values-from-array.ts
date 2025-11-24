export const removeValuesFromArray = (
  valuesArray: Array<string>,
  value: string,
) => {
  return valuesArray.filter((entry) => entry !== value);
};
