import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Assets } from "../../components/assets/Assets";

export default function AssetsPage() {
  const isAuth = useSelector((state) => state.isAuthenticated);
  const router = useRouter();

  // Check user exists
  useEffect(() => {
    if (!isAuth) {
      router.push("/signin");
    }
  }, [isAuth, router]);

  return <Assets />;
}
