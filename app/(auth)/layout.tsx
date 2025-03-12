export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl flex justify-center items-center w-full">{children}</div>
  );
}
