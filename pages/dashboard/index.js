import Dashboard from "../../components/dashboard/Dashboard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function ResetPassPage() {
  const isAuth = useSelector((state) => state.isAuthenticated);
  const userInfo = useSelector((state) => state.userInfo);

  const router = useRouter();

  // Check user exists
  useEffect(() => {
    if (!isAuth) {
      router.push("/signin");
    }
  }, [isAuth, router]);

  return <Dashboard />;
}
