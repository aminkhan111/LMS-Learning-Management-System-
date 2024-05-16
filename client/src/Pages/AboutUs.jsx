import AboutMainImage from "../Assets/Images/AboutMainImage.png";
import { celebrities } from "../Constants/CelebrityData";
import CarouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {



  return (
    <HomeLayout>
      <div className="flex flex-col text-white pl-20 pt-20">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>
          <div className="w-1/2">
            <img
              className="drop-shadow-2xl"
              alt="about main page"
              src={AboutMainImage}
            />
          </div>
        </div>
 
        <div className="carousel w-1/2 my-16 m-auto">

{celebrities && celebrities.map(celebrity => (< CarouselSlide
 {...celebrity}
 key={celebrity.slideNumber} 
 totalSlide={celebrities.length}
  />))}

           
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
