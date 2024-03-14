import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { githubLogin, googleLogin, login } from '../../store/users/usersThunk';
import { routes } from '../../constants/routes';
import { LoginMutation } from '../../type';
import { selectLoginError } from '../../store/users/usersSlice';
import { GoogleLogin } from '@react-oauth/google';
import { GITHUB_CLIENT_ID, GITHUB_LINK_AUTH } from '../../constants/link';

const LoginPage = () => {
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const {search} = useLocation() as {search: string};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);

  useEffect(() => {
    if (search.length !== 0) {
      const code = search.split('=')[1];
      void dispatch(githubLogin(code)).unwrap();
      navigate(routes.home);
    }
  }, [dispatch, navigate, search]);

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

  const githubLoginHandler = async () => {
    window.location.assign(GITHUB_LINK_AUTH + GITHUB_CLIENT_ID);
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
        <div className="flex flex-col gap-y-3">
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
          <button
            type="button"
            onClick={githubLoginHandler}
            className="flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-300 transform bg-[#1F2328] rounded-lg focus:outline-none"
          >
            <svg
              className="w-8 h-8 mx-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 30 30"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>

            <span className="hidden mx-2 sm:inline">Sign in with Github</span>
          </button>
        </div>
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
