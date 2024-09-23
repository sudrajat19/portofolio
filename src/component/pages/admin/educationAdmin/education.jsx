import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import SearchIcon from "../../../../assets/gambar/search.png";
import MainLayout from "../adminLayout";
import { useNavigate } from "react-router-dom";

export default function EducationAdmin() {
  const [search, setSearch] = useState("");
  const [educations, setEducations] = useState([]);
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
          ? `http://localhost:3000/tampileducation`
          : `http://localhost:3000/tampileducation/${id}`;
        const response = await axios.get(url);
        setEducations(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id, checkAdmin]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEditEducation = (education) => {
    localStorage.setItem("educationToEdit", JSON.stringify(education));
    navigate("/detail-education");
  };

  const handleDeleteEducation = async (id_education) => {
    try {
      await axios.delete(`http://localhost:3000/hapuseducation/${id_education}`);
      setEducations((prevEducations) =>
        prevEducations.filter((education) => education.id_education !== id_education)
      );
    } catch (error) {
      console.error("Ada kesalahan dalam menghapus data:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const educationsPerPage = 3;

  const filteredEducation = educations.filter((education) =>
    education.nama_sekolah.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEducation = currentPage * educationsPerPage;
  const indexOfFirstEducation = indexOfLastEducation - educationsPerPage;
  const currentContacts = filteredEducation.slice(
    indexOfFirstEducation,
    indexOfLastEducation
  );

  const totalPages = Math.ceil(filteredEducation.length / educationsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <MainLayout>
      <main className="p-8 font-nunito md:w-1/2 lg:w-full">
        <h2 className="text-xl font-bold">Setting Education</h2>
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
              onClick={() => navigate("/detail-education")}
            >
              Tambah
            </button>
          </div>
        </div>
        <div className="mt-12 rounded-lg">
          <table className="w-full text-left overflow-x-auto">
            <thead className="bg-secondary-5">
              <tr>
                <th className="p-4 border-b">No</th>
                <th className="p-4 border-b">Id_users</th>
                <th className="p-4 border-b">Jenis_sekolah</th>
                <th className="p-4 border-b">Nama Sekolah</th>
                <th className="p-4 border-b">Jurusan</th>
                <th className="p-4 border-b">Tahun Mulai</th>
                <th className="p-4 border-b">Tahun Akhir</th>
                <th className="p-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((education, index) => (
                <tr key={index} className={`hover:bg-gray-100`}>
                  <td className="p-4 border-b">
                    {indexOfFirstEducation + index + 1}
                  </td>
                  <td className="p-4 border-b">{education.id_users}</td>
                  <td className="p-4 border-b">{education.jenis_sekolah}</td>
                  <td className="p-4 border-b">{education.nama_sekolah}</td>
                  <td className="p-4 border-b">{education.jurusan}</td>
                  <td className="p-4 border-b">{education.tahun_mulai}</td>
                  <td className="p-4 border-b">{education.tahun_akhir}</td>
                  <td className="p-4 border-b flex">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleEditEducation(education)}
                    >
                      Edit
                    </button>
                      <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteEducation(education.id_education)}
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
