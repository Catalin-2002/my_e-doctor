import Link from 'next/link';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import useSession from '@/src/hooks/useSession';
import { useRouter } from 'next/router';

const SideMenu = () => {
  const { signOut } = useSession();

  const router = useRouter();

  return (
    <div className="flex min-h-[100vh] w-[328px] flex-col justify-between bg-gray-800 p-4 pb-8 font-medium text-white">
      <div className="flex flex-col gap-2">
        <div className="mb-2 border-b-[1px]">
          <Button onClick={() => router.push('/investigate')} intent="tertiary" className="w-full justify-between px-2 text-sm">
            <span>Find information</span>
            <FontAwesomeIcon className="text-[18px]" icon={faCircleQuestion} />
          </Button>
        </div>
        <Link href="/profile">Profile</Link>
        <Link href="/history">History</Link>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={signOut} intent="text" className="text-md justify-start">
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
