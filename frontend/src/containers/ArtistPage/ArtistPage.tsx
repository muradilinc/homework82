import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtist,
  selectGetSingleLoading,
} from '../../store/artists/artistsSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getArtist } from '../../store/artists/artistsThunk';
import { BASE_URL } from '../../constants/link';
import { selectAlbums } from '../../store/albums/albumsSlice';
import { getAlbumsByArtist } from '../../store/albums/albumsThunk';
import Cards from '../../components/card/cards';
import Spinner from '../../components/Spinner/Spinner';

const ArtistPage = () => {
  const artist = useAppSelector(selectArtist);
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectGetSingleLoading);
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtist(id));
    dispatch(getAlbumsByArtist(id));
  }, [dispatch, id]);

  if (loading || !artist) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col my-[10px] bg-gradient-to-b from-gray-700 rounded-tl-[5px] rounded-tr-[5px]">
      <div className="flex gap-x-3 items-center px-[20px] py-[40px]">
        <img
          className="rounded-[50%] w-[332px]"
          src={BASE_URL + '/' + artist.picture}
          alt="ArtistImage"
        />
        <h2 className="font-bold text-8xl">{artist.name}</h2>
      </div>
      <div className="bg-gradient-to-b from-gray-700 p-[20px]">
        <h4 className="font-bold text-2xl">Albums</h4>
        <div>
          <Cards data={albums} route={'albums'} />
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
