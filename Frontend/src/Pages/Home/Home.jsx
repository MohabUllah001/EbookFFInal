import Hero from "./Component/Hero";
import Category from "./Component/Category";
import TopSell from "./Component/TopSell";
import HotSell from "./Component/HotSell";
import FeaturesBar from "./Component/FeaturesBar";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturesBar/>
      <Category />
      <TopSell />
      <HotSell />
    </>
  );
};

export default Home;
