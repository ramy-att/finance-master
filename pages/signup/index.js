import SignUp from "../../components/SignUp/SignUp";
import { useRef } from "react";

export default function signUpPage() {
  async function createUserAccount(user) {
    const email= user.email;
    const password= user.password;
    const response = await fetch("api/sign-up", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      header: {
        "Content/type": "application/json",
      }
    })
    const data= await response.json();
  }

  return <SignUp createUserAccount={createUserAccount}></SignUp>;
}
