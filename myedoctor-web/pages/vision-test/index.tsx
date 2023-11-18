import { getLayout } from '@/src/components/Layout/Layout';
import PermissionDenied from '@/src/components/PermissionDenied/PermissionDenied';
import VisionTestSteps from '@/src/components/VisionTest/VisionTestSteps';
import WebcamStreamCapture from '@/src/components/WebCamStreamCapture/WebCamStreamCapture';
import { redirectUnauthenticated } from '@/src/helpers/session';
import usePermissions from '@/src/hooks/usePermissions';
import { GetServerSidePropsContext } from 'next/types';

const VisionTestPage = () => {
  const { hasWebcamPermissions } = usePermissions();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <VisionTestSteps />
      {hasWebcamPermissions ? (
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="text-3xl">Calibrating...</span>
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
      title: 'MyeDoctor - Vision Test',
    },
  };
};

export default VisionTestPage;
