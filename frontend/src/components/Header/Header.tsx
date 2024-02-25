import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { routes } from '../../constants/routes';

const Header = () => {
  const navigate = useNavigate();

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
      <div className="flex gap-x-5 mr-5">
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
    </div>
  );
};

export default Header;
