import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Loans } from "../../components/loansPage/Loans";

export default function LoansPage() {
  const isAuth = useSelector((state) => state.isAuthenticated);
  const router = useRouter();

  // Check user exists
  useEffect(() => {
    if (!isAuth) {
      router.push("/signin");
    }
  }, [isAuth, router]);

  return <Loans />;
}
