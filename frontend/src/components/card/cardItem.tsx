import React from 'react';
import { Artist } from '../../type';
import { BASE_URL } from '../../constants/link';

interface Props {
  artist: Artist;
}

const CardItem: React.FC<Props> = ({ artist }) => {
  return (
    <div className="flex flex-col gap-y-[16px] p-[16px] bg-[#181818] rounded-[8px] hover:bg-[#282828]">
      <img
        className="rounded-[50%]"
        src={`${BASE_URL}/${artist.picture}`}
        alt="ArtistImage"
      />
      <div className="min-h-[60px]">
        <h4 className="font-bold text-white text-base">{artist.name}</h4>
        <p className="text-[#6a6a6a] text-sm">Performer</p>
      </div>
    </div>
  );
};

export default CardItem;
