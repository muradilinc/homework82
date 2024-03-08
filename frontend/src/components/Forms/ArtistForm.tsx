import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { ArtistMutation } from '../../type';
import { useAppDispatch } from '../../app/hooks';
import { createArtist } from '../../store/artists/artistsThunk';

const ArtistForm = () => {
  const [artist, setArtist] = useState<ArtistMutation>({
    name: '',
    picture: null,
    description: '',
  });
  const [imageData, setImageData] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const changeArtistFields = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setArtist((prevState) => ({
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
      setArtist((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setImageData('');
  };

  const clearFields = () => {
    setArtist({
      name: '',
      picture: null,
      description: '',
    });
    setImageData('');
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createArtist(artist)).unwrap();
    clearFields();
  };

  return (
    <form onSubmit={handleCreate} className="w-full flex flex-col gap-y-3">
      <div className="w-full items-center grid grid-cols-2">
        <p className="capitalize">name:</p>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={artist.name}
          onChange={changeArtistFields}
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <p className="capitalize">picture:</p>
        <input
          className="hidden"
          type="file"
          name="picture"
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
        <p className="capitalize">description</p>
        <textarea
          name="description"
          className="outline-0 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          cols={30}
          rows={10}
          value={artist.description}
          onChange={changeArtistFields}
        />
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

export default ArtistForm;
