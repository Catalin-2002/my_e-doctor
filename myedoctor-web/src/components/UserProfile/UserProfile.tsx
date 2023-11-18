import React, { useState } from 'react';
import TextInput from '../TextInput/TextInput';
const userData = {
  name: 'Radu Mihai',
  email: 'radumihai@XXX.com',
  // profilePicture: '/path/to/profile-picture.jpg'
};
const UserProfile: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-prussian-blue">
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-prussian-white">
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-semibold text-neon-green">Welcome to MyE-Doctor, User!</h2>
          <p className="mb-5 text-lg">Please, complete the following form with your personal details:</p>

          <div className="mb-4">
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <TextInput
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
              First Name
            </label>
            <TextInput
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
              Location
            </label>
            <TextInput
              id="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="mb-1 block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <TextInput
              id="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="occupation" className="mb-1 block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <select
              id="occupation"
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select Occupation</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              {/* ... alte opțiuni */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
