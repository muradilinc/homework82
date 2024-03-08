import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtist,
  selectGetSingleLoading,
} from '../../store/artists/artistsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteArtist, getArtist } from '../../store/artists/artistsThunk';
import { BASE_URL } from '../../constants/link';
import { selectAlbums } from '../../store/albums/albumsSlice';
import { getAlbumsByArtist } from '../../store/albums/albumsThunk';
import Cards from '../../components/card/cards';
import Spinner from '../../components/Spinner/Spinner';
import { routes } from '../../constants/routes';
import { selectUser } from '../../store/users/usersSlice';

const ArtistPage = () => {
  const artist = useAppSelector(selectArtist);
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectGetSingleLoading);
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArtist(id));
    dispatch(getAlbumsByArtist(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    await dispatch(deleteArtist(id)).unwrap();
    navigate(routes.home);
  };

  if (loading || !artist) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col my-[10px] bg-gradient-to-b from-gray-700 rounded-tl-[5px] rounded-tr-[5px]">
      <div className="flex gap-x-3 items-center px-[20px] py-[60px]">
        <img
          className="rounded-[50%] w-[232px] h-[232px]"
          src={BASE_URL + '/' + artist.picture}
          alt="ArtistImage"
        />
        <h2 className="font-bold text-8xl">{artist.name}</h2>
      </div>
      <div className="bg-gradient-to-b from-gray-700 p-[20px]">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-2xl">Albums</h4>
          {!artist.isPublished && artist.user._id === user?._id ? (
            <button
              onClick={handleDelete}
              className="bg-red-400 px-[15px] py-[5px] rounded-[5px] capitalize"
            >
              delete
            </button>
          ) : null}
        </div>
        <div>
          <Cards data={albums} route={'albums'} />
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
