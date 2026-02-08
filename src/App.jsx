import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home, About, Contact, Navbar, Events, Login, MemberHome, ProgramsMenu, ViewPastCompetitions} from "./components";
import MemberRoute from "./components/MemberRoute";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import GeneralInfo from './components/GeneralInfo';
import CompetitionInfo from './components/CompetitionInfo';
import AskQuestions from './components/AskQuestions';

// Import OnboardingRouter to help control which onboarding pages content gets displayed!
import OnboardingRouter from "./components/onboarding/OnboardingRouter";

/*
  Implement AuthProvider to manage authentication state of the user
  throughout the Longhorn Neurotech website!
*/
import { AuthProvider } from "./context/AuthProvider";

// Implement ProgressProvider to keep track of onboarding progress throughout the website
import { ProgressProvider } from "./context/ProgressProvider";

const App = () => {
  return (
    <AuthProvider>
      <ProgressProvider>
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
                path="/general-info"
                element={
                  <MemberRoute>
                    <GeneralInfo />
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

              <Route
                path="/onboarding/:onboardingBlock/:moduleSubmodule"
                element={
                  <MemberRoute>
                    <OnboardingRouter />
                  </MemberRoute>
                }
              />

              <Route
                path="/competition-info"
                element={
                  <MemberRoute>
                    <CompetitionInfo />
                  </MemberRoute>
                }
              />

              <Route
                path="/past-competitions"
                element={
                  <MemberRoute>
                    <ViewPastCompetitions />
                  </MemberRoute>
                }
              />

              <Route
                path="/ask-questions"
                element={
                  <MemberRoute>
                    <AskQuestions />
                  </MemberRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
      </ProgressProvider>
    </AuthProvider>
  );
};

export default App;