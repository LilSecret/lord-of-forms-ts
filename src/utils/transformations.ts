import { TSingleInputs } from "../ClassApp/ClassTextInput";
import { TInput } from "../types";

export const capitalize = (word: string) => {
  return (
    word.slice(0, 1).toUpperCase() + word.slice(1, word.length).toLowerCase()
  );
};

export const toUpperCase = (word: string) => {
  return word.toUpperCase();
};

export const formatInputLabel = (word: string) => {
  const words = word.split(" ");
  let label;
  if (words.length > 1) {
    label =
      words[0].toLowerCase() +
      words[1].charAt(0).toUpperCase() +
      words[1].slice(1).toLowerCase();
  } else {
    label = words[0].toLowerCase();
  }
  return label as keyof TSingleInputs;
};

export const formatPhoneNumber = (number: string) => {
  return `${number.slice(0, 2)}-${number.slice(2, 4)}-${number.slice(
    4,
    6
  )}-${number.slice(6, 7)}`;
};
