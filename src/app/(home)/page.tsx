import { NewResources } from "@/components/NewResources/NewResources";
import { Newsletter } from "@/components/Newsletter/Newsletter";
import { About } from "./About/About";
import { Header } from "./Header/Header";

const Home = async () => {
  return (
    <>
      <Header />
      <NewResources />
      <Newsletter />
      <About />
    </>
  );
};

export default Home;
