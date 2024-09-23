import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Contact() {
  const { id = "1" } = useParams();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/showcontact/${id}`;
        const response = await axios.get(url);
        setContacts(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);
  console.log(contacts)
  return (
    <>
      <div id="contact">
        <div className="bg-brand-500 text-slate-100 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[112px] pt-24 sm:pt-32 md:pt-40 lg:pt-52">
        <div className="flex mb-6">
          <h1 className="text-secondary-500 text-2xl md:text-3xl lg:desktop-h2 w-1/2">Contact</h1>
          <div className="line mt-5"></div>
        </div>
          <div className="grid justify-items-center">
            <h1 className="text-lg-normal md:mobile-h3 md:text-slate-100 text-slate-300">
              Feel Free to Say Hi!
            </h1>
            <div className="my-10">
              <ul className="grid grid-cols-1  md:grid-cols-3 gap-6">
                <CallMe contacts={contacts} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CallMe({contacts}) {
  return (
    <>
      {contacts.map((contact, index) => (
        <li key={index} className="text-slate-300 flex items-center">
          <img
            className="w-6 h-6 inline mr-3"
            src={`http://localhost:3000/`+contact.icon}
            alt="social media logo"
          />
          {contact.value}
        </li>
      ))}
    </>
  );
}

