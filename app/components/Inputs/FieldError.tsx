const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="mt-1 text-sm text-red-500" role="alert">
      {message}
    </p>
  ) : null;

export default FieldError;
