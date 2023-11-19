import React from 'react';
import TextInput from '../TextInput/TextInput';
import { useZodForm } from '@/src/hooks/useZodForm';
import { userSchema } from '@/src/schemas/user';
import useUser from '@/src/hooks/useUser';
import UserPicture from '../UserPicture/UserPicture';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { getOccupations } from '@/src/utils/queries/occupations';
import Form from '../Form/Form';

const UserProfile = () => {
  const { user, isLoading, isUpdateLoading, updateUser } = useUser();
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

  if (!user) return null;

  const triggerUserUpdate = (data: typeof userSchema._type) => {
    updateUser({ ...data, userId: user?.userId! });
  };

  const { isValid } = form.formState;

  return (
    <div className="flex min-h-screen w-full gap-5 p-10 pl-20">
      <UserPicture className="shrink-0" />
      <Form onSubmit={triggerUserUpdate} form={form} className="flex max-w-[700px] flex-col gap-4 p-4">
        <p className="mb-5 text-lg font-medium">Please, complete the following form with your personal details.</p>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <TextInput
            readOnly
            type="email"
            placeholder="Email"
            {...form.register('email')}
            inputClassname="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <TextInput
            type="text"
            {...form.register('firstName')}
            placeholder="Last Name"
            inputClassname="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
            First Name
          </label>
          <TextInput
            placeholder="First Name"
            type="text"
            {...form.register('lastName')}
            inputClassname="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="occupation" className="text-sm font-medium text-gray-700">
            Occupation
          </label>
          <select
            id="occupation"
            placeholder="Select an ocuppation"
            className="mt-1 block h-[38px] w-1/2 cursor-pointer rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...form.register('occupation')}
          >
            {occupations?.map((occupation: string) => (
              <option value={occupation} key={occupation} className="cursor-pointer">
                {occupation}
              </option>
            ))}
          </select>
        </div>
        <Button disabled={!isValid} type="submit" intent="secondary" className={!isValid ? 'opacity-25' : ''}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;
