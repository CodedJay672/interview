const Header = () => {
  return (
    <header className="w-full px-6 lg:px-10 py-6 lg:py-10 flex justify-center items-center flex-col gap-1">
      <img
        src="/vite.svg"
        width={60}
        height={60}
        className="stroke-foreground invert"
      />
      <h1 className="text-accent text-3xl lg:text-4xl">The Weather App</h1>
    </header>
  );
};

export default Header;
