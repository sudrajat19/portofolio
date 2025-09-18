// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
import logoNextJs from "../../assets/gambar/nextjs.png";
import logoReactJs from "../../assets/gambar/react.png";
import logoTailwindcss from "../../assets/gambar/tailwind.png";
import logoWa1 from "../../assets/gambar/wa1.png";
import postgreSql from "../../assets/gambar/postgresql.png";
import logoIg from "../../assets/gambar/instagram.png";
import menobg from "../../assets/gambar/menobg.png";

export default function Profile() {
  return (
    <div>
      <div id="resume" className="  pt-[138px] px-[20px] md:px-[50px] lg:px-[100px]  text-slate-100 md:flex capitalize">
        <div className="   w-full md:max-w-[50%]">
          <p className="text-secondary-500">Hi, Sudrajat Here</p>
          <div className="lg:desktop-h1 desktop-h2">
            <h1 className="text-slate-100">Web Developer.</h1>
            <h1 className="text-slate-300">Based in Indonesia</h1>
          </div>
          <p className="py-[24px] text-lg-normal text-slate-300">{`I'm a web developer based in Indonesia. I have a passion for web development and I'm always looking for new challenges to improve my skills.`}</p>
          <div>
            <p className="text-secondary-500">The technology Im currently using:</p>
            <ul className="flex gap-6 mt-3">
              <Image />
            </ul>
          </div>
          <div className="md:flex hidden gap-4 py-[40px] w-[264px] sm:w-full">
            <button className="bg-secondary-500 text-brand-500 py-[10px] px-[16px] w-[200px] rounded-lg h-[44px] text-base-medium">
              <a href="https://api.whatsapp.com/send/?phone=6285946652309&text&type=phone_number&app_absent=0">
                Hire me! <img className="inline w-4 h-4" src={logoWa1} alt="" />
              </a>
            </button>
            <a className="py-1" href="https://www.instagram.com/sudrajats504/">
              <img src={logoIg} alt="error" />
            </a>
          </div>
        </div>
        <div className="  mx-auto lg:w-[50%] ">
          <div>
            <img src={" ./src/assets/gambar/me.jpg"} className="w-full py-4 md:max-w-[324px] md:max-h-[300px]  lg:hidden rounded-lg" alt="error" />
          </div>
          <img src={menobg} className="w-full h-[75%] hidden lg:block" alt="error" />
        </div>
      </div>
      <div className="flex  md:hidden px-[20px] md:px-[100px]  w-full ">
        <button className="bg-secondary-500 text-brand-500 py-[10px] px-[16px] w-full rounded-lg h-[44px] text-base-medium">
          <a href="https://api.whatsapp.com/send/?phone=6285946652309&text&type=phone_number&app_absent=0">
            Hire me! <img className="inline w-4 h-4" src={logoWa1} alt="" />
          </a>
        </button>
        <a href="https://www.instagram.com/sudrajats504/">
          <img className="my-4 ml-4 w-4 h-4" src={logoIg} alt="error" />
        </a>
      </div>
    </div>
  );
}

function Image() {
  const paths = [{ src: logoNextJs }, { src: logoReactJs }, { src: logoTailwindcss }, { src: postgreSql }];
  return (
    <>
      {paths.map((path, index) => (
        <li key={index}>
          <img className="w-8 h-8" src={path.src} alt="error" />
        </li>
      ))}
    </>
  );
}
