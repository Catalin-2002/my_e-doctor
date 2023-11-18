import React from 'react';
import TextInput from '../TextInput/TextInput';
import { useZodForm } from '@/src/hooks/useZodForm';
import { userSchema } from '@/src/schemas/user';
import useUser from '@/src/hooks/useUser';
import { Form } from 'react-hook-form';
import { updateUser } from '@/src/utils/queries/user';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { getOccupations } from '@/src/utils/queries/occupations';

const UserProfile: React.FC = () => {
  const { user, isLoading, isUpdateLoading } = useUser();
  const { data: occupations, isLoading: occupationsLoading } = useQuery({
    queryKey: ['occupations'],
    queryFn: () => getOccupations(),
  });

  if (isLoading || occupationsLoading || isUpdateLoading) {
    return (
      <div className="m-auto flex min-h-screen items-center justify-center">
        <Loader color="blue" className="m-auto" size={98} />
      </div>
    );
  }

  if (!user) return null;

  const triggerUserUpdate = (data: typeof userSchema) => {
    updateUser({ ...data, userId: user.userId });
    // TODO: add location field to current location
  };

  const form = useZodForm({
    schema: userSchema,
    mode: 'onChange',
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      dateOfBirth: user?.dateOfBirth || Date.now(),
      occupation: user.occupation as string,
    },
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Form form={form} onSubmit={triggerUserUpdate} className="gap-4 p-4">
        <h2 className="mb-4 text-2xl font-semibold text-neon-green">Welcome to MyE-Doctor, User!</h2>
        <p className="mb-5 text-lg">Please, complete the following form with your personal details:</p>

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
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <TextInput
            readOnly
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            inputClassname="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="mb-1 block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <TextInput
            type="date"
            placeholder="Date of Birth"
            {...form.register('dateOfBirth')}
            inputClassname="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="mb-1 block text-sm font-medium text-gray-700">
            Occupation
          </label>
          <select
            id="occupation"
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...form.register('occupation')}
          >
            {occupations?.map((occupation: string) => (
              <option value={occupation} key={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
