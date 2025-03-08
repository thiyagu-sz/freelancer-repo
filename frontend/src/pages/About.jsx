import React from 'react';
import { assets } from '../assets/assets';


const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">INNOVATEMATE</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px] rounded-lg"
          src={assets.about_image}
          alt="InnovateMate Preview"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to <b>InnovateMate</b>, the ultimate platform for fostering collaboration, innovation, and teamwork. InnovateMate connects students, entrepreneurs, sponsors, and mentors to bring innovative ideas to life.
          </p>
          <p>
            With InnovateMate, users can find team members, sponsors, and technical guides for startups and academic projects. Whether you’re looking for a co-founder or technical expertise, our platform bridges the gap between ambition and execution.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At InnovateMate, our mission is to empower individuals with the resources, networks, and tools needed to transform ideas into successful projects. We aim to create an environment where collaboration and innovation thrive.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl my-4 text-center">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE INNOVATEMATE</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>COLLABORATION:</b>
          <p>
            Seamlessly connect with like-minded individuals and bring your ideas to life.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined tools for project posting, team-building, and collaboration.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>TRUST:</b>
          <p>
            A secure and verified platform for building meaningful professional relationships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
