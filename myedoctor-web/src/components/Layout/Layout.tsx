import React, { PropsWithChildren, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SideMenu from '../SideMenu/SideMenu';

type LayoutProps = {
  title?: string;
};

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  const { pathname } = useRouter();

  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <div className="flex flex-col justify-between">
        <div className="flex h-full w-full grow">
          {pathname !== '/' && <SideMenu />}
          <div className="flex w-full grow">{children}</div>
        </div>
      </div>
    </>
  );
};

type getLayoutProps = ReactNode & { props: LayoutProps };

export const getLayout = (page: getLayoutProps): JSX.Element => {
  return <Layout title={page.props.title}>{page}</Layout>;
};

export default Layout;
