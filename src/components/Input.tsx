type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="font-satoshi-medium text-md w-full rounded-lg border-2 border-black/25 px-4 py-2 focus:outline-1 focus:outline-black/25 focus:bg-white"
    />
  );
}
