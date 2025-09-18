export default function Education() {
  const educations = [
    {
      id_school: 1,
      nama_sekolah: "SMA Negeri 2 Sukabumi",
      jurusan: "Ilmu Pengetahuan Alam",
      tahun_mulai: "2018",
      tahun_akhir: "2015",
    },
    {
      id_school: 2,
      nama_sekolah: "SMP I Nurul Karomah",
      jurusan: "",
      tahun_mulai: "2015",
      tahun_akhir: "2012",
    },
    {
      id_school: 3,
      nama_sekolah: "MI Al-Islam",
      jurusan: "",
      tahun_mulai: "2012",
      tahun_akhir: "2006",
    },
  ];
  return (
    <div id="education" className=" text-slate-100 px-4 sm:px-8 md:px-16 py-10 lg:px-[112px] ">
      <div className="flex mb-6">
        <h1 className="text-2xl md:text-3xl lg:desktop-h2 text-secondary-500 w-1/2">Education</h1>
        <div className="line mt-5"></div>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-1 ">
        <Schools educations={educations} />
      </div>
    </div>
  );
}

function Schools({ educations }) {
  return (
    <>
      {educations.map((school, index) => (
        <div key={index} className="grid grid-cols-1 text-slate-100 mb-6 capitalize">
          <div className="border-l-2 md:grid md:grid-cols-2 border-solid md:gap-4 border-brand-400 p-4 md:pl-5 h-full w-full">
            <div>
              <h1 className="text-lg text-base-bold">{school.nama_sekolah}</h1>
              <p className="text-slate-300 text-sm md:text-sm-italic">{school.jurusan}</p>
            </div>
            <p className="text-base-normal  mt-2 md:mt-0 ">
              {school.tahun_mulai} - {school.tahun_akhir}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
