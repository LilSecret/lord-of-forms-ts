import { ChangeEventHandler, useRef } from "react";
import { TPhoneInput } from "../types";
import { isPhoneNumber } from "../utils/validations";

type TPhoneInputProps = {
  phoneNumber: TPhoneInput;
  setPhoneNumber: (phoneNumber: TPhoneInput) => void;
};

export const FunctionalPhoneInput = ({
  phoneNumber,
  setPhoneNumber,
}: TPhoneInputProps) => {
  const phoneNumberRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const [input0, input1, input2, input3] = phoneNumberRefs;
  const phoneNumberLengths = [2, 2, 2, 1];

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

      if (shouldGoNext) {
        phoneNumberRefs[index + 1].current?.focus();
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
};
