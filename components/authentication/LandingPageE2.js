import Image from "next/image";
import { Button } from "react-bootstrap";
import budget from "../pictures/familybudgeting.png";
import Link from "next/link";
export const LandingPageE2 = () => {
  const sendToSignIn = () => {};
  return (
    <Link href="/signin">
      <div className="LandingPageE1">
        <h1 className="landingETitle">Budget!</h1>
        <Image src={budget} alt="Budget" width="200" height="200" />
        <div className="LandingElementsButton">
          <Button class="LandingEBtn">Manage</Button>
        </div>
      </div>
    </Link>
  );
};
