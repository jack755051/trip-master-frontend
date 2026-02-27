export default function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
      {message}
    </div>
  );
}
