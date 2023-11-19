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
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            triggerInvestigation();
          }
        }}
        sufixEl={() => (
          <FontAwesomeIcon
            onClick={triggerInvestigation}
            icon={faCircleRight}
            className={twMerge('top-2 text-[24px]', isTriggerDisabled ? 'text-gray-400' : 'cursor-pointer text-blue-600')}
          />
        )}
        className="justify-center"
        sufixClassname="top-1.5 right-3"
      />
    </div>
  );
};

export default SymptomTextInput;
