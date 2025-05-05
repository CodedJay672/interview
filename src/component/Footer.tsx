const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center p-6 border-t border-foreground">
      <span className="text-accent font-light text-sm">
        copywrite &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
