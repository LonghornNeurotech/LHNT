import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, About, Contact, Navbar, Events, Login} from "./components";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

/*
  Implement AuthProvider to manage authentication state of the user
  throughout the Longhorn Neurotech website!
*/
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;