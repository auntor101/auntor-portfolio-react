// All four project pages' chart content. Findings are written as flat
// statements of what the data shows, not as enthusiastic commentary.
import {
  Donut, HBars, GroupedH, GroupedV, VBars, LineChart, VsCompare, Grid100,
  Gauge, Lollipop, Slope, KPITiles
} from "../lib/charts.jsx";
import { p1 } from "../data/p1.js";
import { p2 } from "../data/p2.js";
import { p3 } from "../data/p3.js";
import { p4 } from "../data/p4.js";

const GRAY = "#3a4658";
const k = v => (v >= 1000 ? (v / 1000).toFixed(0) + "k" : v);

/* Each entry: meta (banner + stat cards) and charts[] (12 blocks).
   A block is { q, sub, finding, el } or { caveat:{title,body} }. */

export const CONTENT = {
  /* ===================== P1 — DENGUE CLINICAL ===================== */
  p1: {
    color: "#00D4A0",
    badge: "Clinical study · 1,000 patients",
    title: "Dengue: reading the warning signs",
    tagline: "When a patient arrives with a fever in Dhaka, it may or may not be dengue. Looking at 1,000 such patients shows what separates the two groups.",
    intro: "Every patient here had a fever. Some had dengue and some did not. Comparing their symptoms, blood tests, and vital signs shows which measurements point to dengue early.",
    stats: [["1,000", "Patients seen"], ["533", "Had dengue", "53%"], ["467", "Did not"], ["Day 1", "When signs appear"]],
    charts: [
      { q: "How many fever patients actually had dengue?",
        sub: "Of 1,000 people who came in with a fever, this shows the share who turned out to have dengue.",
        finding: "533 of the 1,000 patients had dengue. During monsoon season in Dhaka, a fever is dengue more often than not.",
        el: <Gauge value={53} color="#00D4A0" label="of fever patients had dengue" note="533 of 1,000 patients. The rest had other causes of fever." /> },
      { q: "The clearest single signal: platelet count",
        sub: "Platelets help blood clot. This shows how many dengue patients (teal) and healthy patients (gray) fell into each platelet range.",
        finding: "The two groups barely overlap. Almost every dengue patient had platelets below 100,000, and almost every healthy patient was above 200,000. Of all the measurements here, this one separates the groups most cleanly.",
        el: <GroupedV items={p1.platelet_bins} labelKey="r" labA="Dengue patients" labB="Healthy patients" colA="#00D4A0" colB={GRAY} /> },
      { q: "Average platelet count, by group",
        sub: "The typical platelet count for each group, in thousands.",
        finding: "Dengue patients averaged about 72,000 against 243,000 for everyone else, roughly a third. The drop is a common effect of the dengue virus.",
        el: <VsCompare a={p1.platelet_avg[0]} b={p1.platelet_avg[1]} suffix="k" /> },
      { q: "Which symptoms pointed to dengue?",
        sub: "For each symptom, the share of dengue patients who had it (teal) against the share of healthy patients (gray).",
        finding: "Pain behind the eyes stands out most: 69% of dengue patients reported it, against 5% of the rest. Rash and muscle pain show a similar gap.",
        el: <GroupedH items={p1.symptoms} labelKey="s" labA="Dengue patients" labB="Healthy patients" colA="#00D4A0" colB={GRAY} /> },
      { q: "Did dengue patients run higher fevers?",
        sub: "Average body temperature for each group, in degrees Celsius.",
        finding: "Dengue patients averaged 39°C against about 37°C for the rest. A sustained high temperature is one of the earlier signs.",
        el: <VsCompare a={p1.temp[0]} b={p1.temp[1]} suffix="°C" /> },
      { q: "How long had the fever lasted?",
        sub: "Average number of days the fever had been present, by group.",
        finding: "Dengue fevers had lasted about 5 days, against roughly 1 day for other fevers. A fever that does not settle is a reason to test.",
        el: <VsCompare a={p1.fever_days[0]} b={p1.fever_days[1]} suffix=" days" /> },
      { q: "White blood cell count, by group",
        sub: "Average white blood cell count for each group. White blood cells fight infection.",
        finding: "Dengue patients had far fewer white blood cells, about 2,900 against 6,800. Combined with low platelets, this pattern is visible in a routine blood test.",
        el: <VsCompare a={p1.wbc[0]} b={p1.wbc[1]} /> },
      { q: "Is dengue tied to a particular age?",
        sub: "Number of dengue patients (teal) and non-dengue patients (gray) in each age group.",
        finding: "Dengue appeared across every age group, including children under 17. The data does not show one age group being spared.",
        el: <GroupedH items={p1.age} labelKey="a" labA="Had dengue" labB="Did not" colA="#00D4A0" colB={GRAY} suffix="" padL={90} /> },
      { q: "Men or women, who was affected more?",
        sub: "Dengue cases (teal) and non-cases (gray) split by gender.",
        finding: "The split is close: 281 women and 252 men had dengue. The data does not show a meaningful difference by gender.",
        el: <GroupedH items={p1.gender} labelKey="g" labA="Had dengue" labB="Did not" colA="#00D4A0" colB={GRAY} suffix="" padL={90} /> },
      { q: "Does living in a developed area change the risk?",
        sub: "Where the 1,000 patients lived, by area type.",
        finding: "Patients were split about evenly between developed and less-developed areas. The data does not show one type of area being protected.",
        el: <Donut segs={p1.areatype} centerLabel="developed" /> },
      { q: "How severe was the joint pain?",
        sub: "Joint-pain severity across all patients. Dengue is sometimes called breakbone fever for this reason.",
        finding: "About a third of patients reported severe joint pain, which is one of the more recognisable dengue symptoms.",
        el: <Donut segs={p1.jointpain} centerLabel="severe pain" /> },
      { caveat: {
        title: "A note on \"100% accurate\" results",
        body: "A model trained on this data can score close to 100%, which sounds ideal but is misleading. Two of the columns in the dataset are the official dengue lab tests (NS1 and IgG). A model that uses them is not really predicting dengue; it is reading a test result that already confirms it. The more useful question is whether dengue can be flagged before those tests return, using only what is available on the first day: fever, platelet count, and symptoms. The patterns above show that this is possible." } }
    ]
  },

  /* ===================== P2 — SURVEILLANCE ===================== */
  p2: {
    color: "#F59E0B",
    badge: "Surveillance · 5 years · 8 divisions",
    title: "Dengue across Bangladesh",
    tagline: "Five years of national case data, from 2019 to 2023, covering 198,052 cases across eight divisions.",
    intro: "This data tracks reported dengue cases nationwide. It shows a sharp drop during COVID lockdowns in 2020, followed by the highest case count on record in 2023, and a clear seasonal and geographic pattern.",
    stats: [["198,052", "Total cases"], ["8", "Divisions"], ["2023", "Worst year", "101,312"], ["62%", "In Dhaka"]],
    charts: [
      { q: "Five years of dengue at a glance",
        sub: "Total reported dengue cases across Bangladesh, by year.",
        finding: "Cases nearly disappeared in 2020, then rose to 101,312 in 2023, the highest in the five years. Both changes relate to the COVID period and the years that followed.",
        el: <LineChart items={p2.yearly} color="#F59E0B" fmtVal={k} /> },
      { q: "Cases during COVID lockdowns",
        sub: "Total dengue cases in the year before lockdowns against the lockdown year.",
        finding: "Reported cases fell from 37,691 to 193, a drop of about 99%. Much of this likely reflects reduced hospital access and testing during lockdowns rather than less actual dengue.",
        el: <VsCompare a={p2.covid[0]} b={p2.covid[1]} /> },
      { q: "The years after the lockdown",
        sub: "Total cases in the three years following the 2020 low.",
        finding: "Cases rose from 450 in 2021 to 101,312 in 2023. After two low years, fewer people had recent immunity, which can contribute to a large outbreak.",
        el: <VBars items={p2.rebound} color="#F59E0B" fmtVal={v => v.toLocaleString()} topVal={k} /> },
      { q: "When in the year does dengue peak?",
        sub: "Total cases by month, added across all five years. Taller bars are the higher-risk months.",
        finding: "August is the peak. The higher-risk period runs from July to October, after the monsoon rains, when standing water allows mosquitoes to breed.",
        el: <VBars items={p2.monthly} color="#F59E0B" highlight={(l, v) => v > 20000} topVal={v => v >= 1000 ? k(v) : ""} /> },
      { q: "How much risk is in the monsoon months?",
        sub: "All cases divided into the quiet season and the outbreak season.",
        finding: "About 84% of cases fell within June to October. Prevention efforts have the most effect when focused on this window.",
        el: <Donut segs={p2.season} centerLabel="in outbreak season" /> },
      { q: "Which divisions are most affected?",
        sub: "Total dengue cases in each division over the five years, ranked from highest.",
        finding: "Dhaka had 122,442 cases, far more than any other division. Density, movement of people, and more complete reporting all contribute. Chottogram is second.",
        el: <Lollipop items={p2.districts.map(d => [d[0], d[1], d[0] === "Dhaka" ? "#F59E0B" : "rgba(245,158,11,.55)"])} color="#F59E0B" fmtVal={v => v.toLocaleString()} padL={110} /> },
      { q: "Dhaka against the rest of the country",
        sub: "Share of all national cases that came from Dhaka.",
        finding: "Dhaka accounted for about 62% of all cases. Controlling the outbreak in the capital affects most of the national total.",
        el: <Donut segs={p2.dhaka_split} centerLabel="in Dhaka" /> },
      { q: "Dhaka's cases by year",
        sub: "Dengue cases in Dhaka division alone, by year.",
        finding: "Dhaka follows the national pattern: low during COVID, then 62,281 cases in 2023.",
        el: <LineChart items={p2.dhaka_by_year} color="#F59E0B" fmtVal={k} /> },
      { q: "The calmest month against the worst",
        sub: "The lowest-case month (March) against the highest (August), summed across all years.",
        finding: "August had 59,183 cases and March had 108. Dengue is strongly seasonal, which means the timing of prevention is predictable.",
        el: <VsCompare a={["August (highest)", 59183, "#F59E0B"]} b={["March (lowest)", 108, GRAY]} /> },
      { q: "The peak month in each outbreak year",
        sub: "The single highest-case month in each of the major outbreak years.",
        finding: "The peak fell in September in 2019, October in 2022, and August in 2023. The exact month shifts with the weather but stays in the post-monsoon period.",
        el: (
          <div className="vs-wrap">
            {p2.peak_months.map(([yr, mo, cs], i) => (
              <div className="vs-col" key={i} style={{ textAlign: "center" }}>
                <div className="vs-big" style={{ color: "#F59E0B", fontSize: 30 }}>{mo}</div>
                <div className="vs-cap"><b style={{ color: "#F0F4FF" }}>{yr}</b> — {cs} cases</div>
              </div>
            ))}
          </div>
        ) },
      { q: "The five-year total",
        sub: "Every reported case across the whole period.",
        finding: "198,052 cases over five years, an average of about 108 per day. Each case is a person who needed care.",
        el: (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: 60, fontWeight: 700, color: "#F59E0B", lineHeight: 1 }}>198,052</div>
            <div style={{ color: "var(--body)", fontSize: 15, marginTop: 10 }}>people diagnosed with dengue, 2019 to 2023</div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>across 8 divisions, about 108 per day on average</div>
          </div>
        ) },
      { caveat: {
        title: "What a health planner can take from this",
        body: "Three points are usable. Timing: the risk is concentrated from June to October, so prevention should begin in late spring. Place: Dhaka holds about 62% of cases, so it warrants the largest share of resources. Cycles: low years can be followed by large outbreaks, so a quiet year is not a reason to reduce effort. This is the kind of evidence that turns case counts into planning decisions." } }
    ]
  },

  /* ===================== P3 — DIABETES RISK ===================== */
  p3: {
    color: "#818CF8",
    badge: "Risk study · 5,288 patients",
    title: "Who gets diabetes?",
    tagline: "Using the health records of 5,288 patients, this looks at which everyday measurements signal diabetes risk.",
    intro: "About 1 in 15 patients here had diabetes, which makes it relatively uncommon and harder to detect. Comparing diabetic patients against the rest shows which routine measurements carry the most signal.",
    stats: [["5,288", "Patients"], ["342", "Had diabetes", "6.5%"], ["54%", "Of them had high BP"], ["50", "Average age, diabetic"]],
    charts: [
      { q: "How common was diabetes in this group?",
        sub: "Of all 5,288 patients, how many had diabetes and how many did not.",
        finding: "6.5% had diabetes, about 1 in 15. When a condition is this uncommon, the signals that identify it have to be found carefully.",
        el: <Gauge value={6.5} color="#818CF8" label="of patients had diabetes" note="342 of 5,288 patients. About 1 in 15." /> },
      { q: "Does body weight change the risk?",
        sub: "For each weight category, the percentage of people who had diabetes. A longer bar means higher risk.",
        finding: "Diabetes was about twice as common in overweight patients (10.8%) as in normal-weight patients (6.0%). Weight is one of the few risk factors a person can change.",
        el: <HBars items={p3.bmi_rate} color="#818CF8" fmtVal={v => v + "%"} padL={140} /> },
      { q: "Does risk rise with age?",
        sub: "The percentage of people with diabetes in each age group.",
        finding: "Risk rises from under 2% in the twenties to about 10% in the fifties. The slight fall after 70 likely reflects fewer older patients in the data.",
        el: <LineChart items={p3.age_rate} color="#818CF8" fmtVal={v => v + "%"} /> },
      { q: "Blood sugar, by group",
        sub: "Average blood sugar for diabetic and healthy patients, in mmol/L.",
        finding: "Diabetic patients averaged 11.0 against 7.3 for healthy patients. This is close to how diabetes is defined, so a blood sugar reading is the main front-line check.",
        el: <VsCompare a={p3.glucose[0]} b={p3.glucose[1]} /> },
      { q: "How blood sugar separates the groups",
        sub: "Patients grouped by blood sugar level. Purple bars are diabetic patients, gray are healthy.",
        finding: "Healthy patients dominate the low and below-average ranges. Diabetic patients become the larger group only in the very high range, which is where clinical thresholds are set.",
        el: <GroupedV items={p3.glucose_bins} labelKey="r" labA="Diabetic" labB="Healthy" colA="#818CF8" colB={GRAY} /> },
      { q: "Blood pressure, by group",
        sub: "Average top-number (systolic) blood pressure for each group.",
        finding: "Diabetic patients averaged 147 against 133 for the rest. Diabetes and high blood pressure often occur together.",
        el: <VsCompare a={p3.systolic[0]} b={p3.systolic[1]} /> },
      { q: "The link with high blood pressure",
        sub: "Share of people with high blood pressure, among diabetic patients against the whole group.",
        finding: "54% of diabetic patients also had high blood pressure, against 11% across everyone. A patient with one condition is worth checking for the other.",
        el: <Gauge value={54} color="#818CF8" label="of diabetic patients had high BP" note="Against 11% across all patients. The two conditions travel together." /> },
      { q: "Average age, by group",
        sub: "Average age of diabetic patients against everyone else.",
        finding: "Diabetic patients were on average 50 years old against 45 for the rest. Risk accumulates over time, so older patients warrant closer screening.",
        el: <VsCompare a={p3.age_avg[0]} b={p3.age_avg[1]} suffix=" yrs" /> },
      { q: "Who was in this study?",
        sub: "The gender breakdown of all 5,288 patients.",
        finding: "About 71% of patients were women. The patterns are strongest for the group that is most represented in the data.",
        el: <Donut segs={p3.gender} centerLabel="women" /> },
      { q: "Which factors carried the most signal?",
        sub: "A plain-language ranking of how strongly each factor pointed toward diabetes in this data. A longer bar means a stronger signal.",
        finding: "Weight, blood sugar, and blood pressure led. The first three can all be measured quickly, and in many cases improved.",
        el: <Lollipop items={p3.risk_ranked} color="#818CF8" padL={210} fmtVal={v => v === 100 ? "strongest" : ""} /> },
      { q: "Could a simple check find diabetes early?",
        sub: "A basic screening rule was built from these everyday numbers and tested against the real diabetic patients. Each square is one of 100 diabetic patients.",
        finding: "The check correctly flagged 63 of every 100 diabetic patients. That is a reasonable start for an uncommon condition, but it is not a substitute for a clinical diagnosis.",
        el: <Grid100 n={p3.caught} color="#818CF8" /> },
      { caveat: {
        title: "The bottom line",
        body: "The main warning signs here, weight, blood sugar, and blood pressure, are simple to measure and often improvable. The limitation is that because only about 1 in 15 patients had diabetes, even a reasonable screening rule misses some real cases. Analysis like this is useful for guiding screening and prevention, not for replacing a diagnosis. Its value is in showing who to examine more closely." } }
    ]
  },

  /* ===================== P4 — VALIDATION ===================== */
  p4: {
    color: "#F472B6",
    badge: "Validation study · 5,437 patients",
    title: "Does the result hold up?",
    tagline: "A finding seen once can be chance. The diabetes study was repeated on 5,437 different patients, then tested by swapping the two datasets.",
    intro: "A result that cannot be reproduced is of limited use. This repeats the earlier diabetes study on a separate group of patients, then trains a check on one group and tests it on the other. If the patterns are real, the results should change very little. They did not.",
    stats: [["5,437", "New patients"], ["6.3%", "Had diabetes"], ["78", "Of 100 caught", "up from 63"], ["0.3%", "Change when swapped"]],
    charts: [
      { q: "A new group of patients, the same diabetes rate",
        sub: "Of the 5,437 new patients, how many had diabetes.",
        finding: "6.3% had diabetes, close to the 6.5% in the first study. Two separate groups landing on almost the same rate is the first sign the result is stable.",
        el: <Donut segs={p4.prevalence} centerLabel="had diabetes" /> },
      { q: "Do both studies agree on how common diabetes is?",
        sub: "The diabetes rate in each of the two independent studies.",
        finding: "6.5% against 6.3%, a difference small enough to treat as none. Agreement between separate studies raises confidence in the finding.",
        el: <Slope items={[{ f: "Diabetes rate", s1: 6.5, s2: 6.3 }]} labA="Study 1" labB="Study 2" colA="#818CF8" colB="#F472B6" suffix="%" /> },
      { q: "The weight pattern, repeated",
        sub: "Percentage with diabetes in each weight category, in the second study.",
        finding: "Overweight patients again had about twice the risk of normal-weight patients (10.5% against 5.9%), matching the first study.",
        el: <HBars items={p4.bmi_rate} color="#F472B6" fmtVal={v => v + "%"} padL={140} /> },
      { q: "The age pattern, repeated",
        sub: "Percentage with diabetes by age group, in the second study.",
        finding: "Risk rises with age and peaks in the fifties, the same shape as the first study.",
        el: <LineChart items={p4.age_rate} color="#F472B6" fmtVal={v => v + "%"} /> },
      { q: "The blood sugar gap, repeated",
        sub: "Average blood sugar, diabetic against healthy, in the second study (mmol/L).",
        finding: "Diabetic patients again averaged 11.0 against 7.3, matching the first study.",
        el: <VsCompare a={p4.glucose[0]} b={p4.glucose[1]} /> },
      { q: "The blood pressure gap, repeated",
        sub: "Average top-number blood pressure for each group, in the second study.",
        finding: "147 against 133, again the same as the first study.",
        el: <VsCompare a={p4.systolic[0]} b={p4.systolic[1]} /> },
      { q: "The high blood pressure link, repeated",
        sub: "Share with high blood pressure, among diabetic patients against everyone, in the second study.",
        finding: "About 53% of diabetic patients had high blood pressure, close to the 54% in the first study.",
        el: <VsCompare a={p4.htn[0]} b={p4.htn[1]} suffix="%" /> },
      { q: "Do both studies rank the factors the same way?",
        sub: "Each line connects a warning sign's strength in study 1 (left) to its strength in study 2 (right). Flatter lines mean closer agreement.",
        finding: "Blood sugar and blood pressure stay near the top in both studies. Weight shifts more, but the leading factors are the same.",
        el: <Slope items={p4.risk_compare} labA="Study 1" labB="Study 2" colA="#818CF8" colB="#F472B6" /> },
      { q: "The early check improved",
        sub: "Of 100 real diabetic patients in study 2, how many the screening check flagged. Each square is one patient.",
        finding: "The check flagged 78 of 100, up from 63 in the first study. More balanced data gave the rule more to work with.",
        el: <Grid100 n={p4.caught} color="#F472B6" /> },
      { q: "Catching at-risk patients, study 1 against study 2",
        sub: "How many of every 100 diabetic patients each study's check flagged.",
        finding: "63 against 78. Repeating a study also gives a chance to refine the tools built from it.",
        el: <KPITiles tiles={[
          ["63", "of 100 caught in study 1", "#818CF8"],
          ["78", "of 100 caught in study 2", "#F472B6", "up 15"]
        ]} /> },
      { q: "The main test: swap the two datasets",
        sub: "A check was trained on one study's patients and tested on the other study's patients, which it had never seen. If it still works, the pattern is not specific to one dataset.",
        finding: "A check trained on one group worked on the other with a drop of about 0.3%. This indicates the warning signs are not artefacts of one dataset.",
        el: (
          <div className="cross-grid">
            <div className="cross-card">
              <div className="cross-title">Trained on study 1, then</div>
              <div className="cross-row"><span className="cross-key">Tested on its own patients</span><span className="cross-val" style={{ color: "#818CF8" }}>{p4.cross.s1_home}%</span></div>
              <div className="cross-row"><span className="cross-key">Tested on study 2's patients</span><span className="cross-val" style={{ color: "#F472B6" }}>{p4.cross.s1_away}%</span></div>
              <div className="cross-row"><span className="cross-key">Change</span><span className="cross-val" style={{ color: "#00D4A0" }}>{p4.cross.s1_drop}%</span></div>
            </div>
            <div className="cross-card">
              <div className="cross-title">Trained on study 2, then</div>
              <div className="cross-row"><span className="cross-key">Tested on its own patients</span><span className="cross-val" style={{ color: "#F472B6" }}>{p4.cross.s2_home}%</span></div>
              <div className="cross-row"><span className="cross-key">Tested on study 1's patients</span><span className="cross-val" style={{ color: "#818CF8" }}>{p4.cross.s2_away}%</span></div>
              <div className="cross-row"><span className="cross-key">Change</span><span className="cross-val" style={{ color: "#00D4A0" }}>{p4.cross.s2_drop}%</span></div>
            </div>
          </div>
        ) },
      { caveat: {
        title: "Why this study matters most",
        body: "A pattern found in one dataset can be coincidence. The test of whether to trust it is whether it repeats. Here two independent studies, on more than 10,000 patients combined, found the same diabetes warning signs, and a check trained on one group worked on the other with little change. That is the difference between an interesting result and a dependable one, and public-health decisions should rest on the dependable kind." } }
    ]
  }
};
