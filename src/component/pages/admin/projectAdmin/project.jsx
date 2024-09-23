import { useState,useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SearchIcon from "../../../../assets/gambar/search.png";
import MainLayout from "../adminLayout";
import { useNavigate } from "react-router-dom";

export default function ProjectAdmin() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  let id, checkAdmin;
  if(!token){
    navigate('/login');
  }
  
  if (token) {
    const decoded = jwtDecode(token);
    id = decoded.rows[0].id_users;
    checkAdmin = decoded.rows[0].role;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = checkAdmin === 2
          ? `http://localhost:3000/tampilproject`
          : `http://localhost:3000/tampilproject/${id}`;
        const response = await axios.get(url);
        setProjects(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id, checkAdmin]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEditProject = (project) => {
    localStorage.setItem('projectToEdit', JSON.stringify(project));
    navigate("/detail-project");
  };

  const handleDeleteProject = (id_project) => {
    axios.delete(`http://localhost:3000/hapusproject/${id_project}`)
      .then(() => {
        location.reload()
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam menghapus data:", error);
      });
  };

    
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const filteredProjects = projects.filter((project) =>
    project.nama_project.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <MainLayout>
    <main className="p-8 font-nunito md:w-1/2 lg:w-full">
      <h2 className="text-xl font-bold">Setting Project</h2>
      <div className="flex justify-between mt-9">
        <div className="flex gap-2">
          <input
            className="p-2 border rounded-lg border-secondary-10 w-96 h-8"
            placeholder="Search"
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="bg-secondary-10 w-8 h-8 p-2 rounded-lg flex items-center justify-center">
            <img src={SearchIcon} alt="search" />
          </button>
        </div>
        <div>
            <button
            className="bg-secondary-10 w-24 h-8 rounded-lg text-base font-nunito"
            onClick={() => navigate("/detail-project")}
          >
            Tambah
          </button>
        </div>
      </div>
      <div className="mt-12 rounded-lg ">
        <table className="w-full text-left overflow-x-auto">
          <thead className="bg-secondary-5">
            <tr>
              <th className="p-4 border-b">No</th>
              <th className="p-4 border-b">Id_users</th>
              <th className="p-4 border-b">Nama_project</th>
              <th className="p-4 border-b">Deskripsi_project</th>
              <th className="p-4 border-b">Link_project</th>
              <th className="p-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr
                key={index}
                className='hover:bg-gray-100'
              >
                <td className="p-4 border-b">
                  {indexOfFirstProject + index + 1}
                </td>
                <td className="p-4 border-b">{project.id_users}</td>
                <td className="p-4 border-b">{project.nama_project}</td>
                <td className="p-4 border-b">{project.deskripsi_project}</td>
                <td className="p-4 border-b">{project.link_project}</td>
                <td className="p-4 border-b flex">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </button>
                    <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteProject(project.id_project)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-4 w-full justify-around py-8">
          <button
            className="text-blue-500 hover:underline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-2 py-1 ${
                  currentPage === index + 1 ? "bg-gray-300" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="text-blue-500 hover:underline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
    </MainLayout>
  );
}
