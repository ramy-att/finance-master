import Image from "next/image";
import Link from "next/link";
import invest from "../pictures/familyInvests.png";

export const LandingPageE3 = () => {
  return (
    <Link href="/signIn">
      <div className="LandingPageE1">
        <h1 className="landingETitle">Invest!</h1>
        <Image src={invest} alt="Budget" width="200" height="200" />
      </div>
    </Link>
  );
};
