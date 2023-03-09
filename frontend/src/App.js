import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegisterForm } from "./components/authForm/RegistrationFrom";
import { LoginForm } from "./components/authForm/LoginForm";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Explore } from "./pages/Explore";
import { BookMarks } from "./pages/BookMarks";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route exact path="/registration" element={<RegisterForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/:username" element={<Home />} />
            <Route exact path="/profile/:username" element={<Profile />} />
            <Route exact path="/Explore" element={<Explore />} />
            <Route exact path="/Bookmarks" element={<BookMarks />} />
            <Route
              exact
              path="*"
              element={() => {
                return <h1>404</h1>;
              }}
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
