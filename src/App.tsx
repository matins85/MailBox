import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Loading from "./components/Loading";
import { setAuthToken } from "./utils/storage";
import { homeRoute, mailRoute } from "./utils/label";

const Home = lazy(() => import("./pages/home/page"));
const Mail = lazy(() => import("./pages/mail/page"));
const NotFound = lazy(() => import("./pages/404/page"));

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    setAuthToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M3OGM2NTZhYjE4OTYyOWRjMTEyZGYiLCJpYXQiOjE3NDExMzA4OTIsImV4cCI6MTc0ODkwNjg5Mn0.hoRA_1kwVQYdhZekfi5vPguzxoUMKR1mkED3ntKKXeE"
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Normal Routes */}
            <Route path="/" element={<Home />} />

            {/* Redirect /home to / */}
            <Route path={homeRoute} element={<Navigate to="/" />} />

            {/* Lazy Loaded Mail Page */}
            <Route path={mailRoute} element={<Mail />} />

            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}
