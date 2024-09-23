import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SearchIcon from "../../../../assets/gambar/search.png";
import MainLayout from "../adminLayout";
import { useNavigate } from "react-router-dom";

export default function ContactAdmin() {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
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
          ? `http://localhost:3000/tampilcontact`
          : `http://localhost:3000/tampilcontact/${id}`;
        const response = await axios.get(url);
        setContacts(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id, checkAdmin]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const handleEditContact = (contact) => {
    localStorage.setItem('contactToEdit', JSON.stringify(contact));
    navigate("/detail-contact");
  };

  const handleDeleteContact = (id_contact) => {
    axios.delete(`http://localhost:3000/hapuscontact/${id_contact}`)
      .then(() => {
        location.reload()
      })
      .catch((error) => {
        console.error("Ada kesalahan dalam menghapus data:", error);
      });
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.value.toLowerCase().includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 3;

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <MainLayout>
      <main className="p-8 font-nunito sm:w-1/4 md:w-1/2 lg:w-full">
        <h2 className="text-xl font-bold">Setting Contact</h2>
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
              onClick={() => navigate("/detail-contact")}
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
                <th className="p-4 border-b">Icon</th>
                <th className="p-4 border-b">Link</th>
                <th className="p-4 border-b">Value</th>
                <th className="p-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((contact, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100"
                >
                  <td className="p-4 border-b">
                    {indexOfFirstContact + index + 1}
                  </td>
                  <td className="p-4 border-b">{contact.id_users}</td>
                  <td className="p-4 border-b">
                    <img src={"http://localhost:3000/"+contact.icon} alt="icon" className="w-6 h-6" />
                  </td>
                  <td className="p-4 border-b">{contact.link}</td>
                  <td className="p-4 border-b">{contact.value}</td>
                  <td className="p-4 border-b flex">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleEditContact(contact)}
                    >
                      Edit
                    </button>
                      <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteContact(contact.id_contact)}
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
              className={`py-2 px-4 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
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
              className={`py-2 px-4 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
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
