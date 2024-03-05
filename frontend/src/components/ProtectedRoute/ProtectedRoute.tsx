import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../constants/routes';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}
const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to={routes.signIn} />;
  }
  return children;
};

export default ProtectedRoute;
