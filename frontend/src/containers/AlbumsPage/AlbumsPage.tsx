import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/link';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAlbum,
  selectGetSingleAlbumLoading,
} from '../../store/albums/albumsSlice';
import { getAlbum } from '../../store/albums/albumsThunk';
import dayjs from 'dayjs';
import { sumDuration } from '../../helpers/sumDuration';
import { Clock } from '@phosphor-icons/react';
import Spinner from '../../components/Spinner/Spinner';

const AlbumsPage = () => {
  const { id } = useParams() as { id: string };
  const album = useAppSelector(selectAlbum);
  const loading = useAppSelector(selectGetSingleAlbumLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAlbum(id));
  }, [dispatch, id]);

  if (loading || !album) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col my-[10px] bg-gradient-to-b from-gray-700 rounded-tl-[5px] rounded-tr-[5px]">
      <div className="flex gap-x-3 items-end px-[20px] pt-[80px] pb-[20px]">
        <img
          className="rounded-[5px] w-[332px]"
          src={BASE_URL + '/' + album.image}
          alt="ArtistImage"
        />
        <div className="flex flex-col">
          <p>Album</p>
          <h2 className="font-bold text-8xl">{album.title}</h2>
          <div className="flex items-center gap-x-[5px] mt-5">
            <img
              className="rounded-[50%] w-[25px]"
              src={BASE_URL + '/' + album.author.picture}
              alt="Artist"
            />
            <p className="flex gap-x-3">
              {album.author.name}
              <span>{dayjs(album.release).format('YYYY')}</span>
              <span>{album.tracks.length} tracks,</span>
              <span>{sumDuration(album.tracks)}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-gray-700 from-15% p-[20px]">
        <div className="p-[10px] w-full">
          <div className="grid grid-cols-12 p-[20px]">
            <div className="col-span-11 flex gap-x-[15px]">
              <span>#</span>
              <p className="capitalize">title</p>
            </div>
            <Clock size={20} />
          </div>
          {album.tracks.map((track, index) => (
            <div
              className="grid grid-cols-12 hover:bg-white items-center rounded-[5px] hover:bg-opacity-5 p-[20px]"
              key={track._id}
            >
              <div className="col-span-11 flex gap-x-[15px] items-center">
                <span>{index + 1}</span>
                <div>
                  <p className="text-base">{track.title}</p>
                  <span className="text-sm">{album.author.name}</span>
                </div>
              </div>
              <p>{track.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumsPage;
