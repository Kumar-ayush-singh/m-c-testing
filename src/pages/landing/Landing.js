import "./style.css";
import Section1 from "./landingSections/section_1";
import Navbar from "../../components/helper/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar/>
      <div>
        <Section1 class="section"/>
        {/* <VideoSection class="section"/> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Landing;
