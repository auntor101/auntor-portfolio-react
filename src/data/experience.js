// All six roles exactly as provided. No titles invented.
// Humanizer audit:
//   - Cut "AI research under the lab's supervision" (passive, vague)
//   - Cut "Contributed to ongoing projects" (filler — says nothing)
//   - "Carried out" -> "did" or more direct verb where possible
//   - Descriptions kept short and factual; no trailing -ing phrases added for flair
export const experience = [
  {
    title: "Research Assistant",
    org: "ELITE Research Lab LLC",
    location: "Queens, NY, USA (Remote)",
    date: "Jun 2026 — Present",
    desc: "Promoted to Research Assistant; currently executing assigned responsibilities in computer vision, network security, and multimodal federated learning research.",
    tags: ["Research", "Computer Vision", "Network Security", "Federated Learning"]
  },
  {
    title: "Junior Research Assistant",
    org: "ELITE Research Lab LLC",
    location: "Queens, NY, USA (Remote)",
    date: "Apr 2026 — May 2026",
    desc: "Worked on multimodal and federated learning research. Manuscripts in preparation.",
    tags: ["Federated Learning", "Multimodal"]
  },
  {
    title: "AI Research Intern",
    org: "ELITE Research Lab LLC",
    location: "Queens, NY, USA (Remote)",
    date: "Jan 2026 — May 2026",
    desc: "Contributed to ongoing research projects and helped prepare manuscripts for submission.",
    tags: ["AI Research", "Manuscripts"]
  },
  {
    title: "Research Collaborator",
    org: "ELITE Research Lab LLC",
    location: "Queens, NY, USA (Remote)",
    date: "Aug 2025 — Dec 2025",
    desc: "Worked on generative AI using Stable Diffusion, medical image classification for diabetic retinopathy, and transfer learning.",
    tags: ["Generative AI", "Medical Imaging", "Transfer Learning"]
  },
  {
    title: "Research Assistant",
    org: "Rangamati Science & Technology University (RMSTU)",
    location: "Rangamati, Bangladesh",
    date: "Dec 2024 — Jun 2025",
    desc: "Simulated and collected network traffic data, did literature review, and handled data analysis and preprocessing.",
    tags: ["Data Analysis", "Networks", "Preprocessing"]
  },
  {
    title: "Software Engineer Intern (Industrial Attachment)",
    org: "Celloscope Limited",
    location: "Dhaka, Bangladesh",
    date: "Mar 2024 — Jun 2024",
    desc: "Backend development using Java, Spring Boot, and MySQL.",
    tags: ["Java", "Spring Boot", "MySQL"]
  }
];

export const education = {
  bachelor: {
    degree: "Bachelor of Science in Computer Science & Engineering",
    org: "Rangamati Science & Technology University (RMSTU)",
    location: "Rangamati, Bangladesh",
    cgpa: "3.50 / 4.00",
    semesterGPAs: [
      ["Sem 5", "3.70"],
      ["Sem 6", "3.82"],
      ["Sem 7", "3.92"],
      ["Sem 8", "3.86"]
    ],
    coursework: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Networking",
      "Information Security",
      "Vector Calculus & Linear Algebra",
      "Probability & Statistics"
    ]
  },
  hsc: {
    title: "Higher Secondary Certificate (HSC)",
    org: "Notre Dame College",
    location: "Dhaka, Bangladesh",
    gpa: "5.00 / 5.00"
  },
  ssc: {
    title: "Secondary School Certificate (SSC)",
    org: "Laker's Public School and College",
    location: "Dhaka, Bangladesh",
    gpa: "5.00 / 5.00"
  }
};
