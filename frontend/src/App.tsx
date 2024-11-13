import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./routes/Home";
import DashboardHeader from "./components/DashboardHeader";
const Signup = lazy(() => import('./routes/Signup'));
const Login = lazy(() => import("./routes/Login"));

function App() {
  return (
    <>
      <DashboardHeader />
      <hr />
      <Router>
        <Suspense fallback={<div> loading... </div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
