import type { ReactNode } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-screen w-full bg-bg flex justify-center items-center gap-6  flex-col">
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default RootLayout;
