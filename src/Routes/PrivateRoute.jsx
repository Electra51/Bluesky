import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import Spinner from "../components/Common/Spinner";

export default function PrivateRoute({ children }) {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/v1/auth/user-auth`
      );
      if (res) {
        console.log("first", res.data.ok);
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <div>{children}</div> : <Spinner />;
}
