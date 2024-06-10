import { ChangeEventHandler, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TPhoneInput, TUserInformation } from "../types";
import { isEmailValid, isValidCity } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { FunctionalTextInput } from "./FunctionalTextInput";

type TFormProps = {
  setUserInformation: (userInfo: TUserInformation) => void;
};

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Phone Number is Invalid";

export const FunctionalForm = ({ setUserInformation }: TFormProps) => {
  const [singleInputs, setSingleInputs] = useState({
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
  });

  const [phoneNumber, setPhoneNumber] = useState<TPhoneInput>(["", "", "", ""]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const isPhoneNumberValid = () => {
    return phoneNumber.join("").length != 7 && isFormSubmitted;
  };

  const firstNameError =
    singleInputs.firstNameInput.length <= 1 && isFormSubmitted;
  const lastNameError =
    singleInputs.lastNameInput.length <= 1 && isFormSubmitted;
  const emailError = !isEmailValid(singleInputs.emailInput) && isFormSubmitted;
  const cityError = !isValidCity(singleInputs.cityInput) && isFormSubmitted;
  const phoneNumberError = isPhoneNumberValid();

  const singleInputHandler =
    (input: keyof typeof singleInputs): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setSingleInputs({ ...singleInputs, [input]: e.target.value });
    };

  const caughtError = () => {
    const error =
      firstNameError &&
      lastNameError &&
      emailError &&
      cityError &&
      phoneNumberError;

    if (error) {
      alert("bad data input");
    }

    return error;
  };

  const updateUserInformation = () => {
    const validUserInformation = {
      firstName: singleInputs.firstNameInput,
      lastName: singleInputs.lastNameInput,
      email: singleInputs.emailInput,
      city: singleInputs.cityInput,
      phone: phoneNumber.join(""),
    };
    setUserInformation(validUserInformation);
  };

  const resetForm = () => {
    setSingleInputs({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
    });
    setPhoneNumber(["", "", "", ""]);
    setIsFormSubmitted(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!caughtError()) {
          updateUserInformation();
          resetForm();
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        label="First Name"
        inputProps={{
          onChange: singleInputHandler("firstNameInput"),
          placeholder: "Bilbo",
          value: singleInputs.firstNameInput,
        }}
      />
      <ErrorMessage message={firstNameErrorMessage} show={firstNameError} />

      {/* last name input */}
      <FunctionalTextInput
        label="Last Name"
        inputProps={{
          onChange: singleInputHandler("lastNameInput"),
          placeholder: "Baggins",
          value: singleInputs.lastNameInput,
        }}
      />
      <ErrorMessage message={lastNameErrorMessage} show={lastNameError} />

      {/* Email Input */}
      <FunctionalTextInput
        label="Email"
        inputProps={{
          onChange: singleInputHandler("emailInput"),
          placeholder: "bilbo@hobbiton-adventures.com",
          value: singleInputs.emailInput,
        }}
      />
      <ErrorMessage message={emailErrorMessage} show={emailError} />

      {/* City Input */}
      <FunctionalTextInput
        label="City"
        inputProps={{
          onChange: singleInputHandler("cityInput"),
          placeholder: "Hobbiton",
          list: "cities",
          value: singleInputs.cityInput,
        }}
      />
      <ErrorMessage message={cityErrorMessage} show={cityError} />

      <FunctionalPhoneInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />

      <ErrorMessage message={phoneNumberErrorMessage} show={phoneNumberError} />

      <input
        type="submit"
        value="Submit"
        onClick={() => {
          setIsFormSubmitted(true);
        }}
      />
    </form>
  );
};
