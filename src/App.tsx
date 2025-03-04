import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Loading from "./components/Loading";
import { homeRoute, mailRoute, notFoundRoute } from "./utils/routes";

const Home = lazy(() => import("./pages/home/Home"));
const Mail = lazy(() => import("./pages/mail/page"));
const NotFound = lazy(() => import("./pages/404/NotFound"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Normal Routes */}
          <Route path="/" element={<Home />} />

          {/* Redirect /home to / */}
          <Route path={homeRoute} element={<Navigate to="/" />} />

          {/* Lazy Loaded Mail Page */}
          <Route path={mailRoute} element={<Mail />} />

          {/* Redirect unknown routes to NotFound page */}
          <Route path={notFoundRoute} element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
