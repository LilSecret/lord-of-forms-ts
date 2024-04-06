import { ChangeEventHandler, Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TPhoneInput, TUserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type TProps = {
  setUserInformation: (userInfo: TUserInformation) => void;
};

export class ClassForm extends Component<TProps> {
  state = {
    phoneNumber: ["", "", "", ""],
  };

  phoneNumberRefs = [
    createRef<HTMLInputElement | null>(),
    createRef<HTMLInputElement | null>(),
    createRef<HTMLInputElement | null>(),
    createRef<HTMLInputElement | null>(),
  ];

  phoneNumberLengths = [2, 2, 2, 1];

  input0 = this.phoneNumberRefs[0];
  input1 = this.phoneNumberRefs[1];
  input2 = this.phoneNumberRefs[2];
  input3 = this.phoneNumberRefs[3];

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

  render() {
    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input placeholder="Bilbo" />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={true} />

        {/* last name input */}
        <div className="input-wrap">
          <label>{"Last Name"}:</label>
          <input placeholder="Baggins" />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={true} />

        {/* Email Input */}
        <div className="input-wrap">
          <label>{"Email"}:</label>
          <input placeholder="bilbo-baggins@adventurehobbits.net" />
        </div>
        <ErrorMessage message={emailErrorMessage} show={true} />

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input placeholder="Hobbiton" />
        </div>
        <ErrorMessage message={cityErrorMessage} show={true} />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              placeholder="55"
              value={this.state.phoneNumber[0]}
              ref={this.input0}
              onChange={this.onPhoneInputsHandler(0)}
              maxLength={this.phoneNumberLengths[0]}
            />
            -
            <input
              type="text"
              id="phone-input-2"
              placeholder="55"
              value={this.state.phoneNumber[1]}
              ref={this.input1}
              onChange={this.onPhoneInputsHandler(1)}
              maxLength={this.phoneNumberLengths[1]}
            />
            -
            <input
              type="text"
              id="phone-input-3"
              placeholder="55"
              value={this.state.phoneNumber[2]}
              ref={this.input2}
              onChange={this.onPhoneInputsHandler(2)}
              maxLength={this.phoneNumberLengths[2]}
            />
            -
            <input
              type="text"
              id="phone-input-4"
              placeholder="5"
              value={this.state.phoneNumber[3]}
              ref={this.input3}
              onChange={this.onPhoneInputsHandler(3)}
              maxLength={this.phoneNumberLengths[3]}
            />
          </div>
        </div>

        <ErrorMessage message={phoneNumberErrorMessage} show={true} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
