const Suggestions = () => {
  return (
    <div className=" mb-[-150px] flex max-w-[600px] flex-col gap-2 rounded-lg border-[0.5px] border-gray-300 p-5 text-start text-sm">
      <span className="text-base font-medium">
        Don&#39;t know what to ask about? Here are some sample questions to help you get an idea.
      </span>
      <ul>
        <li>What could be causing persistent headaches and fatigue?</li>
        <li>Is there a common explanation for sudden weight loss and increased thirst?</li>
        <li>What might be the underlying issue if I&#39;m experiencing chest pain and shortness of breath?</li>
      </ul>
    </div>
  );
};

export default Suggestions;
