// Leadership, awards and references. Photos live in public/img/lead.
const IMG = (f) => `/img/lead/${f}.webp`;

export const leadership = [
  { title: "Emergency food distribution for communities affected by flash floods", when: "2026", org: "Government of Bangladesh and World Food Programme (WFP), implemented by ASHIKA Development Associates · Rangamati Hill District",
    text: "Flooding hit five upazilas in Rangamati hard, and there was no record yet of who was affected or what each family still lacked. I helped distribute rice, oil, dry food and energy biscuits. With two team members, I collected household data on paper forms and entered it afterwards. This created the first structured record, so relief could be directed by need. I volunteered in Rangamati Sadar as part of the ASHIKA team.",
    result: ["396", "households reached across Rangamati Sadar, Baghaichhari, Belaichhari, Barkal and Juraichhari"],
    shots: [[IMG("flood-relief-team"), "ASHIKA relief team in orange vests outside the office"], [IMG("flood-relief-1"), "Food handed to a flood-affected woman under the WFP and ASHIKA banner"], [IMG("flood-relief-2"), "Second food handover at the Rangamati Pourosova distribution"]],
    caption: "Distribution at Rangamati Sadar, with the ASHIKA team.", proofs: [["Volunteer certificate", IMG("ashika-volunteer-cert")]] },
  { title: "Conference website developer", when: "2025", org: "International Bioscience Conference and Carnival 2025 (ICBC) · Rangamati Science and Technology University",
    text: "The conference needed a public website for registration and paper submissions, built by a small student team on a fixed deadline. I built and secured it as backend developer and security analyst on a six-person team, and owned the backend and security design for the whole team.",
    result: ["245", "registered participants handled"],
    shots: [[IMG("shot-icbc-site"), "Home page of the ICBC 2025 conference website"]], caption: "icbc.rmstu-conf.ac.bd, the conference website.",
    links: [["Live site", "https://icbc.rmstu-conf.ac.bd/"], ["ICBC post", "https://www.facebook.com/share/p/18PXWp41YY/"]] },
  { title: "Technical session coordinator and volunteer", when: "16–18 May 2025", org: "International Bioscience Conference and Carnival 2025 (ICBC) · Rangamati Science and Technology University",
    text: "Technical sessions over three days needed a fixed schedule that presenters and moderators kept to. I coordinated the sessions and managed the presentation schedule, kept presenters and moderators on time myself, and helped at the registration desk and delegate check-in.",
    result: ["3", "technical sessions coordinated"],
    shots: [[IMG("icbc-2025-team"), "ICBC 2025 organisers and volunteers in front of the conference banner"]], caption: "ICBC Volunteer 2025 team, Rangamati Science and Technology University, 16–18 May 2025.",
    links: [["ICBC post", "https://www.facebook.com/share/p/18PXWp41YY/"]], proofs: [["ICBC certificate", "/docs/icbc-2025-certificate.pdf"]] },
  { title: "AI seminar organiser and host", when: "2024", org: "Independent initiative · Schools and colleges of Rangamati Hill District",
    text: "Students at schools and colleges across the district had little exposure to how AI systems work and where they fail. I organised the series myself, with no institutional sponsor, and ran it with five fellow RMSTU students. Sessions covered AI applications, ethical considerations and safety practices. Venues included Moanoghar Residential School, Moanoghar Pre-Cadet School, Rangamati Government College, Rangamati Government Mohila College and Rani Dayamoyee High School.",
    result: ["300+", "students across six schools and colleges"] },
  { title: "Winter relief distribution", when: "Winters 2023 and 2024", org: "RMSTU Indigenous Students’ Family · Baghaichhari and Sajek, Rangamati Hill District",
    text: "Indigenous families in rural parts of the district needed books, warm clothing and study materials in winter. As Welfare Secretary, I helped collect funds and clean winter clothing, distributed supplies, collected data on affected families and coordinated logistics. Over two winters we collected around BDT 45,000, and the clothing reached families in three villages in Baghaichhari and Sajek.",
    result: ["61 families", "received clothing, and 52 students received study materials"], links: [["Facebook page", "https://www.facebook.com/RMSTUISU"]] },
  { title: "Indigenous food habits and climate change awareness programme", when: "11–13 June 2026", org: "Self-organised, with support from ASHIKA Development Associates · Kaptai (Rangamati) and Bandarban Sadar (Bandarban)",
    text: "Mothers and adolescent girls (kishories) in the Chittagong Hill Tracts had few structured sessions on how local food habits relate to nutrition and to climate change. I assembled and led a group of 15 volunteers. We held meetings and awareness sessions with them, including at UNICEF-supported Para Centres and a monthly cluster meeting of Para Centre workers. Sessions covered what indigenous food habits offer for nutrition, and how climate change affects food and jhum cultivation. Printed material was produced from the sessions.",
    result: ["48", "mothers and kishories reached"],
    shots: [[IMG("awareness-cluster-meeting-chandraghona"), "Monthly cluster meeting of Para Centre workers under a UNICEF and CHT Development Board banner"], [IMG("awareness-para-centre-children"), "Mothers and children inside a Para Centre with UNICEF nutrition posters"], [IMG("awareness-para-centre-rkap118"), "Para Centre workers outside Para Centre RKAP-118, Sapchhari Tripurachhari"], [IMG("awareness-leaflet-mother"), "Explaining a printed leaflet to a mother holding her child"], [IMG("awareness-farming-families"), "Talking with a farming family as they bundle harvested greens"]],
    caption: "Cluster meeting at a Model Para Centre in Chandraghona Union, Kaptai; mothers and children at a Para Centre; Para Centre RKAP-118 in Wagga Union, Kaptai; handing out printed material; meeting a farming family." },
];

// proof is the path of the award letter or certificate; empty means no link is shown until the file is added.
export const awards = [
  { year: "2018, 2022, 2023, 2024", name: "Chittagong Hill Tracts Development Board Scholarship", note: "Awarded for academic excellence", proof: "" },
  { year: "2023, 2024", name: "Merit Scholarship", note: "Rangamati Science and Technology University", proof: "" },
  { year: "2023, 2025", name: "Rangamati Hill District Council Scholarship", note: "For academic performance", proof: "" },
  { year: "2023", name: "3rd place, Hackathon", note: "Led a three-person team that built a web app for community resource mapping in the Rangamati Hill Tracts, using a JavaScript framework and a backend. The team placed 3rd among 18.", proof: "", proofLabel: "Certificate" },
  { year: "2015, 2017", name: "Merit Scholarship in SSC and HSC", note: "Directorate of Secondary and Higher Education (DSHE), Government of Bangladesh", proof: "" },
  { year: "2009", name: "Inter-School Debate Championship, Best Debater", note: "Won the championship and was named best debater at the inter-school level", proof: "" },
  { year: "2008, 2009", name: "Inter-School Drawing Competition", note: "National level: 1st place (2008), 2nd place (2009)", proof: "" },
];

// email is split [name, domain] and assembled in the browser, like the owner's own address.
export const references = [
  { name: "Md Kishor Morol", href: "https://kishormorol.github.io/", role: "Mentor and Principal Investigator, ELITE Research Lab · CEO, ELITE Research Lab LLC · Assistant Professor (on leave), American International University-Bangladesh", org: "ELITE Research Lab LLC, Queens, NY, USA", email: ["kishor", "elitelab.ai"],
    links: [["Website", "https://kishormorol.github.io/"], ["Google Scholar", "https://scholar.google.com/citations?hl=en&user=pjn3jg4AAAAJ"]] },
  { name: "Dr. Tanjim Mahmud", href: "https://rmstu.ac.bd/profile/tanjim", role: "Reference · Associate Professor · World’s Top 2% Scientist", org: "Dept. of Computer Science and Engineering, Rangamati Science and Technology University", email: ["tanjim.cse", "rmstu.ac.bd"],
    links: [["RMSTU profile", "https://rmstu.ac.bd/profile/tanjim"], ["Google Scholar", "https://scholar.google.com/citations?hl=en&user=MmuzMOoAAAAJ"]] },
  { name: "Md Mynoddin", href: "https://rmstu.ac.bd/profile/mynoddin", role: "B.Sc. thesis supervisor · Assistant Professor", org: "Dept. of Computer Science and Engineering, Rangamati Science and Technology University", email: ["mynoddin", "rmstu.ac.bd"],
    links: [["RMSTU profile", "https://rmstu.ac.bd/profile/mynoddin"], ["Google Scholar", "https://scholar.google.com/citations?hl=en&user=GJdr1I0AAAAJ"]] },
];
