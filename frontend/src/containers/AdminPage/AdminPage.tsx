import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectContent,
  selectContentLoading,
} from '../../store/users/usersSlice';
import {
  changeAlbumStatus,
  changeArtistStatus,
  changeTrackStatus,
  getContents,
} from '../../store/users/adminThunk';
import Spinner from '../../components/Spinner/Spinner';
import { deleteArtist } from '../../store/artists/artistsThunk';
import { deleteAlbum } from '../../store/albums/albumsThunk';
import { deleteTrack } from '../../store/tracks/tracksHistoryThunk';

const AdminPage = () => {
  const content = useAppSelector(selectContent);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectContentLoading);

  useEffect(() => {
    dispatch(getContents());
  }, [dispatch]);

  const handleArtistDelete = async (id: string) => {
    await dispatch(deleteArtist(id)).unwrap();
    await dispatch(getContents());
  };
  const handleAlbumDelete = async (id: string) => {
    await dispatch(deleteAlbum(id)).unwrap();
    await dispatch(getContents());
  };
  const handleTrackDelete = async (id: string) => {
    await dispatch(deleteTrack(id)).unwrap();
    await dispatch(getContents());
  };

  const handleArtistPublication = async (id: string) => {
    await dispatch(changeArtistStatus(id)).unwrap();
    await dispatch(getContents());
  };
  const handleAlbumPublication = async (id: string) => {
    await dispatch(changeAlbumStatus(id)).unwrap();
    await dispatch(getContents());
  };
  const handleTrackPublication = async (id: string) => {
    await dispatch(changeTrackStatus(id)).unwrap();
    await dispatch(getContents());
  };

  if (loading || !content) {
    return <Spinner />;
  }

  return (
    <div className="pt-[100px] pb-[50px] flex gap-y-5 justify-between items-center flex-col">
      <div className="w-[80%]">
        <h4 className="font-bold text-[22px]">Artist</h4>
        <div className="grid grid-cols-1 gap-y-2">
          {content.artists.map((artist) => (
            <div className="grid grid-cols-5 gap-x-3">
              <p className="col-span-2">{artist.name}</p>
              <p
                className={
                  artist.isPublished
                    ? 'bg-[#1ed760] text-center rounded-[5px]'
                    : 'bg-red-500 text-center rounded-[5px]'
                }
              >
                {artist.isPublished ? 'published' : 'unpublished'}
              </p>
              {!artist.isPublished ? (
                <button
                  onClick={() => handleArtistPublication(artist._id)}
                  className="bg-[#1ed760]"
                >
                  publication
                </button>
              ) : (
                <button
                  onClick={() => handleArtistPublication(artist._id)}
                  className="bg-red-400"
                >
                  remove publication
                </button>
              )}
              <button
                onClick={() => handleArtistDelete(artist._id)}
                className="bg-red-400 rounded-[5px]"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[80%]">
        <h4 className="font-bold text-[22px]">Albums</h4>
        <div className="grid grid-cols-1 gap-y-2">
          {content.albums.map((album) => (
            <div className="grid grid-cols-10 gap-x-3 items-center">
              <p className="col-span-2">{album.title}</p>
              <p>{album.release}</p>
              <p className="col-span-2">
                {album.author ? album.author.name : 'unknown'}
              </p>
              <p
                className={
                  album.isPublished
                    ? 'bg-[#1ed760] text-center rounded-[5px]'
                    : 'bg-red-500 text-center rounded-[5px]'
                }
              >
                {album.isPublished ? 'published' : 'unpublished'}
              </p>
              {!album.isPublished ? (
                <button
                  onClick={() => handleAlbumPublication(album._id)}
                  className="col-span-2 bg-[#1ed760]"
                >
                  publication
                </button>
              ) : (
                <button
                  onClick={() => handleAlbumPublication(album._id)}
                  className="col-span-2 bg-red-400"
                >
                  remove publication
                </button>
              )}
              <button
                onClick={() => handleAlbumDelete(album._id)}
                className="bg-red-400 rounded-[5px]"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[80%]">
        <h4 className="font-bold text-[22px]">Tracks</h4>
        <div className="grid grid-cols-1 gap-y-2">
          {content.tracks.map((track) => (
            <div className="grid grid-cols-7 gap-x-3 items-center">
              <p className="col-span-2">{track.title}</p>
              <p>{track.duration}</p>
              <p
                className={
                  track.isPublished
                    ? 'bg-[#1ed760] text-center rounded-[5px]'
                    : 'bg-red-500 text-center rounded-[5px]'
                }
              >
                {track.isPublished ? 'published' : 'unpublished'}
              </p>
              {!track.isPublished ? (
                <button
                  onClick={() => handleTrackPublication(track._id)}
                  className="bg-[#1ed760]"
                >
                  publication
                </button>
              ) : (
                <button
                  onClick={() => handleTrackPublication(track._id)}
                  className="bg-red-400"
                >
                  remove publication
                </button>
              )}
              <button
                onClick={() => handleTrackDelete(track._id)}
                className="bg-red-400"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
