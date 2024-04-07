import { allCities } from "./all-cities";
import { capitalize } from "./transformations";

export function isEmailValid(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export function isPhoneNumber(value: string) {
  const regex = /[^0-9\s]/;
  return !regex.test(value);
}

export function isValidCity(value: string) {
  return allCities.includes(capitalize(value));
}
