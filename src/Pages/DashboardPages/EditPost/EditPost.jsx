import React from "react";
import { useAuth } from "../../../context/auth";
import EditPostForAdmin from "./EditPostForAdmin";
import EditPostForAuthor from "./EditPostForAuthor";

const EditPost = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>{auth?.user?.role == 2 ? <EditPostForAdmin /> : <EditPostForAuthor />}</>
  );
};

export default EditPost;
