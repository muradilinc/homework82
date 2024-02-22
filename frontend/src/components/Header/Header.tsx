import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto relative">
      <div className="fixed flex gap-x-2 p-[10px]">
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
    </div>
  );
};

export default Header;