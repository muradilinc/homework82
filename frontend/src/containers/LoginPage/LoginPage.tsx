import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin, login } from '../../store/users/usersThunk';
import { routes } from '../../constants/routes';
import { LoginMutation } from '../../type';
import { selectLoginError } from '../../store/users/usersSlice';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate(routes.home);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-[#121212] p-[20px] box-border w-[45%] rounded-[8px] flex flex-col gap-y-[30px]">
        <h2 className="text-center text-5xl font-bold">Sign in</h2>
        <form onSubmit={sendFormHandler} className="flex flex-col gap-y-3">
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            value={state.email}
            onChange={changeField}
            name="email"
            type="email"
            required
          />
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            value={state.password}
            onChange={changeField}
            name="password"
            type="password"
            required
          />
          {error && <p className="text-sm text-red-500">{error.error}</p>}
          <button
            className="bg-[#1ed760] rounded-[30px] text-base font-bold py-[8px] text-black capitalize"
            type="submit"
          >
            sign in
          </button>
        </form>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              void googleLoginHandler(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log('Login failed');
          }}
        />
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
