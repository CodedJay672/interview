const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center p-6">
      <span className="text-accent font-light text-sm">
        copyright &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
