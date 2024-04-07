export type TPhoneInput = [string, string, string, string];

export type TInput = keyof TUserInformation;

export type TUserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};
