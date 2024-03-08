import { useEffect, useState } from 'react';
import ArtistForm from '../../components/Forms/ArtistForm';
import AlbumForm from '../../components/Forms/AlbumForm';
import TrackForm from '../../components/Forms/TrackForm';

const NewPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setActiveTab(JSON.parse(localStorage.getItem('tab') || '{}'));
  }, []);

  const selectTab = (tab: number) => {
    localStorage.setItem('tab', JSON.stringify(tab));
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="grid grid-cols-1 bg-[#121212] w-[60%] p-[20px] rounded-[5px]">
        <div className="mb-4 ">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="me-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 rounded-t-lg"
                type="button"
                onClick={() => selectTab(1)}
              >
                Artist
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                type="button"
                onClick={() => selectTab(2)}
              >
                Album
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                type="button"
                onClick={() => selectTab(3)}
              >
                Track
              </button>
            </li>
          </ul>
        </div>
        {activeTab === 1 ? (
          <ArtistForm />
        ) : activeTab === 2 ? (
          <AlbumForm />
        ) : (
          <TrackForm />
        )}
      </div>
    </div>
  );
};

export default NewPage;
