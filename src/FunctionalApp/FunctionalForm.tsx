import { ChangeEventHandler, useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TPhoneInput, TUserInformation } from "../types";
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

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ setUserInformation }: TFormProps) => {
  const [singleInputs, setSingleInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });

  const phoneNumberRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const [input0, input1, input2, input3] = phoneNumberRefs;

  const [phoneNumber, setPhoneNumber] = useState<TPhoneInput>(["", "", "", ""]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [
    [firstNameError, setFirstNameError],
    [lastNameError, setLastNameError],
    [emailError, setEmailError],
    [cityError, setCityError],
    [phoneNumberError, setPhoneNumberError],
  ] = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ];

  const phoneNumberLengths = [2, 2, 2, 1];

  const errorCheckAllInputs = () => {
    const { firstName, lastName, email, city } = singleInputs;
    const inputConditions = [
      firstName.length <= 1,
      lastName.length <= 1,
      !isEmailValid(email),
      !allCities.includes(city),
      phoneNumber.join("").length < 7,
    ];

    setIsFormSubmitted(true);
    setFirstNameError(inputConditions[0]);
    setLastNameError(inputConditions[1]);
    setEmailError(inputConditions[2]);
    setCityError(inputConditions[3]);
    setPhoneNumberError(inputConditions[4]);

    return !inputConditions.includes(true);
  };

  const errorCheckInput = (input: TErrorCheckInputs, value: string) => {
    if (isFormSubmitted) {
      if (input === "firstName") {
        setFirstNameError(value.length <= 1);
      }
      if (input === "lastName") {
        setLastNameError(value.length <= 1);
      }
      if (input === "email") {
        setEmailError(!isEmailValid(value));
      }
      if (input === "city") {
        setCityError(!allCities.includes(value));
      }
      if (input === "phoneNumber") {
        setPhoneNumberError(phoneNumber.join("").length < 7);
      }
    }
  };

  const updateStateOnSingleInputs = (
    property: keyof typeof singleInputs,
    value: string
  ) => {
    const updatedObject = { ...singleInputs };

    updatedObject[property] = value;
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
        currentInputVal.current?.value.length === phoneNumberLengths[index] &&
        nextInputVal
          ? true
          : false;

      const shouldGoPrev =
        currentInputVal.current?.value.length === 0 && prevInputVal
          ? true
          : false;

      if (
        !isNaN(parseFloat(value)) &&
        value.length <= phoneNumberLengths[index]
      ) {
        setPhoneNumber(newPhoneInput);
      }

      if (isFormSubmitted) {
        errorCheckInput("phoneNumber", "null");
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
        if (errorCheckAllInputs()) {
          const validUserInformation = {
            ...singleInputs,
            phone: phoneNumber.join(""),
          };
          setUserInformation(validUserInformation);
        }
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
          onChange={(e) => {
            updateStateOnSingleInputs("firstName", e.target.value);
            errorCheckInput("firstName", e.target.value);
          }}
        />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={firstNameError} />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          onChange={(e) => {
            updateStateOnSingleInputs("lastName", e.target.value);
            errorCheckInput("lastName", e.target.value);
          }}
        />
      </div>
      <ErrorMessage message={lastNameErrorMessage} show={lastNameError} />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          onChange={(e) => {
            updateStateOnSingleInputs("email", e.target.value);
            errorCheckInput("email", e.target.value);
          }}
        />
      </div>
      <ErrorMessage message={emailErrorMessage} show={emailError} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          placeholder="Hobbiton"
          list="cities"
          onChange={(e) => {
            updateStateOnSingleInputs("city", e.target.value);
            errorCheckInput("city", e.target.value);
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
