import { ChangeEventHandler, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TUserInformation } from "../types";

type TFormProps = {
  setUserInformation: (userInfo: TUserInformation) => void;
};

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

  const [phoneNumber, setPhoneNumber] = useState<TPhoneInput>(["", "", "", ""]);
  const phoneNumberLengths = [2, 2, 2, 2];

  const onSingleInputHandler =
    (
      property: keyof typeof singleInputs
    ): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const updatedObject = { ...singleInputs };
      updatedObject[property] = e.target.value;
      setSingleInputs(updatedObject);
    };

  const onPhoneInputsHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const newPhoneInput = phoneNumber.map((phoneInput, inputIndex) =>
        inputIndex === index ? e.target.value : phoneInput
      ) as TPhoneInput;
      setPhoneNumber(newPhoneInput);
    };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
        />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={true} />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          onChange={onSingleInputHandler("lastName")}
        />
      </div>
      <ErrorMessage message={lastNameErrorMessage} show={true} />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          onChange={onSingleInputHandler("email")}
        />
      </div>
      <ErrorMessage message={emailErrorMessage} show={true} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input placeholder="Hobbiton" onChange={onSingleInputHandler("city")} />
      </div>
      <ErrorMessage message={cityErrorMessage} show={true} />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" />
          -
          <input type="text" id="phone-input-2" placeholder="55" />
          -
          <input type="text" id="phone-input-3" placeholder="55" />
          -
          <input type="text" id="phone-input-4" placeholder="5" />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={true} />

      <input type="submit" value="Submit" />
    </form>
  );
};
