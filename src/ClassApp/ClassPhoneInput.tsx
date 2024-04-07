import React, { ChangeEventHandler, Component } from "react";
import { TPhoneInput } from "../types";

type TPhoneInputProps = {
  phoneNumber: TPhoneInput;
  phoneNumberRefs: React.MutableRefObject<HTMLInputElement | null>[];
  onPhoneInputsHandler: (index: number) => ChangeEventHandler<HTMLInputElement>;
};

export default class ClassPhoneInput extends Component<TPhoneInputProps> {
  render() {
    const phoneNumberLengths = [2, 2, 2, 1];
    const { phoneNumber, phoneNumberRefs, onPhoneInputsHandler } = this.props;
    const [input0, input1, input2, input3] = phoneNumberRefs;

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
