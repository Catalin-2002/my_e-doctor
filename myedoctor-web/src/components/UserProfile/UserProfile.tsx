import React from 'react';
import TextInput from '../TextInput/TextInput';
import { useZodForm } from '@/src/hooks/useZodForm';
import { userSchema } from '@/src/schemas/user';
import useUser from '@/src/hooks/useUser';

import { updateUser } from '@/src/utils/queries/user';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { getOccupations } from '@/src/utils/queries/occupations';
import Form from '../Form/Form';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';

const UserProfile: React.FC = () => {
  const { user, isLoading, isUpdateLoading } = useUser();
  const { data: occupations, isLoading: occupationsLoading } = useQuery({
    queryKey: ['occupations'],
    queryFn: () => getOccupations(),
    refetchOnWindowFocus: false,
  });

  const form = useZodForm({
    schema: userSchema,
    mode: 'onChange',
    defaultValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      dateOfBirth: user?.dateOfBirth || Date.now(),
      occupation: user?.occupationField,
    },
  });

  if (isLoading || occupationsLoading || isUpdateLoading) {
    return (
      <div className="m-auto flex min-h-screen items-center justify-center">
        <Loader color="blue" className="m-auto" size={98} />
      </div>
    );
  }

  // if (!user) return null;

  const triggerUserUpdate = (data: typeof userSchema._type) => {
    updateUser({ ...data, userId: user?.userId || '' });
    // TODO: add location field to current location
  };

  const { isValid } = form.formState;

  return (
    <div className="flex min-h-screen w-full gap-5 bg-gradient-to-r from-white to-prussian-blue p-10">
      {
        <div className="relative flex h-[200px] min-w-[200px] items-center justify-center rounded-full bg-prussian-blue">
          {user.imageLocation ? (
            <Image src={user.imageLocation} alt="user-image" className="h-full w-full rounded-full" fill />
          ) : (
            <FontAwesomeIcon icon={faUser} className="text-[74px] text-white" />
          )}
        </div>
      }
      <Form
        form={form}
        onSubmit={(data) => triggerUserUpdate(data)}
        className="flex flex-col gap-4 rounded-lg  bg-white bg-opacity-50 p-4 shadow-md"
      >
        <h2 className="text-center text-3xl font-semibold text-prussian-blue">
          Please, fill in the fields with your personal details:
        </h2>

        <div className="mt-5 flex gap-4">
          <div className="w-1/4">
            <label htmlFor="lastName" className="text-lg font-medium text-gray-700">
              Last Name
            </label>
            <TextInput
              type="text"
              {...form.register('lastName')}
              placeholder="Last Name"
              inputClassname="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="w-1/4">
            <label htmlFor="firstName" className="text-lg font-medium text-gray-700">
              First Name
            </label>
            <TextInput
              placeholder="First Name"
              type="text"
              {...form.register('firstName')}
              inputClassname="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-lg font-medium text-gray-700">
            Email
          </label>
          <TextInput
            readOnly
            type="email"
            placeholder="firstname.lastname@example.com"
            {...form.register('email')}
            inputClassname="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="text-lg font-medium text-gray-700">
            Date of Birth
          </label>
          <TextInput
            type="date"
            {...form.register('dateOfBirth')}
            inputClassname="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="text-lg font-medium text-gray-700">
            Occupation
          </label>
          <select
            id="occupation"
            placeholder="Select an ocuppation"
            className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...form.register('occupation')}
          >
            {occupations?.map((occupation) => (
              <option value={occupation} key={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="rounded-md bg-prussian-blue px-5 py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save your personal details
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
