import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

import {
  AuthProvider
} from './auth/AuthContext';

import {
  ProfileProvider
} from './auth/ProfileContext';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(

  <React.StrictMode>

    <div className="fade-in">

      <AuthProvider>

        <ProfileProvider>

          <App />

        </ProfileProvider>

      </AuthProvider>

    </div>

  </React.StrictMode>
);