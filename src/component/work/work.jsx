import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Work() {
  const { id = "1" } = useParams();
  const [work, setWork] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/showwork/${id}`;
        const response = await axios.get(url);
        setWork(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);
  
  const [selectedId, setSelectedId] = useState(null);

  const handleSelected = (id_work) => {
    if (selectedId === id_work) {
      setSelectedId(null);
    } else {
      setSelectedId(id_work);
    }
  };

  const selectedExperience = work.find((exp) => exp.id_work === selectedId);

  return (
    <div id="work" className="bg-brand-500 text-slate-100 px-4 sm:px-8 md:px-16 lg:px-[112px] pt-20 md:pt-[240px]">
      <div className="flex gap-2 mb-6">
        <h1 className="text-2xl md:text-3xl lg:desktop-h2 text-secondary-500 w-1/2">
          Work Experiences
        </h1>
        <div className="line mt-5"></div>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-3">
        <div className="grid grid-cols-3 md:grid-cols-1">
          <Experiences onClick={handleSelected} selectedId={selectedId} work={work} />
        </div>
        <div className="md:col-span-2 capitalize">
          {selectedExperience ? (
            <div className="p-4 border-brand-400">
              <h2 className="text-lg-bold md:text-2xl">{selectedExperience.nama_perusahaan}</h2>
              <p className="text-sm-normal md:text-base text-slate-300">
                {selectedExperience.awal_kerja} - {selectedExperience.akhir_kerja}
              </p>
              <p className="text-sm-normal md:text-base-normal text-slate-300 mt-4 md:mt-8">
                {selectedExperience.deskripsi_perusahaan}
              </p>
            </div>
          ) : (
            <div className="p-4 border-brand-400">
              <h2 className="text-xl md:text-2xl">Welcome to My Work Experience</h2>
              <p className="text-sm md:text-base text-slate-300">
                Please select a company on the left to see the details of my work experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Experiences({ onClick, selectedId, work }) {
  return (
    <>
      {work.map((item) => (
        <div key={item.id_work} onClick={() => onClick(item.id_work)} className="capitalize">
          <h3
            className={`cursor-pointer p-4 ${
              selectedId === item.id_work
                ? "border-b-4 md:border-l-2 md:border-b-0 border-secondary-500 text-secondary-500"
                : "border-b-4 md:border-l md:border-b-0 border-transparent md:border-slate-300 text-slate-100"
            }`}
          >
            {item.nama_perusahaan}
          </h3>
        </div>
      ))}
    </>
  );
}
