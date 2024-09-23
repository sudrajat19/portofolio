import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SearchIcon from "../../../../assets/gambar/search.png";
import MainLayout from "../adminLayout";
import { useNavigate } from "react-router-dom";

export default function UsersAdmin() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  let id, checkAdmin;
  if (!token) {
    navigate("/login");
  }

  if (token) {
    const decoded = jwtDecode(token);
    id = decoded.rows[0].id_users;
    checkAdmin = decoded.rows[0].role;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          checkAdmin === 2
            ? `http://localhost:3000/tampil`
            : `http://localhost:3000/tampil/${id}`;
        const response = await axios.get(url);
        setUsers(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id, checkAdmin]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEditUser = (user) => {
    localStorage.setItem("userToEdit", JSON.stringify(user));
    navigate("/detail-users");
  };

  const handleDeleteUser = (id_users) => {
    axios
      .delete(`http://localhost:3000/hapus/${id_users}`)
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam menghapus data:", error);
      });
  };

  const filteredUsers = users.filter((user) =>
    user.nama.toLowerCase().includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const indexOfLastUsers = currentPage * usersPerPage;
  const indexOfFirstUsers = indexOfLastUsers - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUsers, indexOfLastUsers);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <MainLayout>
      <main className="p-8 font-nunito sm:w-1/4 md:w-1/2 lg:w-full">
        <h2 className="text-xl font-bold">Setting Users</h2>
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
            {checkAdmin === 2 ? (
              <button
                className="bg-secondary-10 w-24 h-8 rounded-lg text-base font-nunito"
                onClick={() => navigate("/detail-users")}
              >
                Tambah
              </button>
            ) : (
              <button
                className="hidden bg-secondary-10 w-24 h-8 rounded-lg text-base font-nunito"
                onClick={() => navigate("/detail-users")}
              >
                Tambah
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 rounded-lg ">
          <table className="w-full text-left overflow-x-auto">
            <thead className="bg-secondary-5">
              <tr>
                <th className="p-4 border-b">No</th>
                <th className="p-4 border-b">Nama</th>
                <th className="p-4 border-b">Password</th>
                <th className="p-4 border-b">Photo</th>
                <th className="p-4 border-b">Deskripsi</th>
                <th className="p-4 border-b">Profesi</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Role</th>
                <th className="p-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-4 border-b">
                    {indexOfFirstUsers + index + 1}
                  </td>
                  <td className="p-4 border-b">{user.nama}</td>
                  <td className="p-4 border-b">{user.password}</td>
                  <td className="p-4 border-b">
                    <img
                      src={"http://localhost:3000/" + user.photo}
                      alt="gambar"
                      className="w-6 h-6"
                    />
                  </td>
                  <td className="p-4 border-b">{user.deskripsi}</td>
                  <td className="p-4 border-b">{user.profesi}</td>
                  <td className="p-4 border-b">{user.email}</td>
                  <td className="p-4 border-b">{user.role}</td>
                  <td className="p-4 border-b flex">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteUser(user.id_users)}
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
