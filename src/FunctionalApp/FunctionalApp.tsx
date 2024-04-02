import { useState } from "react";
import { TUserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userInformation, setUserInformation] =
    useState<TUserInformation | null>(null);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userInformation} />
      <FunctionalForm setUserInformation={setUserInformation} />
    </>
  );
};
