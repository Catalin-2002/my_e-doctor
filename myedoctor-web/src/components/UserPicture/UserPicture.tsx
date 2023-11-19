import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { twMerge } from 'tailwind-merge';
import useUser from '@/src/hooks/useUser';

interface UserPictureProps {
  className?: string;
  iconClassName?: string;
}

const UserPicture = ({ className = '', iconClassName = '' }: UserPictureProps) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div
      className={twMerge(
        'relative flex h-[200px] w-[200px]  items-center justify-center rounded-full bg-prussian-blue',
        className
      )}
    >
      {user.imageLocation ? (
        <Image src={user.imageLocation} alt="user-image" className="h-full w-full rounded-full" fill />
      ) : (
        <FontAwesomeIcon icon={faUser} className={twMerge('m-auto text-[74px] text-white', iconClassName)} />
      )}
    </div>
  );
};

export default UserPicture;
