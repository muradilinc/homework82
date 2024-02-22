import ContentLoader from 'react-content-loader';

const CardSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={'100%'}
      viewBox="0 0 100 124"
      backgroundColor="#cecece"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="86" rx="5" ry="5" width="90" height="15" />
      <rect x="0" y="2" rx="5" ry="5" width="88" height="78" />
      <rect x="0" y="106" rx="5" ry="5" width="86" height="15" />
    </ContentLoader>
  );
};

export default CardSkeleton;
