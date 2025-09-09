import { FaFacebookF, FaInstagram, FaQuora, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const teamInfo = [
  {
    id: 1,
    name: "Diksha kashyap",
    qualifications: {
      experience: "Fresher",
      education: "MA Political Science, UGC NET",
      subject: "Political Science",
    },
    description:
      "Enthusiastic, Aspiring to be a Professor, passionate educator, make complex information easy.",
    role: "Faculty (Indian Polity)",
    image: "/images/team/Dikshakashyap.png",
  },
  {
    id: 2,
    name: "Ritika kaushal",
    qualifications: {
      experience: "4 Years of Experience",
      education:
        "BA Programming with Data Analytics, MBA in Human Resource and Operations",
      subject: "Economics",
    },
    description: "Make subjects engaging and relatable for students.",
    role: "Faculty",
    image: "/images/team/Ritikakaushal.png",
  },
  {
    id: 3,
    name: "Aatiba Nasti",
    qualifications: {
      experience: "5 Years as Lecturer",
      education: "B.Tech Civil Engineering, M.Tech Transportation Engineering",
      subject: "Mathematics, Physics, Chemistry, and Reasoning",
    },
    description: "Educator, a passion for lifelong learning.",
    role: "Faculty",
    image: "/images/team/AatibaNasti.png",
  },
  {
    id: 4,
    name: "Munaza Nasti ",
    qualifications: {
      experience: "7 Years of Experience",
      education: "B.Sc Masters in Gender Studies",
      subject: "Mathematics",
    },
    description:
      "Dr. Patel is a mathematics expert who makes complex concepts simple and engaging. His innovative teaching methods have helped countless students excel in mathematics and competitive exams.",
    role: "Mathematics Head",
    image: "/images/team/MunazaNasti.png",
  },
  {
    id: 5,
    name: "Saloni Vaishnoi",
    qualifications: {
      experience: "15 Years",
      education: "B.Tech, M.A., B.Ed., pursuing PhD",
      subject: "Geography",
    },
    description: "Karate player, PLC programming, training in Doordarshan.",
    role: "Faculty",
    image: "/images/team/SaloniVaishnoi.png",
  },
  {
    id: 6,
    name: "Col Paresh Dave",
    qualifications: {
      experience: "14 Years of Experience",
      education: "M.Com., CA",
      subject: "Commerce",
    },
    description:
      "Mr. Kumar brings real-world financial expertise to the classroom. His experience in chartered accountancy and commerce education makes him an invaluable asset for commerce students.",
    role: "Commerce Expert",
    image: "/images/team/ColPareshDave.png",
  },
  {
    id: 7,
    name: "Narendra Raj Singh",
    qualifications: {
      experience: "23 Years",
      education: "M.S (AI & ML), M.B.A (IB), M.A (Business Economics)",
      subject: "Geography, Indian Art & Architecture",
    },
    description: "Corporate Training.",
    role: "Faculty",
    image: "/images/team/NarendraRajSingh.png",
  },
  {
    id: 8,
    name: "Preeti Rathi",
    qualifications: {
      experience: "6 Years",
      education: "PhD pursuing, UGC NET, MA (Economics), BEd",
      subject: "Economics, Medieval History",
    },
    description:
      "Researcher, educator, training & consultancy, case study specialist.",
    role: "Faculty",
    image: "/images/team/PreetiRathi.png",
  },

  {
    id: 10,
    name: "Charu Singh",
    qualifications: {
      experience: "Taken two mains (UPPCS), Content Developer",
      education: "B.Sc, B.Ed",
      subject: "General Studies",
    },
    description: "Faculty for Hindi medium.",
    role: "Faculty",
    image: "/images/team/CharuSingh.png",
  },
  {
    id: 11,
    name: "Hammad Jafri",
    qualifications: {
      experience: "2 years of teaching experience",
      education: "B.Sc. (Hons) Maths & B.Ed from AMU",
      subject: "Indian Polity",
    },
    description: "Faculty for English medium.",
    role: "Faculty (Indian Polity)",
    image: "/images/team/HammadJafri.png",
  },
  {
    id: 12,
    name: "Sarvesh Mishra",
    qualifications: {
      experience:
        "Worked as a general studies faculty in Eklavya Academy, Indore. Provided 1-on-1 UPSC answer writing mentorship. Worked as a guest faculty in various colleges.",
      education:
        "Bachelor of Arts (Political Science, Economics, Sociology), B.Ed",
      subject: "General Studies",
    },
    description: "Experienced mentor in UPSC preparation.",
    role: "Faculty",
    image: "/images/team/SarveshMishra.png",
  },
  {
    id: 13,
    name: "Monu Kumar",
    qualifications: {
      experience: "1.5 years",
      education: "B.A. (Political Science)",
      subject: "Political Science",
    },
    description: "Faculty for Hindi medium.",
    role: "Faculty",
    image: "/images/team/MonuKumar.png",
  },
  {
    id: 14,
    name: "Manish Mishra",
    qualifications: {
      experience: "9 years of teaching experience in UPSC and State PCS",
      education: "B.Sc, M.A. (Sociology), M.A. (History), LLB (Law)",
      subject: "Sociology & History",
    },
    description: "Faculty for Hindi medium.",
    role: "Faculty",
    image: "/images/team/ManishMishra.png",
  },
  {
    id: 15,
    name: "Satyendra Kumar Sharma",
    qualifications: {
      experience: "10 years",
      education: "Post Graduate in Economics, Political Science, and History",
      subject: "Economics, Political Science, and History",
    },
    description:
      "Faculty at Chahal IAS Academy, Geetanjali IAS Academy, and Chanakya IAS Academy.",
    role: "Faculty",
    image: "/images/team/SatyendraKumarSharma.png",
  },
];

export const socialLinks = [
  {
    name: "facebook",
    href: "https://www.facebook.com/oneaimeducation/",
    icon: (
      <FaFacebookF className="h-4 w-4 md:h-5 md:w-5 text-primaryred group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/oneaim__official/",
    icon: (
      <FaInstagram className="h-4 w-4 md:h-5 md:w-5 text-primaryred group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    name: "twitter",
    href: "https://x.com/OneAim01",
    icon: (
      <FaXTwitter className="h-4 w-4 md:h-5 md:w-5 text-primaryred group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    name: "quora",
    href: "https://www.quora.com/profile/One-Aim-5",
    icon: (
      <FaQuora className="h-4 w-4 md:h-5 md:w-5 text-primaryred group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    name: "youtube",
    href: "https://www.youtube.com/@OneAim-q7r",
    icon: (
      <FaYoutube className="h-4 w-4 md:h-5 md:w-5 text-primaryred group-hover:text-white duration-300 ease-in-out" />
    ),
  },
];

export const socialLinks2 = [
  {
    href: "https://www.facebook.com/oneaimeducation/",
    icon: (
      <FaFacebookF className="h-4 w-4 md:h-5 md:w-5 text-orange group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    href: "https://www.instagram.com/oneaim__official/",
    icon: (
      <FaInstagram className="h-4 w-4 md:h-5 md:w-5 text-orange group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    href: "https://x.com/OneAim01",
    icon: (
      <FaXTwitter className="h-4 w-4 md:h-5 md:w-5 text-orange group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    href: "https://www.quora.com/profile/One-Aim-5",
    icon: (
      <FaQuora className="h-4 w-4 md:h-5 md:w-5 text-orange group-hover:text-white duration-300 ease-in-out" />
    ),
  },
  {
    href: "https://www.youtube.com/@OneAim-q7r",
    icon: (
      <FaYoutube className="h-4 w-4 md:h-5 md:w-5 text-orange group-hover:text-white duration-300 ease-in-out" />
    ),
  },
];
