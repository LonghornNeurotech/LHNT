import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, About, Contact, Navbar, Events, Login, MemberHome, ProgramsMenu} from "./components";
import MemberRoute from "./components/MemberRoute";
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
              {/* Public routes: open to anyone not logged in! */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<Login />} />

              {/* Member-only routes: open to only logged in members! */}
              <Route
                path="/member"
                element={
                  <MemberRoute>
                    <MemberHome />
                  </MemberRoute>
                }
              />
              <Route
                path="/programs"
                element={
                  <MemberRoute>
                    <ProgramsMenu />
                  </MemberRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;