import { ChangeEventHandler, Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TPhoneInput, TUserInformation, TInput } from "../types";
import { isEmailValid, isValidCity } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import ClassPhoneInput from "./ClassPhoneInput";
import ClassTextInput from "./ClassTextInput";

type TProps = {
  setUserInformation: (userInfo: TUserInformation) => void;
};

type TState = {
  singleInputs: {
    firstNameInput: string;
    lastNameInput: string;
    emailInput: string;
    cityInput: string;
  };
  phoneNumber: TPhoneInput;
  isFormSubmitted: boolean;
};

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<TProps, TState> {
  state: TState = {
    singleInputs: {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
    },
    phoneNumber: ["", "", "", ""],
    isFormSubmitted: false,
  };

  setPhoneInput = (phoneNumber: TPhoneInput) => {
    this.setState({ phoneNumber: phoneNumber });
  };

  render() {
    const { firstNameInput, lastNameInput, emailInput, cityInput } =
      this.state.singleInputs;
    const { isFormSubmitted, phoneNumber } = this.state;

    const firstNameError = firstNameInput.length <= 1 && isFormSubmitted;
    const lastNameError = lastNameInput.length <= 1 && isFormSubmitted;
    const emailError = !isEmailValid(emailInput) && isFormSubmitted;
    const cityError =
      !isValidCity(this.state.singleInputs.cityInput) && isFormSubmitted;
    const phoneNumberError =
      phoneNumber.join("").length != 7 && isFormSubmitted;

    const singleInputHandler =
      (
        input: keyof typeof this.state.singleInputs
      ): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        const updatedObject = { ...this.state.singleInputs };
        updatedObject[input] = e.target.value;
        this.setState({ singleInputs: updatedObject });
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
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneNumber.join(""),
      };
      this.props.setUserInformation(validUserInformation);
    };

    const resetForm = () => {
      this.setState({
        singleInputs: {
          firstNameInput: "",
          lastNameInput: "",
          emailInput: "",
          cityInput: "",
        },
      });
      this.setState({ phoneNumber: ["", "", "", ""] });
      this.setState({ isFormSubmitted: false });
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
          <ClassTextInput
            label="First Name"
            inputProps={{
              onChange: singleInputHandler("firstNameInput"),
              placeholder: "Bilbo",
              value: firstNameInput,
            }}
          />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={firstNameError} />

        {/* last name input */}
        <div className="input-wrap">
          <ClassTextInput
            label="Last Name"
            inputProps={{
              onChange: singleInputHandler("lastNameInput"),
              placeholder: "Baggins",
              value: lastNameInput,
            }}
          />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={lastNameError} />

        {/* Email Input */}
        <div className="input-wrap">
          <ClassTextInput
            label="Email"
            inputProps={{
              onChange: singleInputHandler("emailInput"),
              placeholder: "bilbo@hobbiton-adventures.com",
              value: emailInput,
            }}
          />
        </div>
        <ErrorMessage message={emailErrorMessage} show={emailError} />

        {/* City Input */}
        <div className="input-wrap">
          <ClassTextInput
            label="City"
            inputProps={{
              onChange: singleInputHandler("cityInput"),
              placeholder: "Hobbiton",
              list: "cities",
              value: cityInput,
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
          <ClassPhoneInput
            phoneNumber={this.state.phoneNumber}
            setPhoneInput={this.setPhoneInput}
          />
        </div>
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={phoneNumberError}
        />

        <input
          type="submit"
          value="Submit"
          onClick={() => {
            this.setState({ isFormSubmitted: true });
          }}
        />
      </form>
    );
  }
}
