export default function FormLabelDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="font-satoshi-medium text-base text-black/50">
      {children}
    </span>
  );
}
