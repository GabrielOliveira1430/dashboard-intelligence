import type {
  ReactNode
} from 'react';

import {
  Navigate
} from 'react-router-dom';

import {
  isAuthenticated
} from './auth.storage';

type Props = {
  children: ReactNode;
};

export default function PrivateRoute({
  children
}: Props) {

  const authenticated =
    isAuthenticated();

  // 🔥 NÃO AUTENTICADO
  if (!authenticated) {

    return (
      <Navigate to="/login" />
    );
  }

  // 🔥 LOADING VISUAL
  return (

    <div className="fade-in">

      {children}

    </div>
  );
}