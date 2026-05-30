// Humanizer audit on card text:
//   - Removed "roaring back", "towers over", enthusiastic language
//   - Findings are factual statements, not reactions
//   - Taglines are direct questions or plain statements, not teaser copy
export const projects = [
  {
    id: "p1",
    color: "#00D4A0",
    badge: "Clinical study",
    title: "Dengue: reading the warning signs",
    tagline: "1,000 fever patients in Dhaka. Which ones had dengue, and what separated them from the rest?",
    stats: [["1,000", "Patients"], ["533", "Had dengue"], ["12", "Charts"]],
    finding: "Platelet counts fell to about a third of normal in dengue patients. That was the single clearest signal in the data.",
    tags: ["Health data", "Clinical", "Dhaka"]
  },
  {
    id: "p2",
    color: "#F59E0B",
    badge: "Surveillance · 5 years",
    title: "Dengue across Bangladesh",
    tagline: "Five years, eight divisions, 198,052 cases. When and where does dengue strike?",
    stats: [["198,052", "Total cases"], ["8", "Divisions"], ["12", "Charts"]],
    finding: "Reported cases fell by 99% during the 2020 lockdowns, then reached the highest level on record in 2023. About 62% of all cases were in Dhaka.",
    tags: ["Public health", "Surveillance", "Trends"]
  },
  {
    id: "p3",
    color: "#818CF8",
    badge: "Risk study",
    title: "Who gets diabetes?",
    tagline: "5,288 patient records. Which routine measurements point to diabetes risk?",
    stats: [["5,288", "Patients"], ["6.5%", "Had diabetes"], ["12", "Charts"]],
    finding: "Weight, blood sugar, and blood pressure carried most of the signal. Over half of diabetic patients also had high blood pressure.",
    tags: ["Risk factors", "Screening", "Chronic disease"]
  },
  {
    id: "p4",
    color: "#F472B6",
    badge: "Validation study",
    title: "Does the result hold up?",
    tagline: "The diabetes study repeated on 5,437 new patients, then tested by swapping the two datasets.",
    stats: [["5,437", "Patients"], ["6.3%", "Had diabetes"], ["12", "Charts"]],
    finding: "Both studies found nearly the same patterns. A check trained on one group worked on the other with a 0.3% change in accuracy.",
    tags: ["Validation", "Reproducibility"]
  }
];
