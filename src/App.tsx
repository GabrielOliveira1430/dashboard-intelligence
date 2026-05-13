// src/App.tsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute';

import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Strategies from './pages/Strategies';
import Simulator from './pages/Simulator';
import Football from './pages/Football';
import Login from './pages/Login';
import CommandCenter from './pages/CommandCenter';

export default function App() {

  return (

    <div className="
      min-h-screen
      bg-[#020817]
      text-white
      overflow-x-hidden
    ">

      <BrowserRouter>

        <Routes>

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* DASHBOARD */}

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* ANALYTICS */}

          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />

          {/* STRATEGIES */}

          <Route
            path="/strategies"
            element={
              <PrivateRoute>
                <Strategies />
              </PrivateRoute>
            }
          />

          {/* SIMULATOR */}

          <Route
            path="/simulator"
            element={
              <PrivateRoute>
                <Simulator />
              </PrivateRoute>
            }
          />

          {/* FOOTBALL */}

          <Route
            path="/football"
            element={
              <PrivateRoute>
                <Football />
              </PrivateRoute>
            }
          />

          {/* COMMAND CENTER */}

          <Route
            path="/command-center"
            element={
              <PrivateRoute>
                <CommandCenter />
              </PrivateRoute>
            }
          />

          {/* FALLBACK */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}