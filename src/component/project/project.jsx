import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from '../../assets/gambar/project2.png'

export default function Project() {
  const { id = "1" } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/showproject/${id}`;
        const response = await axios.get(url);
        setProjects(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div
      id="project"
      className="bg-brand-500 text-slate-100 pt-20 md:pt-[240px] px-4 sm:px-8 md:px-16 lg:px-[112px]"
    >
      <div className="flex mb-6">
        <h1 className="text-2xl md:text-3xl lg:desktop-h2 text-secondary-500 w-1/2">
          Projects
        </h1>
        <div className="line mt-5"></div>
      </div>
      <div id="/project" className="py-4">
        <CardProject projects={projects}/>
      </div>
    </div>
  );
}

function CardProject({projects}) {
  return (
    <div className="flex lg:grid lg:grid-cols-3 lg:gap-4 space-x-4 lg:space-x-0 overflow-x-auto">
      {projects.map((project,index) => (
        <a
          key={index}
          href={project.link_project}
          className="card min-w-[270px] lg:w-[211px] h-[380px] rounded-lg bg-brand-600 hover:bg-brand-700 transition-colors flex-shrink-0"
        >
          <div className="flex flex-col w-[300px] justify-between h-full">
            <div className="relative">
              <img
                src={img}
                className="h-[138px] w-full object-cover"
                alt={project.nama_project}
              />
              <div className="bg-brand-600 opacity-85 p-[5px] text-sm-italic text-slate-100 rounded-tr-lg absolute bottom-0 left-0">
                <p>All Frontend Responsibilities</p>
              </div>
            </div>
            <div className="mt-4 p-4 capitalize">
              <h2 className="text-xl font-bold mb-2">{project.nama_project}</h2>
              <p className="text-sm">{project.deskripsi_project}</p>
              <div className="flex gap-4 mt-4">
                <p>Tailwind CSS</p>
                <p>React.js</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
