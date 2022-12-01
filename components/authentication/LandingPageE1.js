import Image from "next/image";
import { Button } from "react-bootstrap";
import addUser from "../pictures/addUser.png";
import Link from "next/link";

export const LandingPageE1 = () => {
  return (
    <Link href="/signup">
      <div className="LandingPageE1">
        <h1 className="landingETitle">Save!</h1>
        <Image src={addUser} alt="Add User" width="200" height="200" />
        {/* <div className="LandingElementsButton">
          <Button class="LandingEBtn">Sign Up</Button>
        </div> */}
      </div>
    </Link>
  );
};
