export const dateConverter = (time: number) => {
  const newDate = new Date(time * 1000);
  return newDate.toLocaleString();
};

export const isEqualArray = (array1: any[], array2: any[]): boolean => {
  return JSON.stringify(array1) === JSON.stringify(array2);
}
