import errorIcon from '../../../assets/icons/icon-error.svg';

export default function ErrorMessage({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <p className="flex items-center gap-100 text-red-500">
      {errorIcon && <img src={errorIcon} alt="" />}
      <span>{errorMessage}</span>
    </p>
  );
}
