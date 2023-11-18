import Loader from '../Loader/Loader';

interface LoaderModalProps {
  text?: string;
}

const LoaderModal = ({ text }: LoaderModalProps) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-white">
        <div className="m-auto flex max-w-[400px] flex-col items-center">
          <Loader size={50} className="mb-4 stroke-blue-500" />
          <div className="text-md text-center font-light">{text || 'Finding the best match...'}</div>
        </div>
      </div>
    </>
  );
};

export default LoaderModal;
