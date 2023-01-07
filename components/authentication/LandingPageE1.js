import Image from "next/image";
import Link from "next/link";
import addUser from "../pictures/addUser.png";

export const LandingPageE1 = () => {
  return (
    <Link href="/signup">
      <div className="LandingPageE1">
        <h1 className="landingETitle">Save!</h1>
        <Image src={addUser} alt="Add User" width="200" height="200" />
      </div>
    </Link>
  );
};

