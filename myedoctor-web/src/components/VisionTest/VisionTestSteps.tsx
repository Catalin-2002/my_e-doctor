import { useEffect } from 'react';
import { useState } from 'react';
import TextInput from '../TextInput/TextInput';
import axios from 'axios';

const TEST_STEPS: string[] = [];

interface VisionTestStepsProps {
  userId: string;
  baseUrl: string;
}

const VisionTestSteps: React.FC<VisionTestStepsProps> = ({ userId, baseUrl }) => {
  const [character, setCharacter] = useState('');
  const [userInput, setUserInput] = useState('');

  const createTest = async () => {
    try {
      const response = await axios.post(`${baseUrl}/snellen_test/start-test`, { userId });
      if (response.status === 200) {
        const test_id = response.data.testID;
        setTestID(test_id);
        console.log(`Test created with ID ${test_id}`);
        // Call additional functions here if needed, like start_send_image_thread
      } else {
        console.error('Error creating test');
      }
    } catch (error) {
      console.error('Error creating test', error);
    }
  };

  const getCharacter = async () => {
    try {
      const testId = TEST_STEPS[0];
      console.log(`Test ID: ${testId}`);
      const response = await axios.get(`${baseUrl}/snellen_test/get-next-level-characters`, { params: { testId } });
      if (response.status === 200) {
        const character = response.data.character;
        setCharacter(character);
        console.log(`Character received: ${character}`);
      } else {
        console.error('Error getting character');
      }
    } catch (error) {
      console.error('Error getting character', error);
    }
  };

  const setTestID = (test_id: string) => {
    TEST_STEPS.push(test_id);
  };

  useEffect(() => {
    createTest();
    getCharacter();
    validateInput();
  }, [userInput, character]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const validateInput = () => {
    if (userInput === character) {
      console.log('correct');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center">
        <span className="">VISION TEST</span>
        <div>{character}</div>
        <TextInput name="userInput" type="text" value={userInput} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default VisionTestSteps;
