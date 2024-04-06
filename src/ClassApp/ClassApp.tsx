import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { TUserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";

type TState = { userInformation: TUserInformation | null };

export class ClassApp extends Component<Record<string, never>, TState> {
  state = {
    userInformation: null,
  };

  setUserInformation = (userInfo: TUserInformation) => {
    this.setState({ userInformation: userInfo });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userInformation} />
        <ClassForm setUserInformation={this.setUserInformation} />
      </>
    );
  }
}
