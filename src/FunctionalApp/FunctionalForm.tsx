import { ChangeEventHandler, useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TInput, TPhoneInput, TUserInformation } from "../types";
import { isEmailValid, isPhoneNumber, isValidCity } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

type TFormProps = {
  setUserInformation: (userInfo: TUserInformation) => void;
};

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

  const errorCheckAllInputs = () => {
    const { firstName, lastName, email, city } = singleInputs;
    const inputConditions = [
      firstName.length <= 1,
      lastName.length <= 1,
      !isEmailValid(email),
      !isValidCity(city),
      phoneNumber.join("").length < 7,
    ];

    setIsFormSubmitted(true);
    setFirstNameError(inputConditions[0]);
    setLastNameError(inputConditions[1]);
    setEmailError(inputConditions[2]);
    setCityError(inputConditions[3]);
    setPhoneNumberError(inputConditions[4]);

    if (inputConditions.includes(true)) {
      alert("You have entered a bad form");
      return false;
    }
    return true;
  };

  const errorCheckInput = (input: TInput, value: string) => {
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
        setCityError(!isValidCity(value));
      }
      if (input === "phone") {
        let phoneNumberLength = 0;
        phoneNumberRefs.forEach((inputRef) => {
          phoneNumberLength += Number(inputRef.current?.value.length);
        });
        setPhoneNumberError(phoneNumberLength < 7);
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

  const updateUserInformation = () => {
    const validUserInformation = {
      ...singleInputs,
      phone: phoneNumber.join(""),
    };
    setUserInformation(validUserInformation);
  };

  const resetForm = () => {
    setSingleInputs({ firstName: "", lastName: "", email: "", city: "" });
    setPhoneNumber(["", "", "", ""]);
    setIsFormSubmitted(false);
  };

  const onPhoneInputsHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const phoneNumberLengths = [2, 2, 2, 1];

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

      if (isPhoneNumber(value)) {
        setPhoneNumber(newPhoneInput);
      }

      if (isFormSubmitted) {
        errorCheckInput("phone", "null");
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
        <label>{"First Name"}:</label>
        <input
          placeholder="Bilbo"
          onChange={(e) => {
            updateStateOnSingleInputs("firstName", e.target.value);
            errorCheckInput("firstName", e.target.value);
          }}
          value={singleInputs.firstName}
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
          value={singleInputs.lastName}
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
          value={singleInputs.email}
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
          value={singleInputs.city}
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
          phoneNumberRefs={phoneNumberRefs}
          onPhoneInputsHandler={onPhoneInputsHandler}
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
