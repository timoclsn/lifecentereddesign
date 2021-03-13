import Favicons from "@/components/Favicons";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";

export default function Layout({ children }) {
  return (
    <>
      <SEO />
      <Favicons />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
