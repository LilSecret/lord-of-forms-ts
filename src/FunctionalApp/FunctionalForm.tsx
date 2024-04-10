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

  const firstNameError =
    singleInputs.firstNameInput.length <= 1 && isFormSubmitted;
  const lastNameError =
    singleInputs.lastNameInput.length <= 1 && isFormSubmitted;
  const emailError = !isEmailValid(singleInputs.emailInput) && isFormSubmitted;
  const cityError = !isValidCity(singleInputs.cityInput) && isFormSubmitted;
  const phoneNumberError = phoneNumber.join("").length != 7 && isFormSubmitted;

  const singleInputHandler =
    (input: keyof typeof singleInputs): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const updatedObject = { ...singleInputs };
      updatedObject[input] = e.target.value;
      setSingleInputs(updatedObject);
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
      <div className="input-wrap">
        <FunctionalTextInput
          label="First Name"
          inputProps={{
            onChange: singleInputHandler("firstNameInput"),
            placeholder: "Bilbo",
            value: singleInputs.firstNameInput,
          }}
        />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={firstNameError} />

      {/* last name input */}
      <div className="input-wrap">
        <FunctionalTextInput
          label="Last Name"
          inputProps={{
            onChange: singleInputHandler("lastNameInput"),
            placeholder: "Baggins",
            value: singleInputs.lastNameInput,
          }}
        />
      </div>
      <ErrorMessage message={lastNameErrorMessage} show={lastNameError} />

      {/* Email Input */}
      <div className="input-wrap">
        <FunctionalTextInput
          label="Email"
          inputProps={{
            onChange: singleInputHandler("emailInput"),
            placeholder: "bilbo@hobbiton-adventures.com",
            value: singleInputs.emailInput,
          }}
        />
      </div>
      <ErrorMessage message={emailErrorMessage} show={emailError} />

      {/* City Input */}
      <div className="input-wrap">
        <FunctionalTextInput
          label="City"
          inputProps={{
            onChange: singleInputHandler("cityInput"),
            placeholder: "Hobbiton",
            list: "cities",
            value: singleInputs.cityInput,
          }}
        />
        <datalist id="cities">
          {allCities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </datalist>
      </div>
      <ErrorMessage message={cityErrorMessage} show={cityError} />

      <div className="input-wrap">
        <FunctionalPhoneInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </div>

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
