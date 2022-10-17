//Correct Imports Here!
import context from "../components/store/context";
import { useContext } from "react";
import LogInPage from "./Login";

export default function App() {
  const authCtx = useContext(context);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      {isLoggedIn == false && <LogInPage></LogInPage>}
      {/* {isLoggedIn == true && authCtx.profile && <Profile></Profile>} */}
    </>
    // <>
    // {isLoggedIn==false&&<p>Not Logged in1</p>}
    // </>
  );
}

