import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getAllArtists } from '../../store/artists/artistsThunk';
import Cards from '../../components/card/cards';

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllArtists());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Добрый вечер</h2>
      <div className="my-[30px] bg-gradient-to-b from-indigo-500 from-5% via-5% to-55% p-[20px] rounded-[8px]">
        <div>
          <h4 className="text-xl font-bold">Artists</h4>
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
