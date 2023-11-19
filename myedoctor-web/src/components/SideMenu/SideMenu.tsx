import Link from 'next/link';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import useSession from '@/src/hooks/useSession';
import { useRouter } from 'next/router';
import { faArrowLeftLong, faArrowRightLong, faArrowUpRightFromSquare, faHeartPulse } from '@fortawesome/free-solid-svg-icons';

const SideMenu = () => {
  const { signOut } = useSession();

  const router = useRouter();

  return (
    <div className="flex min-h-[100vh] w-[346px] flex-col gap-6 bg-gray-800 p-4 pb-8 pt-6 font-medium text-white">
      <div className="flex flex-col gap-2 border-b-[0.5px] pb-4">
        <div className="mb-4 border-b-[1px]">
          <Button onClick={() => router.push('/investigate')} intent="tertiary" className="w-full justify-between px-2 text-sm">
            <span>Make an enquiry</span>
            <FontAwesomeIcon className="text-[18px]" icon={faHeartPulse} />
          </Button>
        </div>
        <Link className="text-lg" href="/profile">
          Profile
        </Link>
        <Link className="text-lg" href="/history">
          History
        </Link>
      </div>
      <Button onClick={signOut} intent="text" className="justify-start self-start text-lg">
        Sign out
      </Button>
    </div>
  );
};

export default SideMenu;
