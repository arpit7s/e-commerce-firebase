import Navbar from "./Components/Common/Navbar";
import Footer from "./Pages/Footer";

import "./app.css";
import AppRoutes from "./routes/AppRoutes";


export function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  )
}
