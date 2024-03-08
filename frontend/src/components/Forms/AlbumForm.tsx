import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { AlbumMutation } from '../../type';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists } from '../../store/artists/artistsSlice';
import { getAllArtists } from '../../store/artists/artistsThunk';
import { createAlbum } from '../../store/albums/albumsThunk';

const AlbumForm = () => {
  const [album, setAlbum] = useState<AlbumMutation>({
    title: '',
    image: null,
    release: '',
    author: '',
  });
  const artists = useAppSelector(selectArtists);
  const [imageData, setImageData] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (artists.length === 0) {
      dispatch(getAllArtists());
    }
  }, [artists, dispatch]);

  const changeAlbumFields = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setAlbum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const activateInput = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setImageData(URL.createObjectURL(files[0]));
      setAlbum((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setImageData('');
  };

  const clearFields = () => {
    setAlbum({
      title: '',
      image: null,
      author: '',
      release: '',
    });
    setImageData('');
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createAlbum(album)).unwrap();
    clearFields();
  };

  return (
    <form onSubmit={handleCreate} className="w-full flex flex-col gap-y-3">
      <div className="w-full items-center grid grid-cols-2">
        <p className="capitalize">title:</p>
        <input
          type="text"
          name="title"
          className="bg-gray-50 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={album.title}
          onChange={changeAlbumFields}
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <p className="capitalize">image:</p>
        <input
          className="hidden"
          type="file"
          name="image"
          onChange={fileInputChangeHandler}
          ref={imageRef}
          required
        />
        {imageData ? (
          <div className="relative">
            <img
              className="max-h-[250px] w-full object-contain"
              src={imageData}
              alt="preview"
            />
            <button
              onClick={clearImageField}
              className="bg-[#1ed760] text-center items-center absolute top-[5px] right-[10px] py-[2px] px-[8px] rounded-[50%]"
            >
              x
            </button>
          </div>
        ) : (
          <button
            className="border border-dashed p-1 capitalize"
            type="button"
            onClick={activateInput}
          >
            browse
          </button>
        )}
      </div>
      <div className="grid grid-cols-2">
        <p className="capitalize">release:</p>
        <input
          type="text"
          name="release"
          className="bg-gray-50 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={album.release}
          onChange={changeAlbumFields}
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <p className="capitalize">author:</p>
        <select
          name="author"
          value={album.author}
          onChange={changeAlbumFields}
          className="bg-gray-800 p-2 rounded-[5px]"
          required
        >
          <option value="">choose author</option>
          {artists.map((artist) => (
            <option className="text-white" value={artist._id}>
              {artist.name}
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

export default AlbumForm;
