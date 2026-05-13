// src/main.tsx

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

import {
  Toaster
} from 'sonner';

import {
  wsManager
} from './realtime/ws.manager';

// ==========================================
// 🚀 GLOBAL REALTIME INIT
// ==========================================

wsManager.initialize();

ReactDOM.createRoot(
  document.getElementById('root')!
).render(

  <React.StrictMode>

    <div className="fade-in">

      <AuthProvider>

        <ProfileProvider>

          <App />

          <Toaster
            richColors
            position="top-right"
            expand
            closeButton
            theme="dark"
          />

        </ProfileProvider>

      </AuthProvider>

    </div>

  </React.StrictMode>
);