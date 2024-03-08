import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TrackMutation } from '../../type';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllArtists } from '../../store/artists/artistsThunk';
import { selectAlbums } from '../../store/albums/albumsSlice';
import { getAlbumsByArtist } from '../../store/albums/albumsThunk';
import { selectArtists } from '../../store/artists/artistsSlice';
import { createTrack } from '../../store/tracks/tracksHistoryThunk';

const TrackForm = () => {
  const [track, setTrack] = useState<TrackMutation>({
    title: '',
    number: '',
    album: '',
    duration: '',
  });
  const [author, setAuthor] = useState('');
  const albums = useAppSelector(selectAlbums);
  const authors = useAppSelector(selectArtists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(getAllArtists());
    }
  }, [authors, dispatch]);

  const changeTrackFields = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setTrack((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectAuthor = async (event: ChangeEvent<HTMLSelectElement>) => {
    setAuthor(event.target.value);
    await dispatch(getAlbumsByArtist(event.target.value));
  };

  const clearFields = () => {
    setTrack({
      title: '',
      duration: '',
      album: '',
      number: '',
    });
    setAuthor('');
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createTrack(track)).unwrap();
    clearFields();
  };

  return (
    <form onSubmit={handleCreate} className="w-full flex flex-col gap-y-3">
      <div className="w-full items-center grid grid-cols-2">
        <p className="capitalize">name:</p>
        <input
          type="text"
          name="title"
          className="bg-gray-50 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={track.title}
          onChange={changeTrackFields}
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <p className="capitalize">duration:</p>
        <input
          type="text"
          name="duration"
          className="bg-gray-50 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={track.duration}
          onChange={changeTrackFields}
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <p className="capitalize">number in album</p>
        <input
          type="text"
          name="number"
          className="bg-gray-50 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={track.number}
          onChange={changeTrackFields}
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <p className="capitalize">author:</p>
        <select
          name="author"
          value={author}
          onChange={selectAuthor}
          className="bg-gray-800 p-2 rounded-[5px]"
          required
        >
          <option value="">choose author</option>
          {authors.map((author) => (
            <option className="text-white" value={author._id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2">
        <p>Album:</p>
        <select
          name="album"
          value={track.album}
          onChange={changeTrackFields}
          className="bg-gray-800 p-2 rounded-[5px]"
          disabled={author.length === 0}
          required
        >
          <option value="">choose album</option>
          {albums.map((album) => (
            <option className="text-white" value={album._id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#1ed760] px-2 py-1 rounded-[5px] capitalize"
        >
          create
        </button>
      </div>
    </form>
  );
};

export default TrackForm;
