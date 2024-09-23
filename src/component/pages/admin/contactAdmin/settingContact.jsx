import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../adminLayout";

export default function AddContact() {
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState({
    id_contact: null,
    id_users: "",
    icon: null,
    iconUrl: null,
    link: "",
    value: "",
  });

  const [showId, setShowId] = useState([]);

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
        const response = await axios.get(`http://localhost:3000/tampil`);
        setShowId(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const contactToEdit = localStorage.getItem("contactToEdit");
    if (contactToEdit) {
      const parsedContact = JSON.parse(contactToEdit);
      setNewContact({
        ...parsedContact,
        iconUrl: `http://localhost:3000/${parsedContact.icon}`,
      });
      localStorage.removeItem("contactToEdit");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    checkAdmin === 1
      ? formData.append("id_users", id)
      : formData.append("id_users", newContact.id_users);
    formData.append("link", newContact.link);
    formData.append("value", newContact.value);

    if (newContact.icon) {
      formData.append("icon", newContact.icon);
    } else {
      formData.append("iconUrl", newContact.iconUrl);
    }

    if (newContact.id_contact) {
      formData.append("id_contact", newContact.id_contact);
      axios
        .put("http://localhost:3000/ubahcontact", formData)
        .then(() => {
          toast.loading();
          toast.success("Contact updated successfully", {
            duration: 4000,
          });
          navigate("/admin/contactAdmin");
        })
        .catch((error) => {
          console.error("Ada kesalahan dalam menyimpan data:", error);
          toast.error("Contact update error");
        });
    } else {
      axios
        .post("http://localhost:3000/tambahcontact", formData)
        .then(() => {
          toast.loading();
          toast.success("Contact added successfully");
          navigate("/admin/contactAdmin");
        })
        .catch((error) => {
          console.error("Error menambahkan contact:", error);
          toast.error("Error adding contact");
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/contactAdmin");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      const file = files[0];
      setNewContact({
        ...newContact,
        [name]: file,
        iconUrl: URL.createObjectURL(file),
      });
    } else {
      setNewContact({ ...newContact, [name]: value });
    }
  };

  return (
    <MainLayout>
      <main className="p-8 font-nunito w-full">
        <h2 className="text-xl font-bold">Detail Contact</h2>
        <form className="mt-4 border p-8 grid gap-4" onSubmit={handleSubmit}>
          {checkAdmin === 1 ? (
            <div className="flex gap-4 mb-2">
              <label htmlFor="id_users" className="w-24 hidden">
                Id Users:
              </label>
              <input
                type="number"
                className=" p-2 border hidden rounded-lg border-slate-50 outline-none w-full h-8"
                id="id_users"
                name="id_users"
                value={id}
                onChange={handleChange}
                readOnly
              />
            </div>
          ) : (
            <div className="flex gap-4 mb-2">
              <label htmlFor="id_users" className="w-24">
                Id Users:
              </label>
              <select name="id_users" id="id_users">
                {showId.map((show, index) => (
                  <option key={index} value={show.id_users}>
                    {show.id_users}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex gap-4 mb-2">
            <label htmlFor="icon" className="w-24">
              Icon:
            </label>
            <input
              type="file"
              className="border rounded-lg border-secondary-10 w-full h-8"
              id="icon"
              name="icon"
              onChange={handleChange}
            />
          </div>
          {newContact.iconUrl && (
            <div>
              <img src={newContact.iconUrl} className="mx-auto" />
            </div>
          )}
          <div className="flex gap-4 mb-2">
            <label htmlFor="link" className="w-24">
              Link:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              type="text"
              id="link"
              name="link"
              value={newContact.link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="value" className="w-24">
              Value:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              type="text"
              id="value"
              name="value"
              value={newContact.value}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-8 justify-end">
            <button
              type="submit"
              className="bg-secondary-10 p-2 w-[100px] rounded-md"
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-secondary-10 w-[100px] p-2 rounded-md"
              onClick={handleCancel}
            >
              Batal
            </button>
          </div>
        </form>
        <Toaster
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
      </main>
    </MainLayout>
  );
}
