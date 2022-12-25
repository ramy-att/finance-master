import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Investments from "../../components/investments/Investments";

export default function InvestmentsPage() {
  const isAuth = useSelector((state) => state.isAuthenticated);
  const router = useRouter();

  // Check user exists
  useEffect(() => {
    if (!isAuth) {
      router.push("/signin");
    }
  }, [isAuth, router]);

  return <Investments />;
}
