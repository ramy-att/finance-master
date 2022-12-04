import {Budget} from "../../components/budget/Budget";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../../components/Load/Loading";
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
  if ( !isAuth) {
    return <Loading/>
  }
  return <Budget/>
}
