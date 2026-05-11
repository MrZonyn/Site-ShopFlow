type Props = {
  message: string;
};

export function Toast({ message }: Props) {
  return (
    <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-slice-in">
      {message}
    </div>
  );
}
