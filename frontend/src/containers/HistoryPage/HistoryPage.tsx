import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTracksHistory } from '../../store/tracks/tracksHistoryThunk';
import { selectTracks } from '../../store/tracks/tracksSlice';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const tracks = useAppSelector(selectTracks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTracksHistory());
  }, [dispatch]);

  useEffect(() => {
    if (
      !JSON.parse(localStorage.getItem('persist:store:users') as string).user
    ) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="mt-[10px] bg-gradient-to-b from-indigo-500 from-5% via-5% to-55% px-[20px] pt-[80px] pb-[20px] rounded-[8px]">
      <h4 className="text-3xl font-bold">History Tracks</h4>
      <div className="flex flex-col gap-y-3 my-[20px]">
        {tracks.map((track) => (
          <div>
            <p>{track.track.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
