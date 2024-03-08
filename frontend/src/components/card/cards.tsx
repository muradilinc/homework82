import React from 'react';
import CardItem from './cardItem';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { Album, Artist, Routes } from '../../type';

interface Props {
  route: keyof Routes;
  data: Artist[] | Album[];
}

const Cards: React.FC<Props> = ({ data, route }) => {
  return (
    <div className="grid grid-cols-7 gap-[24px] min-w-[372px] my-[10px]">
      {data.map((item) => (
        <>
          {!item.isPublished ? (
            <Link to={routes[route] + '/' + item._id} key={item._id}>
              <CardItem item={item} />
            </Link>
          ) : null}
        </>
      ))}
    </div>
  );
};

export default Cards;
