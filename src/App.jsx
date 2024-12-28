import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/Route";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import { useEffect, useState } from "react";
import Loader from "./components/Common/Loader";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
      <ScrollToTop smooth color="#fff" />
    </>
  );
}

export default App;
