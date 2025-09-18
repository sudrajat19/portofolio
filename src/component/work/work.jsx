import { useState } from "react";

export default function Work() {
  const [selectedId, setSelectedId] = useState(null);

  const work = [
    {
      id_work: 1,
      nama_perusahaan: "PT Intellinum Indonesia",
      awal_kerja: "2025",
      akhir_kerja: "",
      deskripsi_perusahaan:
        "Intellinum specializes in mobile technologies and provides consulting services in the area of Oracle supply chain/logistics and technical expertise. Our goal is to help our clients improve their supply chain execution and provide world-class services through innovative and reliable business software solutions. FlexiPro is an innovative mobile solution for Oracle SCM Cloud and WMS Cloud. It provides users with an intuitive, productive, barcode-enabled and personalizable user interface running on mobile devices with Windows CE/Mobile, Android, and iOS. All the transactions performed on the mobile devices are interfaced real time to Oracle SCM Cloud and WMS Cloud to increase inventory visibility and accuracy. Express Server and Express Client are Oracle Validated Integration solution for Oracle E-Business Suite WMS and MSCA. Express Server allows customers to make changes to MWA mobile screens easily to streamline and enhance their mobile supply chain operations. Express Client is native GUI client that offers better user interface - it is available in Windows Mobile/CE platform, Android and iOS.",
    },
    {
      id_work: 2,
      nama_perusahaan: "PT PATIO",
      awal_kerja: "2023",
      akhir_kerja: "2025",
      deskripsi_perusahaan:
        "PT PATIO is a company engaged in the field of construction services and architectural design. We provide comprehensive solutions ranging from design planning, residential construction, renovation, to interior and exterior works tailored to our clients’ needsWith a team of experienced architects, interior designers, and skilled professionals, the company is committed to delivering homes that are comfortable, functional, and aesthetically pleasing",
    },
    {
      id_work: 3,
      nama_perusahaan: "PT Azka Cahaya Puranama",
      awal_kerja: "2020",
      akhir_kerja: "2022",
      deskripsi_perusahaan:
        "PT Azka Cahaya Purnama, better known through its brand D’Top Fast Food, is a local quick service restaurant specializing in fried chicken, burgers, and other fast-food menu items. With several outlets operating in Indonesia, the company focuses on providing affordable and accessible meals to a wide range of customers through dine-in, take-away, and online delivery platforms such as GrabFood and GoFood.",
    },
  ];

  const handleSelected = (id_work) => {
    if (selectedId === id_work) {
      setSelectedId(null);
    } else {
      setSelectedId(id_work);
    }
  };

  const selectedExperience = work.find((exp) => exp.id_work === selectedId);

  return (
    <div id="work" className=" text-slate-100 px-4 sm:px-8 md:px-16 lg:px-[112px] py-10 ">
      <div className="flex gap-2 mb-6">
        <h1 className="text-2xl md:text-3xl lg:desktop-h2 text-secondary-500 w-1/2">Work Experiences</h1>
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
              <p className="text-sm-normal md:text-base-normal text-slate-300 mt-4 md:mt-8">{selectedExperience.deskripsi_perusahaan}</p>
            </div>
          ) : (
            <div className="p-4 border-brand-400">
              <h2 className="text-xl md:text-2xl">Welcome to My Work Experience</h2>
              <p className="text-sm md:text-base text-slate-300">Please select a company on the left to see the details of my work experience.</p>
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
        <div key={item.id_work} onClick={() => onClick(item.id_work)} className="capitalize text-xs md:text-xl">
          <h3
            className={`cursor-pointer p-4 ${
              selectedId === item.id_work ? "border-b-4 md:border-l-2 md:border-b-0 border-secondary-500 text-secondary-500" : "border-b-4 md:border-l md:border-b-0 border-transparent md:border-slate-300 text-slate-100"
            }`}
          >
            {item.nama_perusahaan}
          </h3>
        </div>
      ))}
    </>
  );
}
