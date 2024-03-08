import React from 'react';
import { Album, Artist } from '../../type';
import { BASE_URL } from '../../constants/link';
import { useAppSelector } from '../../app/hooks';
import { selectAllLoading } from '../../store/artists/artistsSlice';
import CardSkeleton from '../Spinner/CardSkeleton';
import { selectGetAlbumLoading } from '../../store/albums/albumsSlice';
import { selectUser } from '../../store/users/usersSlice';

interface Props {
  item: Artist | Album;
}

const CardItem: React.FC<Props> = ({ item }) => {
  const loadingArtist = useAppSelector(selectAllLoading);
  const loadingAlbum = useAppSelector(selectGetAlbumLoading);
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-col gap-y-[16px] p-[16px] bg-[#181818] min-h-[261px] rounded-[8px] hover:bg-[#282828]">
      {loadingAlbum || loadingArtist ? (
        <CardSkeleton />
      ) : (
        <div className="relative">
          {!item.isPublished && item.user === user?._id ? (
            <div className="absolute right-[-10px] top-[-5px]">
              <p className="bg-red-400 text-center px-[5px] rounded-[5px]">
                unpublished
              </p>
            </div>
          ) : null}
          <img
            className={
              'picture' in item
                ? 'rounded-[50%] w-[151px] h-[151px]'
                : 'rounded-[5px] w-[151px] h-[151px]'
            }
            src={`${BASE_URL}/${'picture' in item ? item.picture : item.image}`}
            alt="ArtistImage"
          />
          <div className="min-h-[60px]">
            <h4 className="font-bold text-white text-base truncate">
              {'name' in item ? item.name : item.title}
            </h4>
            <p className="text-[#6a6a6a] text-sm">
              {'name' in item ? 'Performer' : item.release}
              {'tracks' in item ? (
                <span className="ml-[5px]">Tracks: {item.tracks.length}</span>
              ) : null}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
