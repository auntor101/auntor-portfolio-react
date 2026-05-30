// Source: DiaBD_A_Diabetes_Dataset...csv (5,288 patients, 342 diabetic = 6.5%).
// Glucose in mmol/L. All figures verified with pandas.
export const p3 = {
  prevalence: [["Has diabetes", 342, "#818CF8"], ["No diabetes", 4946, "#3a4658"]],
  bmi_rate: [["Underweight", 3.0], ["Normal weight", 6.0], ["Overweight", 10.8], ["Obese", 10.0]],
  age_rate: [["20–29", 1.7], ["30–39", 4.2], ["40–49", 6.2], ["50–59", 9.6], ["60–69", 9.2], ["70+", 6.8]],
  glucose: [["Diabetic", 11.0, "#818CF8"], ["Healthy", 7.3, "#3a4658"]],
  systolic: [["Diabetic", 147, "#818CF8"], ["Healthy", 133, "#3a4658"]],
  age_avg: [["Diabetic", 50, "#818CF8"], ["Healthy", 45, "#3a4658"]],
  htn: [["Among diabetic patients", 54, "#818CF8"], ["Among everyone", 11, "#3a4658"]],
  glucose_bins: [
    { r: "Low", d: 56, h: 1324 }, { r: "Below average", d: 81, h: 2420 },
    { r: "Borderline", d: 25, h: 537 }, { r: "High", d: 43, h: 410 }, { r: "Very high", d: 137, h: 254 }
  ],
  gender: [["Women", 3752, "#818CF8"], ["Men", 1536, "#3a4658"]],
  risk_ranked: [
    ["Being overweight or obese", 100], ["High blood sugar", 88],
    ["High blood pressure", 86], ["Older age", 62], ["Family history", 48]
  ],
  caught: 63
};
