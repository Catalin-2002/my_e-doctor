interface PermissionDeniedProps {
  resource: string;
}

const PermissionDenied = ({ resource }: PermissionDeniedProps) => {
  return (
    <div className="m-auto max-w-[500px] rounded-xl bg-red-200 p-4 text-center text-3xl font-medium text-red-800">
      Unable to access {resource}. Please make sure you update all site permissions.
    </div>
  );
};

export default PermissionDenied;
