import { useState, useEffect } from "react";
import SearchIcon from "../../../../assets/gambar/search.png";
import MainLayout from "../adminLayout";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function ContactAdmin() {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
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
          ? `http://localhost:3000/tampilskill`
          : `http://localhost:3000/tampilskill/${id}`;
        const response = await axios.get(url);
        setSkills(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id, checkAdmin]);

  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  

  const handleEditSkill = (skill) => {
    localStorage.setItem('skillToEdit', JSON.stringify(skill));
    navigate("/detail-skill");
  };

  const handleDeleteSkill = (id_skill) => {
    axios.delete(`http://localhost:3000/hapusskill/${id_skill}`)
      .then(() => {
        location.reload()
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam menghapus data:", error);
      });
  };

  const filteredSkill = skills.filter((skill) =>
    skill.nama_skill.toLowerCase().includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 3;

  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = filteredSkill.slice(indexOfFirstSkill, indexOfLastSkill);

  const totalPages = Math.ceil(filteredSkill.length / skillsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <MainLayout>
    <main className="p-8 font-nunito md:w-1/2 lg:w-full">
      <h2 className="text-xl font-bold">Setting Skills</h2>
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
            onClick={() => navigate("/detail-skill")}
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
              <th className="p-4 border-b">Gambar</th>
              <th className="p-4 border-b">Nama_skill</th>
              <th className="p-4 border-b">Tingkat_kemahiran</th>
              <th className="p-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentSkills.map((skill, index) => (
              <tr
                key={index}
                className='hover:bg-gray-100'
              >
                <td className="p-4 border-b">{indexOfFirstSkill + index + 1}</td>
                <td className="p-4 border-b">{skill.id_users}</td>
                <td className="p-4 border-b">
                    <img src={"http://localhost:3000/"+skill.gambar} alt="gambar" className="w-6 h-6" />
                  </td>
                <td className="p-4 border-b">{skill.nama_skill}</td>
                <td className="p-4 border-b">{skill.tingkat_kemahiran}</td>
                <td className="p-4 border-b flex">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEditSkill(skill)}
                  >
                    Edit
                  </button>
                    <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteSkill(skill.id_skill)}
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
                className={`px-2 py-1 ${currentPage === index + 1 ? "bg-gray-300" : ""}`}
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
