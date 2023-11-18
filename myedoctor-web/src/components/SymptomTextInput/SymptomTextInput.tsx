import { useState } from 'react';
import TextInput from '../TextInput/TextInput';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twMerge } from 'tailwind-merge';

interface SymptomTextInputProps {
  onTrigger: (investigationText: string) => void;
}

const SymptomTextInput = ({ onTrigger }: SymptomTextInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const isTriggerDisabled = inputValue === '';

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const triggerInvestigation = async () => {
    if (isTriggerDisabled) return;

    onTrigger(inputValue);
  };

  return (
    <div className="mb-6 w-full">
      <TextInput
        name="investigationText"
        value={inputValue}
        onChange={handleChange}
        placeholder="What concerns you?"
        sufixEl={() => (
          <FontAwesomeIcon
            onClick={triggerInvestigation}
            icon={faCircleRight}
            className={twMerge('top-2 text-[24px]', isTriggerDisabled ? 'text-gray-400' : 'cursor-pointer text-blue-600')}
          />
        )}
        className="justify-center"
        sufixClassname="top-1.5 right-3"
        inputClassname="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
      />
    </div>
  );
};

export default SymptomTextInput;
