import { useAppSelector } from '../../app/hooks';
import { selectArtists } from '../../store/artists/artistsSlice';
import CardItem from './cardItem';

const Cards = () => {
  const artists = useAppSelector(selectArtists);

  return (
    <div className="grid grid-cols-7 gap-[24px] min-w-[372px] my-[10px]">
      {artists.map((artist) => (
        <CardItem artist={artist} />
      ))}
    </div>
  );
};

export default Cards;
