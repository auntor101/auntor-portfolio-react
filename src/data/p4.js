// Source: Diabetes_Final_Data_V2.csv (5,437 patients, 344 diabetic = 6.3%).
// Cross-dataset test trains a check on one study's patients and tests it on
// the other study's patients. All figures verified with pandas.
export const p4 = {
  prevalence: [["Has diabetes", 344, "#F472B6"], ["No diabetes", 5093, "#3a4658"]],
  bmi_rate: [["Underweight", 2.9], ["Normal weight", 5.9], ["Overweight", 10.5], ["Obese", 9.8]],
  age_rate: [["20–29", 1.6], ["30–39", 4.2], ["40–49", 6.2], ["50–59", 9.6], ["60–69", 9.2], ["70+", 6.4]],
  glucose: [["Diabetic", 11.0, "#F472B6"], ["Healthy", 7.3, "#3a4658"]],
  systolic: [["Diabetic", 147, "#F472B6"], ["Healthy", 133, "#3a4658"]],
  htn: [["Among diabetic patients", 53, "#F472B6"], ["Among everyone", 11, "#3a4658"]],
  prevalence_compare: [["Study 1 (5,288 patients)", 6.5, "#818CF8"], ["Study 2 (5,437 patients)", 6.3, "#F472B6"]],
  risk_compare: [
    { f: "High blood sugar", s1: 88, s2: 100 }, { f: "High blood pressure", s1: 86, s2: 90 },
    { f: "Weight", s1: 100, s2: 61 }, { f: "Older age", s1: 62, s2: 26 }
  ],
  caught_compare: [["Study 1 screening", 63, "#818CF8"], ["Study 2 screening", 78, "#F472B6"]],
  caught: 78,
  cross: { s1_home: 84.2, s1_away: 83.9, s1_drop: 0.3, s2_home: 83.5, s2_away: 83.6, s2_drop: 0.1 }
};
