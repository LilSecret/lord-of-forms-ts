import { ChangeEventHandler, Component, createRef } from "react";
import { TPhoneInput } from "../types";
import { isPhoneNumber } from "../utils/validations";

type TPhoneInputProps = {
  phoneNumber: TPhoneInput;
  setPhoneInput: (phoneNumber: TPhoneInput) => void;
};

export default class ClassPhoneInput extends Component<TPhoneInputProps> {
  phoneNumberRefs = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  render() {
    const phoneNumberLengths = [2, 2, 2, 1];
    const [input0, input1, input2, input3] = this.phoneNumberRefs;
    const { phoneNumber, setPhoneInput } = this.props;

    const onPhoneInputsHandler =
      (index: number): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        const phoneNumberLengths = [2, 2, 2, 1];

        const currentInputVal = this.phoneNumberRefs[index];
        const nextInputVal = this.phoneNumberRefs[index + 1];
        const prevInputVal = this.phoneNumberRefs[index - 1];

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
          setPhoneInput(newPhoneInput);
        }

        if (shouldGoNext) {
          this.phoneNumberRefs[index + 1].current?.focus();
        }

        if (shouldGoPrev) {
          prevInputVal.current?.focus();
        }
      };

    return (
      <>
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={phoneNumber[0]}
            ref={input0}
            onChange={onPhoneInputsHandler(0)}
            maxLength={phoneNumberLengths[0]}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={phoneNumber[1]}
            ref={input1}
            onChange={onPhoneInputsHandler(1)}
            maxLength={phoneNumberLengths[1]}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={phoneNumber[2]}
            ref={input2}
            onChange={onPhoneInputsHandler(2)}
            maxLength={phoneNumberLengths[2]}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={phoneNumber[3]}
            ref={input3}
            onChange={onPhoneInputsHandler(3)}
            maxLength={phoneNumberLengths[3]}
          />
        </div>
      </>
    );
  }
}
