export const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main">
      <div className="inner">{children}</div>
    </main>
  );
};
