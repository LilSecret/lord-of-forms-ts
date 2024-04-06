import { ChangeEventHandler, Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TPhoneInput, TUserInformation } from "../types";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

type TErrorCheckInputs =
  | "firstName"
  | "lastName"
  | "email"
  | "city"
  | "phoneNumber";

type TProps = {
  setUserInformation: (userInfo: TUserInformation) => void;
};

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<TProps> {
  state = {
    singleInputs: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
    },
    phoneNumber: ["", "", "", ""],
    isFormSubmitted: false,
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    cityError: false,
    phoneNumberError: false,
  };

  phoneNumberRefs = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  phoneNumberLengths = [2, 2, 2, 1];

  inputRef0 = this.phoneNumberRefs[0];
  inputRef1 = this.phoneNumberRefs[1];
  inputRef2 = this.phoneNumberRefs[2];
  inputRef3 = this.phoneNumberRefs[3];

  updateStateOnSingleInputs = (
    property: keyof typeof this.state.singleInputs,
    value: string
  ) => {
    const updatedObject = { ...this.state.singleInputs };

    updatedObject[property] = value;
    this.setState({ singleInputs: updatedObject });
  };

  onPhoneInputsHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const regex = /[^0-9\s]/;
      const currentInputVal = this.phoneNumberRefs[index];
      const nextInputVal = this.phoneNumberRefs[index + 1];
      const prevInputVal = this.phoneNumberRefs[index - 1];

      const value = e.target.value;
      const newPhoneInput = this.state.phoneNumber.map(
        (phoneInput, inputIndex) => (inputIndex === index ? value : phoneInput)
      ) as TPhoneInput;

      const shouldGoNext =
        currentInputVal.current?.value.length ===
          this.phoneNumberLengths[index] && nextInputVal
          ? true
          : false;

      const shouldGoPrev =
        currentInputVal.current?.value.length === 0 && prevInputVal
          ? true
          : false;

      if (!regex.test(value)) {
        this.setState({ phoneNumber: newPhoneInput });
      }

      if (this.state.isFormSubmitted) {
        this.errorCheckInput("phoneNumber", "null");
      }

      if (shouldGoNext) {
        this.phoneNumberRefs[index + 1].current?.focus();
      }

      if (shouldGoPrev) {
        prevInputVal.current?.focus();
      }
    };

  errorCheckAllInputs = () => {
    const { firstName, lastName, email, city } = this.state.singleInputs;
    const { phoneNumber } = this.state;
    const inputConditions = [
      firstName.length <= 1,
      lastName.length <= 1,
      !isEmailValid(email),
      !allCities.includes(city),
      phoneNumber.join("").length < 7,
    ];

    this.setState({ setIsFormSubmitted: true });
    this.setState({ firstNameError: inputConditions[0] });
    this.setState({ lastNameError: inputConditions[1] });
    this.setState({ emailError: inputConditions[2] });
    this.setState({ cityError: inputConditions[3] });

    if (inputConditions.includes(true)) {
      alert("You have entered a bad form");
      return true;
    }
    return false;
  };

  errorCheckInput = (input: TErrorCheckInputs, value: string) => {
    if (this.state.isFormSubmitted) {
      const { phoneNumber } = this.state;
      if (input === "firstName") {
        this.setState({ firstNameError: value.length <= 1 });
      }
      if (input === "lastName") {
        this.setState({ lastNameError: value.length <= 1 });
      }
      if (input === "email") {
        this.setState({ emailError: !isEmailValid(value) });
      }
      if (input === "city") {
        this.setState({ cityError: !allCities.includes(value) });
      }
      // if (input === "phoneNumber") {
      //   this.setState({phoneNumberError: phoneNumber.join("").length < 7});
      // }
    }
  };

  updateUserInformation = (boolean: boolean) => {
    if (boolean) {
      const validUserInformation = {
        ...this.state.singleInputs,
        phone: this.state.phoneNumber.join(""),
      };
      this.props.setUserInformation(validUserInformation);
    }
  };

  render() {
    const {
      firstNameError,
      lastNameError,
      emailError,
      cityError,
      phoneNumberError,
    } = this.state;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({ isFormSubmitted: true });
          const caughtErrors = this.errorCheckAllInputs();
          this.updateUserInformation(caughtErrors);
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
              this.updateStateOnSingleInputs("firstName", e.target.value);
              this.errorCheckInput("firstName", e.target.value);
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
              this.updateStateOnSingleInputs("lastName", e.target.value);
              this.errorCheckInput("lastName", e.target.value);
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
              this.updateStateOnSingleInputs("email", e.target.value);
              this.errorCheckInput("email", e.target.value);
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
              this.updateStateOnSingleInputs("city", e.target.value);
              this.errorCheckInput("city", e.target.value);
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
              value={this.state.phoneNumber[0]}
              ref={this.inputRef0}
              onChange={this.onPhoneInputsHandler(0)}
              maxLength={this.phoneNumberLengths[0]}
            />
            -
            <input
              type="text"
              id="phone-input-2"
              placeholder="55"
              value={this.state.phoneNumber[1]}
              ref={this.inputRef1}
              onChange={this.onPhoneInputsHandler(1)}
              maxLength={this.phoneNumberLengths[1]}
            />
            -
            <input
              type="text"
              id="phone-input-3"
              placeholder="55"
              value={this.state.phoneNumber[2]}
              ref={this.inputRef2}
              onChange={this.onPhoneInputsHandler(2)}
              maxLength={this.phoneNumberLengths[2]}
            />
            -
            <input
              type="text"
              id="phone-input-4"
              placeholder="5"
              value={this.state.phoneNumber[3]}
              ref={this.inputRef3}
              onChange={this.onPhoneInputsHandler(3)}
              maxLength={this.phoneNumberLengths[3]}
            />
          </div>
        </div>

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={phoneNumberError}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
