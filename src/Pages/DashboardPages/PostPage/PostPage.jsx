import React from "react";
import { useAuth } from "../../../context/auth";
import PostPageForAdmin from "./PostPageForAdmin";
import PostPageForAuthor from "./PostPageForAuthor";

const PostPage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>{auth?.user?.role == 2 ? <PostPageForAdmin /> : <PostPageForAuthor />}</>
  );
};

export default PostPage;
