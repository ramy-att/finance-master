import { Budget } from "../../components/budget/Budget";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function BudgetPage() {
  const isAuth = useSelector((state) => state.isAuthenticated);

  const router = useRouter();

  // Check user exists
  useEffect(() => {
    if (!isAuth) {
      router.push("/signin");
    }
  }, [isAuth, router]);

  return <Budget />;
}
