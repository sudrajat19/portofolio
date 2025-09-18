import axios from "axios";
import logoWa from "../../assets/gambar/wa2.png";
import logoIg from "../../assets/gambar/instagram.png";
export default function Contact() {
  const fetchData = async () => {
    try {
      const url = `http://localhost:3000/api/global/get-logs-status?profileName=FLXD_REST_RELAY_URL&companyId=14063`;
      const response = await axios.get(url);
      console.log(response.data.values);
    } catch (error) {
      console.error("Ada kesalahan dalam mengambil data:", error);
    }
  };
  const contacts = [
    {
      id: 1,
      icon: logoIg,
      link: "https://www.instagram.com/sudrajats504/",
      value: "@sudrajats504",
    },
    {
      id: 2,
      icon: logoWa,
      link: "https://api.whatsapp.com/send/?phone=6285946652309&text&type=phone_number&app_absent=0",
      value: "085946652309",
    },
  ];
  return (
    <div id="contact">
      <div>
        <div className=" text-slate-100 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[112px] pt-24 sm:pt-32 md:pt-40 lg:pt-52">
          <div className="flex mb-6">
            <h1 className="text-secondary-500 text-2xl md:text-3xl lg:desktop-h2 w-1/2">Contact</h1>
            <div className="line mt-5"></div>
          </div>
          <div className="grid justify-items-center">
            <h1 onClick={fetchData} className="text-lg-normal cursor-pointer md:mobile-h3 md:text-slate-100 text-slate-300">
              Feel Free to Say Hi!
            </h1>
            <div className="py-10">
              <ul className="flex gap-6">
                <CallMe contacts={contacts} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallMe({ contacts }) {
  return (
    <>
      {contacts.map((contact, index) => (
        <a key={index} href={contact.link}>
          <li className="text-slate-300 flex items-center">
            <img className="w-6 h-6 inline mr-3" src={contact.icon} alt="social media logo" />
            {contact.value}
          </li>
        </a>
      ))}
    </>
  );
}
