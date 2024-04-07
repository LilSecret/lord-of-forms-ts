import { ComponentProps } from "react";

type TProps = {
  label: string;
  inputProps: ComponentProps<"input">;
};

export const FunctionalTextInput = ({ label, inputProps }: TProps) => {
  return (
    <>
      <label>{label}:</label>
      <input {...inputProps} />
    </>
  );
};
