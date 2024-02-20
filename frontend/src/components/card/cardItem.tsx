import React from 'react';
import { Album, Artist } from '../../type';
import { BASE_URL } from '../../constants/link';
import dayjs from 'dayjs';

interface Props {
  item: Artist | Album;
}

const CardItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="flex flex-col gap-y-[16px] p-[16px] bg-[#181818] rounded-[8px] hover:bg-[#282828]">
      <img
        className={'picture' in item ? 'rounded-[50%]' : 'rounded-[5px]'}
        src={`${BASE_URL}/${'picture' in item ? item.picture : item.image}`}
        alt="ArtistImage"
      />
      <div className="min-h-[60px]">
        <h4 className="font-bold text-white text-base">
          {'name' in item ? item.name : item.title}
        </h4>
        <p className="text-[#6a6a6a] text-sm">
          {'name' in item ? 'Performer' : dayjs(item.release).format('YYYY')}
          {'tracks' in item ? (
            <span className="ml-[5px]">Track: {item.tracks.length}</span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default CardItem;
