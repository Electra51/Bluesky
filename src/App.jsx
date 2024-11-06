import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/Route";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
      <ScrollToTop smooth color="#6f00ff" />
    </>
  );
}

export default App;
