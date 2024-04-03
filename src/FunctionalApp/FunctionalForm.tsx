import { ChangeEventHandler, useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TUserInformation } from "../types";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

type TFormProps = {
  setUserInformation: (userInfo: TUserInformation) => void;
};

type TErrorCheckInputs =
  | "all"
  | "firstName"
  | "lastName"
  | "email"
  | "city"
  | "phoneNumber";

type TSingleInputs = "firstName" | "lastName" | "email" | "city";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type TPhoneInput = [string, string, string, string];

export const FunctionalForm = ({ setUserInformation }: TFormProps) => {
  const [singleInputs, setSingleInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });

  const singleInputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const phoneNumberRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const [refFirstName, refLastName, refEmail, refCity, refPhoneNumber] =
    singleInputRefs;
  const [input0, input1, input2, input3] = phoneNumberRefs;

  const [phoneNumber, setPhoneNumber] = useState<TPhoneInput>(["", "", "", ""]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const errors = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ];

  const [
    [firstNameError, setFirstNameError],
    [lastNameError, setLastNameError],
    [emailError, setEmailError],
    [cityError, setCityError],
    [phoneNumberError, setPhoneNumberError],
  ] = errors;

  const phoneNumberLengths = [2, 2, 2, 1];

  const errorCheckInput = (input: TErrorCheckInputs) => {
    if (isFormSubmitted) {
      if (input === "firstName" || input === "all") {
        setFirstNameError(
          (refFirstName.current?.value.length as number) <= 1 ? true : false
        );
      }
      if (input === "lastName" || input === "all") {
        setLastNameError(
          (refLastName.current?.value.length as number) <= 1 ? true : false
        );
      }
      if (input === "email" || input === "all") {
        const emailValue = refEmail.current?.value as string;
        setEmailError(!isEmailValid(emailValue));
      }
      if (input === "city" || input === "all") {
        setCityError(
          !allCities.includes(refCity.current?.value as string) ? true : false
        );
      }
    }
  };

  const onSingleInputHandler =
    (
      property: keyof typeof singleInputs
    ): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const updatedObject = { ...singleInputs };

      if (isFormSubmitted) {
        errorCheckInput(property);
      }

      updatedObject[property] = e.target.value;
      setSingleInputs(updatedObject);
    };

  const onPhoneInputsHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const currentInputVal = phoneNumberRefs[index];
      const nextInputVal = phoneNumberRefs[index + 1];
      const prevInputVal = phoneNumberRefs[index - 1];
      const value = e.target.value;
      const newPhoneInput = phoneNumber.map((phoneInput, inputIndex) =>
        inputIndex === index ? value : phoneInput
      ) as TPhoneInput;

      const shouldGoNext =
        (currentInputVal.current?.value.length as number) ===
          phoneNumberLengths[index] && nextInputVal
          ? true
          : false;

      const shouldGoPrev =
        currentInputVal.current?.value.length === 0 && prevInputVal
          ? true
          : false;

      if (!isNaN(value)) {
        setPhoneNumber(newPhoneInput);
      }

      if (shouldGoNext) {
        phoneNumberRefs[index + 1].current?.focus();
      }

      if (shouldGoPrev) {
        prevInputVal.current?.focus();
      }
    };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        errorCheckInput("all");
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          placeholder="Bilbo"
          onChange={onSingleInputHandler("firstName")}
          ref={refFirstName}
        />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={firstNameError} />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          onChange={onSingleInputHandler("lastName")}
          ref={refLastName}
        />
      </div>
      <ErrorMessage message={lastNameErrorMessage} show={lastNameError} />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          onChange={onSingleInputHandler("email")}
          ref={refEmail}
        />
      </div>
      <ErrorMessage message={emailErrorMessage} show={emailError} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          placeholder="Hobbiton"
          list="cities"
          onChange={onSingleInputHandler("city")}
          ref={refCity}
        />
        <datalist id="cities">
          {allCities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </datalist>
      </div>
      <ErrorMessage message={cityErrorMessage} show={cityError} />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={phoneNumber[0]}
            ref={input0}
            onChange={onPhoneInputsHandler(0)}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={phoneNumber[1]}
            ref={input1}
            onChange={onPhoneInputsHandler(1)}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={phoneNumber[2]}
            ref={input2}
            onChange={onPhoneInputsHandler(2)}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={phoneNumber[3]}
            ref={input3}
            onChange={onPhoneInputsHandler(3)}
          />
        </div>
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
