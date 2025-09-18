export default function Project() {
  const projects = [
    {
      id_project: 1,
      nama_project: "Web Report Anteraja",
      deskripsi_project: "Developed dashboard for delivery reports using React, Tailwind, and Express. Focused on admin tools and API integration. (2024),A web platform for streamlined report management with a user-friendly interface.",
      link_project: "https://anteraja.vercel.app/",
      usedFramework: ["React.js", "Tailwind CSS", "Express.js", "Node.js", "Postgresql", "Sequelize"],
      img: " ./src/assets/gambar/anteraja.png",
      work: "Fullstack",
      note: "Deployed",
    },
    {
      id_project: 2,
      nama_project: "My Portofolio",
      deskripsi_project: "Developed dashboard for delivery reports using React, Tailwind, and Express. Focused on admin tools and API integration. (2024)",
      link_project: "#",
      usedFramework: ["React.js", "Tailwind CSS"],
      img: " ./src/assets/gambar/portofolio.png",
      work: "Frontend",
      note: "Deployed",
    },
    {
      id_project: 3,
      nama_project: "D-serve",
      deskripsi_project:
        "Developed the front-end of D-SERVE, a web application for real-time cafe menu display and ordering. The platform allows users to browse and order, while admins can manage menus and update personal data through a dedicated dashboard.",
      link_project: "#",
      usedFramework: ["Next.js", "Tailwind CSS", "Express.js", "Node.js", "Postgresql", "Sequelize", "Socket.io"],
      img: " ./src/assets/gambar/dserve.jpg",
      work: "Frontend - Backend",
      note: "Not yet deployed",
    },
    {
      id_project: 4,
      nama_project: "Web Booking Futsal",
      deskripsi_project:
        "A futsal booking website is a digital platform that allows players and teams to easily reserve futsal courts online. Instead of manually contacting venues or visiting in person, users can browse available courts, check schedules, compare facilities, and confirm bookings in just a few clicks. This modern solution is designed to simplify the booking process, save time, and enhance the overall futsal experience.",
      link_project: "#",
      usedFramework: ["Next.js", "Tailwind CSS", "Express.js", "Node.js", "Postgresql", "Sequelize", "Socket.io"],
      img: " ./src/assets/gambar/futsal.jpg",
      work: "Fullstack",
      note: "Not yet deployed",
    },
  ];
  return (
    <div id="project" className=" text-slate-100 py-10  px-4 sm:px-8 md:px-16 lg:px-[112px]">
      <div className="flex mb-6">
        <h1 className="text-2xl md:text-3xl lg:desktop-h2 text-secondary-500 w-1/2">Projects</h1>
        <div className="line mt-5"></div>
      </div>
      <div id="/project" className="py-4">
        <CardProject projects={projects} />
      </div>
    </div>
  );
}

function CardProject({ projects }) {
  return (
    <div className="flex lg:grid lg:grid-cols-3  lg:gap-4 space-x-4 lg:space-x-0 overflow-x-auto">
      {projects.map((project, index) => (
        <a key={index} href={project.link_project} className="card min-w-[270px] w-full  rounded-lg bg-brand-600 hover:bg-brand-700 transition-colors flex-shrink-0">
          <div className="flex flex-col w-full  h-[calc(100%-80px)]">
            <div className="relative">
              <img src={project.img} className="h-[138px] w-full object-cover" alt={project.nama_project} />
              <div className="bg-brand-600 opacity-85 p-[5px] text-sm-italic text-slate-100 rounded-tr-lg absolute bottom-0 left-0">
                <p>{project.work}</p>
              </div>
            </div>
            <div className=" p-4 capitalize ">
              <p className="text-xs">
                <span className="font-bold"> Note:</span> {project.note}
              </p>
              <h2 className="text-xl font-bold mb-2">{project.nama_project}</h2>
              <p className="text-sm">{project.deskripsi_project}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 px-2">
            {project.usedFramework.map((framework, index) => (
              <>
                <p key={index} className="text-sm-italic">
                  {framework}
                </p>
              </>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
