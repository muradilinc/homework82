import { Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotPage from '../NotPage/NotPage';
import { routes } from '../../constants/routes';
import Layout from '../../components/Layout/Layout';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.notPage} element={<NotPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
