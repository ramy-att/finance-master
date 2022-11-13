import Image from "next/image";
import { Button } from "react-bootstrap";
import invest from "../pictures/familyInvests.png";
import Link from "next/link";

export const LandingPageE3 = () => {
  return (
    <Link href="/signIn">
      <div className="LandingPageE1">
        <h1 className="landingETitle">Invest!</h1>
        <Image src={invest} alt="Budget" width="200" height="200" />
        <div className="LandingElementsButton">
          <Button class="LandingEBtn">Invest</Button>
        </div>
      </div>
    </Link>
  );
};
