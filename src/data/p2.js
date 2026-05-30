// Source: dengu_dataset.csv (4,776 daily records, 198,052 total cases,
// 8 divisions, 2019–2023). Figures verified with pandas.
export const p2 = {
  yearly: [["2019", 37691], ["2020", 193], ["2021", 450], ["2022", 58406], ["2023", 101312]],
  monthly: [
    ["Jan", 884], ["Feb", 216], ["Mar", 108], ["Apr", 143], ["May", 1021], ["Jun", 5738],
    ["Jul", 43607], ["Aug", 59183], ["Sep", 27814], ["Oct", 29205], ["Nov", 23395], ["Dec", 6738]
  ],
  districts: [
    ["Dhaka", 122442], ["Chottogram", 26227], ["Barishal", 17845], ["Khulna", 15699],
    ["Rajshahi", 7193], ["Mymensingh", 4572], ["Rangpur", 2825], ["Sylhet", 1249]
  ],
  dhaka_split: [["Dhaka", 122442, "#F59E0B"], ["Rest of Bangladesh", 75610, "#3a4658"]],
  dhaka_by_year: [["2019", 19873], ["2020", 171], ["2021", 224], ["2022", 39893], ["2023", 62281]],
  covid: [["2019 (before)", 37691, "#F59E0B"], ["2020 (lockdown)", 193, "#3a4658"]],
  rebound: [["2021", 450, "#3a4658"], ["2022", 58406, "#b9780d"], ["2023", 101312, "#F59E0B"]],
  season: [["Quiet (Nov–May)", 26783, "#3a4658"], ["Outbreak (Jun–Oct)", 165547, "#F59E0B"]],
  peak_months: [["2019", "Sep", "18,235"], ["2022", "Oct", "21,025"], ["2023", "Aug", "50,246"]]
};
