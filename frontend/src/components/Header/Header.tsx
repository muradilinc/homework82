import { Link, useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { routes } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { logout } from '../../store/users/usersThunk';
import { getAllArtists } from '../../store/artists/artistsThunk';

const Header = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await dispatch(logout()).unwrap();
    await dispatch(getAllArtists());
    navigate(routes.home);
  };

  return (
    <div className="container flex justify-between items-center fixed">
      <div className="flex gap-x-2 p-[10px]">
        <button
          className={`bg-black bg-opacity-60 p-[10px] rounded-[50%]`}
          onClick={() => navigate(-1)}
        >
          <CaretLeft size={20} />
        </button>
        <button
          className={`bg-black bg-opacity-60 p-[10px] rounded-[50%]`}
          onClick={() => navigate(+1)}
        >
          <CaretRight size={20} />
        </button>
      </div>
      <div className="mr-5">
        {user ? (
          <div className="flex gap-x-5 items-center">
            <Link
              className="text-[#a7a7a7] text-base font-bold capitalize bg-black bg-opacity-50 rounded-[50%] py-[8px] px-[16px]"
              to={routes.submit}
            >
              +
            </Link>
            <Link
              className="text-[#a7a7a7] text-base font-bold capitalize bg-black bg-opacity-50 rounded-[30px] py-[8px] px-[32px]"
              to={routes.history}
            >
              History
            </Link>
            <button
              className="text-[#a7a7a7] text-base font-bold capitalize bg-black bg-opacity-50 rounded-[30px] py-[8px] px-[32px]"
              onClick={logoutHandler}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-5 items-center">
            <button
              className="text-[#a7a7a7] text-base font-bold capitalize bg-black bg-opacity-50 rounded-[30px] py-[8px] px-[32px]"
              onClick={() => navigate(routes.signUp)}
            >
              sign up
            </button>
            <button
              className="text-black bg-white rounded-[30px] py-[8px] px-[32px] text-base font-bold capitalize"
              onClick={() => navigate(routes.signIn)}
            >
              sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
