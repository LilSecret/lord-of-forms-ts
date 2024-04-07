export const capitalize = (word: string) => {
  return (
    word.slice(0, 1).toUpperCase() + word.slice(1, word.length).toLowerCase()
  );
};

export const toUpperCase = (word: string) => {
  return word.toUpperCase();
};

export const formatPhoneNumber = (number: string) => {
  return `${number.slice(0, 2)}-${number.slice(2, 4)}-${number.slice(
    4,
    6
  )}-${number.slice(6, 7)}`;
};
