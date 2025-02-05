import Navbar from "./Components/Common/Navbar";
import Footer from "./Pages/Footer";
import "./app.css";
import AppRoutes from "./routes/AppRoutes";

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
