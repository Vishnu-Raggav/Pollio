export default function FormLabel({ children }: { children: string }) {
  return (
    <span className="font-satoshi-bold text-2xl max-md:text-xl">
      {children}
    </span>
  );
}
