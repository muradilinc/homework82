import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotPage from '../NotPage/NotPage';
import { routes } from '../../constants/routes';
import Layout from '../../components/Layout/Layout';
import ArtistPage from '../ArtistPage/ArtistPage';
import AlbumsPage from '../AlbumsPage/AlbumsPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import HistoryPage from '../HistoryPage/HistoryPage';
import NewPage from '../NewPage/NewPage';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { selectUser } from '../../store/users/usersSlice';
import { useAppSelector } from '../../app/hooks';
import AdminPage from '../AdminPage/AdminPage';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.artists + '/:id'} element={<ArtistPage />} />
          <Route path={routes.albums + '/:id'} element={<AlbumsPage />} />
          <Route path={routes.history} element={<HistoryPage />} />
          <Route path={routes.signUp} element={<RegisterPage />} />
          <Route path={routes.signIn} element={<LoginPage />} />
          <Route
            path={routes.submit}
            element={
              <ProtectedRoute isAllowed={!!user}>
                <NewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.admin}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path={routes.notPage} element={<NotPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
