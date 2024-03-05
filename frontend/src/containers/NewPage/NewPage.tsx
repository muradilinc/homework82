import { ChangeEvent, useRef, useState } from 'react';
import { ArtistMutation } from '../../type';

const NewPage = () => {
  const [artist, setArtist] = useState<ArtistMutation>({
    name: '',
    pictures: null,
    description: '',
  });
  const [filename, setFilename] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);

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
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    }
    if (files) {
      setArtist((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <div>
      <form>
        <div>
          <p>Name:</p>
          <input
            type="text"
            value={artist.name}
            onChange={changeArtistFields}
            required
          />
        </div>
        <div>
          <p>Pictures:</p>
          <input
            className="hidden"
            type="file"
            name="image"
            onChange={fileInputChangeHandler}
            ref={imageRef}
            required
          />
          <div>
            <input type="text" value={filename} onClick={activateInput} />
            <button onClick={activateInput}>browse</button>
          </div>
        </div>
        <div>
          <p>description</p>
          <textarea
            name="description"
            cols={30}
            rows={10}
            value={artist.name}
            onChange={changeArtistFields}
          />
        </div>
      </form>
    </div>
  );
};

export default NewPage;
