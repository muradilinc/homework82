import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllArtists } from '../../store/artists/artistsThunk';
import Cards from '../../components/card/cards';
import { selectArtists } from '../../store/artists/artistsSlice';
import { selectUser } from '../../store/users/usersSlice';

const HomePage = () => {
  const artists = useAppSelector(selectArtists);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getAllArtists());
  }, [dispatch]);

  return (
    <div className="my-[10px]">
      <div className="bg-gradient-to-b from-indigo-500 from-5% via-5% to-55% px-[20px] pt-[80px] pb-[20px] rounded-[8px]">
        <h2 className="text-3xl font-bold">
          Добрый вечер {user && user.username}
        </h2>
        <div>
          <Cards data={artists} route={'artists'} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
