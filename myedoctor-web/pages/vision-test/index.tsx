import { getLayout } from '@/src/components/Layout/Layout';
import PermissionDenied from '@/src/components/PermissionDenied/PermissionDenied';
import VisionTest from '@/src/components/VisionTest/VisionTest';
import WebcamStreamCapture from '@/src/components/WebCamStreamCapture/WebCamStreamCapture';
import { redirectUnauthenticated } from '@/src/helpers/session';
import usePermissions from '@/src/hooks/usePermissions';
import { GetServerSidePropsContext } from 'next/types';

const VisionTestPage = () => {
  const { hasWebcamPermissions } = usePermissions();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-10">
      <VisionTest />
      {hasWebcamPermissions ? (
        <div className="absolute bottom-2 right-5 flex flex-col items-center gap-5 text-center">
          <WebcamStreamCapture />
        </div>
      ) : (
        <PermissionDenied resource="webcam" />
      )}
    </div>
  );
};

VisionTestPage.getLayout = getLayout;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const redirect = await redirectUnauthenticated(context);

  if (redirect) return redirect;

  return {
    props: {
      title: 'My E-Doctor - Vision Test',
    },
  };
};

export default VisionTestPage;
