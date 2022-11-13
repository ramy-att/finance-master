import Dashboard from "../../components/dashboard/Dashboard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function resetPassPage() {
  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isAuth = useSelector((state) => state.isAuthenticated);

  const dispatch = useDispatch();
  const router = useRouter();

  // Check user exists
  useEffect(() => {
    if (!isAuth) {
      router.push("/signin");
    }
  }, []);

  return <Dashboard></Dashboard>;
}
