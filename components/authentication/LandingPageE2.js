import Image from "next/image";
import Link from "next/link";
import budget from "../pictures/familybudgeting.png";

export const LandingPageE2 = () => {
  return (
    <Link href="/signin">
      <div className="LandingPageE1">
        <h1 className="landingETitle">Budget!</h1>
        <Image src={budget} alt="Budget" width="200" height="200" />
      </div>
    </Link>
  );
};
