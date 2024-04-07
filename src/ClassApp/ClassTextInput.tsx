import { Component, ComponentProps } from "react";

type TProps = {
  label: string;
  inputProps: ComponentProps<"input">;
};

export default class ClassTextInput extends Component<TProps> {
  render() {
    const { label, inputProps } = this.props;

    return (
      <>
        <label>{label}:</label>
        <input {...inputProps} />
      </>
    );
  }
}
