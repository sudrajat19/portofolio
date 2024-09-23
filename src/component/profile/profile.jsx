import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logoNextJs from "../../assets/gambar/nextjs.png";
import logoReactJs from "../../assets/gambar/react.png";
import logoTailwindcss from "../../assets/gambar/tailwind.png";
import logoMysql from "../../assets/gambar/mysql.png";
import logoWa1 from "../../assets/gambar/wa1.png";
import logoIg from "../../assets/gambar/instagram.png";

export default function Profile() {
  const { id = "1" } = useParams();
  const [users, setUsers] = useState({
    id_users: null,
    nama: "",
    password: "",
    photo: null,
    photoUrl: null,
    deskripsi: "",
    profesi: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/showusers/${id}`;
        const response = await axios.get(url);
        setUsers(response.data.values[0]);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div
        id="resume"
        className="bg-brand-500 text-slate-100 grid grid-cols-2 sm:grid-cols-2 capitalize"
      >
        <div className="pt-[138px] pl-[112px]">
          <p className="text-secondary-500">Hi, {users.nama} Here</p>
          <div className="lg:desktop-h1 desktop-h2">
            <h1 className="text-slate-100">Web Developer.</h1>
            <h1 className="text-slate-300">Based in Indonesia</h1>
          </div>
          <p className="my-[24px] text-lg-normal text-slate-300">
            {users.deskripsi}
          </p>
          <div>
            <p className="text-secondary-500">
              The technology Im currently using:
            </p>
            <ul className="flex gap-6 mt-3">
              <Image />
            </ul>
          </div>
          <div className="md:flex hidden mt-[80px] w-[264px] sm:w-full">
            <button className="bg-secondary-500 text-brand-500 py-[10px] px-[16px] w-[200px] rounded-lg h-[44px] text-base-medium">
              <a href="https://api.whatsapp.com/send/?phone=6285946652309&text&type=phone_number&app_absent=0">
                Hire me! <img className="inline w-4 h-4" src={logoWa1} alt="" />
              </a>
            </button>
            <img className="my-[6px] ml-4" src={logoIg} alt="error" />
          </div>
        </div>
        <div className="ml-[69px] mt-[55px] mr-[166px]">
          <div>
            <img
              src={"http://localhost:3000/"+users.photo}
              className="max-w-[175px] max-h-[175px] md:max-w-[324px] md:max-h-[324px] pt-[50px] lg:hidden rounded-lg"
              alt="error"
            />
          </div>
          <img
            src={"http://localhost:3000/"+users.photo}
            className="w-full h-full hidden lg:block"
            alt="error"
          />
        </div>
        <div className="flex col-span-2 md:hidden px-[112px] mt-[80px] w-full">
          <button className="bg-secondary-500 text-brand-500 py-[10px] px-[16px] w-full rounded-lg h-[44px] text-base-medium">
            Hire me! <img className="inline w-4 h-4" src={logoWa1} alt="" />
          </button>
          <img className="my-4 ml-4 w-4 h-4" src={logoIg} alt="error" />
        </div>
      </div>
    </>
  );
}

function Image() {
  const paths = [
    { src: logoNextJs },
    { src: logoReactJs },
    { src: logoTailwindcss },
    { src: logoMysql },
  ];
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
