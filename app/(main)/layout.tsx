import ButtonTop from "../components/Buttons/ButtonTop";
import Footer from "../components/Footer/Footer";
import TopElement from "../components/Generics/TopElement";
import BottomNav from "../components/Navigation/BottomNav";
import TopNav from "../components/Navigation/TopNav";
import ContentSpacing from "../components/Spacing/ContentSpacing";
import SideDrawerItems from "./SideDrawerItems";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    <main>
      <Toaster richColors />
      <TopElement />
      <ButtonTop />
      <SideDrawerItems />
      <TopNav />
      <ContentSpacing />
      {children}
      <div className="mt-20">
        <Footer />
      </div>
      <BottomNav />
    </main>
    // </html>
  );
}
