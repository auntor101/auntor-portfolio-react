// Source: dataset.csv (1,000 fever patients, Dhaka). All figures verified
// directly from the file with pandas. Outcome=1 means confirmed dengue.
export const p1 = {
  outcome: [["Had dengue", 533, "#00D4A0"], ["Did not", 467, "#3a4658"]],
  platelet_bins: [
    { r: "Below 50k", d: 44, h: 0 }, { r: "50k–100k", d: 470, h: 0 },
    { r: "100k–150k", d: 19, h: 3 }, { r: "150k–200k", d: 0, h: 57 },
    { r: "Above 200k", d: 0, h: 407 }
  ],
  symptoms: [
    { s: "Headache", d: 80, h: 28 }, { s: "Muscle pain", d: 72, h: 16 },
    { s: "Pain behind eyes", d: 69, h: 5 }, { s: "Skin rash", d: 65, h: 7 }
  ],
  temp: [["Dengue patients", 39.0, "#00D4A0"], ["Everyone else", 37.0, "#3a4658"]],
  platelet_avg: [["Dengue patients", 72, "#00D4A0"], ["Everyone else", 243, "#3a4658"]],
  wbc: [["Dengue patients", 2892, "#00D4A0"], ["Everyone else", 6756, "#3a4658"]],
  fever_days: [["Dengue patients", 5, "#00D4A0"], ["Everyone else", 1, "#3a4658"]],
  age: [
    { a: "0–17", d: 101, h: 82 }, { a: "18–29", d: 100, h: 102 },
    { a: "30–44", d: 148, h: 116 }, { a: "45–59", d: 138, h: 121 }, { a: "60+", d: 46, h: 46 }
  ],
  gender: [{ g: "Women", d: 281, h: 243 }, { g: "Men", d: 252, h: 224 }],
  areatype: [["Developed areas", 501, "#00D4A0"], ["Less-developed areas", 499, "#3a4658"]],
  jointpain: [["Severe", 335, "#00D4A0"], ["Moderate", 174, "#0a8f6e"], ["None / mild", 491, "#3a4658"]]
};
