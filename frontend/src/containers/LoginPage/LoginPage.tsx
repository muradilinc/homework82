import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-[#121212] p-[20px] box-border w-[45%] rounded-[8px]">
        <h2 className="text-center text-5xl font-bold mb-[30px]">Sign in</h2>
        <form className="flex flex-col gap-y-3">
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            type="text"
          />
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            type="password"
          />
          <button
            className="bg-[#1ed760] rounded-[30px] text-base font-bold py-[8px] text-black capitalize"
            type="submit"
          >
            sign in
          </button>
        </form>
        <p className="text-center border-t mt-[30px] py-[30px] border-gray-500">
          No account?{' '}
          <Link className="hover:text-[#1ed760]" to={routes.signUp}>
            Sign up for Spotify
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
