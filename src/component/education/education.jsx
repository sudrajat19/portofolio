import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Education() {
  const { id = "1" } = useParams();
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/showeducation/${id}`;
        const response = await axios.get(url);
        setEducations(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div id="education" className="bg-brand-500 text-slate-100 px-4 sm:px-8 md:px-16 lg:px-[112px] pt-20 md:pt-[240px]">
      <div className="flex mb-6">
        <h1 className="text-2xl md:text-3xl lg:desktop-h2 text-secondary-500 w-1/2">
          Education
        </h1>
        <div className="line mt-5"></div>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-1 ">
        <Schools educations={educations}/>
      </div>
    </div>
  );
}

function Schools({educations}) {
  return (
    <>
      {educations.map((school,index) => (
        <div
          key={index}
          className="grid grid-cols-1 text-slate-100 mb-6 capitalize"
        >
          <div className="border-l-2 md:grid md:grid-cols-2 border-solid md:gap-4 border-brand-400 p-4 md:pl-5 h-full w-full">
            <div>
              <h1 className="text-lg text-base-bold">
                {school.nama_sekolah}
              </h1>
              <p className="text-slate-300 text-sm md:text-sm-italic">
                {school.jurusan}
              </p>
            </div>
              <p className="text-base-normal  mt-2 md:mt-0 ">
                {school.tahun_mulai} - {school.tahun_akhir}
              </p>
          </div>
        </div>
      ))}
    </>
  );
}
