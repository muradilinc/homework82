import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="container mx-auto py-5">{children}</main>
    </>
  );
};

export default Layout;
