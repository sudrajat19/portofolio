import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Skill() {
  const { id = "1" } = useParams();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/showskill/${id}`;
        const response = await axios.get(url);
        setSkills(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      <div id='skill' className="bg-brand-500 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[112px] pt-24 sm:pt-32 md:pt-40 lg:pt-52">
        <div className="flex mb-6">
          <h1 className="text-secondary-500 text-2xl md:text-3xl lg:desktop-h2 w-1/2">Programming Skill</h1>
          <div className="line mt-5 "></div>
        </div>
        <div>
          <LogoSkill skills={skills} />
        </div>
      </div>
    </>
  );
}

function LogoSkill({skills}) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-10 sm:mt-12 md:mt-16 lg:mt-20">
        {skills.map((skill, index) => (
          <img key={index} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" src={`http://localhost:3000/`+skill.gambar} alt="skill logo" />
        ))}
      </div>
    </>
  );
}
