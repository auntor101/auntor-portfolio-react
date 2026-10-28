// Copy follows docs/instructions_v4 ("After" blocks). Project numbers are copied from the
// reference index.html, which is generated from results_a.json / results_b2.json.
export const site = {
  name: "Auntor Chakma",
  title: "Researcher",
  focus: "AI in Healthcare, Public Health, Data Analysis, AI Safety",
  subline: "Management Information System Officer, ASHIKA Development Associates (WFP-funded Mother and Child Benefit Programme)",
  tiles: [["1", "published paper"], ["2", "accepted papers"], ["1", "paper under review"], ["2", "interns mentored"]],
  // email is split so it is assembled in the browser (anti-scraping, per v4 section 11)
  email: ["auntorchakma", "gmail.com"],
  phone: ["01759859159", "+8801759859159"],
  links: [
    ["LinkedIn", "https://linkedin.com/in/auntor101"],
    ["GitHub", "https://github.com/auntor101"],
    ["Google Scholar", "https://scholar.google.com/citations?user=zhwU8sUAAAAJ&hl=en"],
    ["ORCID", "https://orcid.org/0009-0002-8220-8122"],
  ],
};

export const about = [
  "I am a researcher working on AI in healthcare and public health, with a focus on data analysis and AI safety. My work covers diabetic retinopathy grading, privacy-preserving skin-disease classification with federated learning and differential privacy, multimodal federated learning in healthcare, and biomedical signal processing for respiratory sound classification.",
  "I am also a Management Information System Officer at ASHIKA Development Associates, on a World Food Programme-funded mother and child nutrition programme. I turn field data into clear, reliable indicators and dashboards. I also mentor and advise early-career researchers in biomedical signal processing.",
];

export const experience = [
  { role: "Management Information System Officer", when: "Jul 2026 – Present", org: "ASHIKA Development Associates · Mother and Child Benefit Programme (funded by the World Food Programme)",
    points: ["Collect, clean and validate field data, resolving missing, duplicate and inconsistent records before reporting.", "Track nutrition and benefit-delivery indicators for mothers and children, and present progress to management and WFP through regular reports, dashboards and charts."] },
  { role: "Researcher and Research Assistant", when: "Aug 2025 – Sep 2026", org: "ELITE Research Lab LLC, Queens, NY (remote)",
    points: ["Led health-AI research on skin-disease classification with privacy-preserving federated learning and differential privacy, explainable AI for medical imaging, and a diabetic retinopathy severity ensemble with diffusion-based augmentation.", "Reviewed the literature on multimodal federated learning in healthcare; the review is accepted in Frontiers in Digital Health.", "Mentored and advised two interns on model design and training and on research writing in a biomedical signal processing project (respiratory sound classification); the advising is ongoing."] },
  { role: "Research Assistant, Department of CSE", when: "Dec 2024 – Jun 2025", org: "Rangamati Science and Technology University",
    points: ["Built a real-time network traffic dataset from Bangladesh telecommunications and trained CNN intrusion detectors, handling messy and imbalanced real-world data from collection to evaluation."] },
  { role: "B.Sc. in Computer Science and Engineering", when: "2025", org: "Rangamati Science and Technology University", points: [] },
];

export const publications = [
  { status: "Accepted", tone: "ok", date: "9 Aug 2026", title: "An Ensemble Approach for Diabetic Retinopathy Severity Classification with Diffusion-Based Augmentation and Explainability", venue: "HighTech and Innovation Journal (Q1, Scopus)",
    text: "Public fundus datasets are dominated by normal and mild cases, so models tend to miss the advanced stages where errors matter most. The paper combines diffusion-based augmentation, an ordinal loss, lesion-guided attention and a learned ensemble to reach 91.63% accuracy and an AUC of 0.9920 on 1,437 fundus photographs.",
    ga: "/img/ga-dr-ensemble.webp", alt: "Graphical abstract of the diabetic retinopathy ensemble" },
  { status: "Under review", tone: "warn", title: "Privacy-Preserving Skin Disease Classification Using Federated Learning with Formal Differential Privacy", venue: "Journal of Dermatological Science", href: "https://www.sciencedirect.com/journal/journal-of-dermatological-science",
    text: "The work trains a skin-disease classifier across sites with federated learning, so patient images stay where they were collected. It adds formal differential privacy (DP) to give a measurable privacy guarantee on the shared model updates." },
  { status: "Ongoing · Advisor", tone: "info", title: "Compact and Interpretable: Explainable Time–Frequency Transformers for Multi-Source Respiratory Sound Classification",
    text: "This biomedical signal processing project classifies respiratory sounds recorded from multiple sources with compact, interpretable time–frequency transformers. I mentored and advised two interns on model design and training and on research writing and paper structure." },
  { status: "Accepted", tone: "ok", date: "29 Sep 2026", title: "Multimodal Federated Learning with Privacy-Preserving Mechanisms in Healthcare: A Mini Review of Convergence, Challenges, and Future Directions", venue: "Frontiers in Digital Health",
    text: "The review surveys multimodal federated learning in healthcare and finds federated training stable at real scale. Among the empirical studies, only 1 of 8 (12.5%) applied a formal privacy mechanism to model updates, and none gave different data types their own protection.",
    ga: "/img/ga-mfl-review.webp", alt: "Graphical abstract of the multimodal federated learning review" },
  { status: "Published", tone: "done", date: "Jan 2026", title: "A Deep Learning-Based Framework for Bangla Vehicle License Plate Detection and Recognition", venue: "Springer CCIS, vol. 2683", href: "https://link.springer.com/chapter/10.1007/978-3-032-11355-9_16",
    text: "The pipeline first restores blurred, low-light plate images and then reads the plate as an ordered character sequence, which suits Bangla script better than Latin-script recognizers. On a synthetic Bangla plate dataset it reaches 96% character-level accuracy." },
];

export const mentoring = "I mentored and advised two interns in a biomedical signal processing project on respiratory sound classification, supporting them in model design and training and in research writing and paper structure. The advising is ongoing.";

export const skills = [
  ["Healthcare AI", "federated learning, explainable AI (Grad-CAM, SHAP, LIME), vision-language models, medical imaging, biomedical signal processing, public health data, AI safety"],
  ["Data analysis", "Python (pandas, NumPy, Matplotlib, Seaborn, Plotly), SQL (MySQL, PostgreSQL), data cleaning and validation"],
  ["Dashboards and reporting", "Power BI, Excel, Plotly Dash"],
  ["Machine learning", "PyTorch, TensorFlow, scikit-learn"],
  ["Research workflow", "Git and GitHub, Linux, LaTeX, technical writing"],
];

const L = (t, h) => ({ t, h });
export const projects = [
  { id: "A", stat: ["63.4% → 28.0%", "child stunting, 1990 to 2019"], tab: "A. Child malnutrition trends", name: "Child malnutrition trends in Bangladesh", script: "analysis_a2.py",
    objective: "Measure how fast child stunting and underweight have fallen in Bangladesh, test whether the pace is changing, and check whether the trend is consistent with a reference level for 2025.",
    data: [
      ["Source", "UNICEF/WHO/World Bank Joint Child Malnutrition Estimates (JME); sex split from WHO survey estimates"],
      ["Dataset links", [L("UNICEF malnutrition data", "https://data.unicef.org/topic/nutrition/malnutrition/"), L("World Bank indicator SH.STA.STNT.ZS", "https://data.worldbank.org/indicator/SH.STA.STNT.ZS?locations=BD"), L("mirror used for transcription: IndexMundi", "https://www.indexmundi.com/facts/bangladesh/malnutrition-prevalence")]],
      ["Records", "24 stunting and 24 underweight observations (1986–2019); 9 survey years by sex; 23 points (1990–2019) used in the main fit"],
      ["Caveat", "Values were transcribed from the mirror; reconcile with the official download before citing."],
    ],
    methods: "I fitted a log-linear regression of prevalence on year, with 95% intervals. The average annual reduction is 1 − exp(slope). A rank-based Theil–Sen slope checks that outliers do not drive the result. I fitted 1990–2007 and 2007–2019 separately. For the backtest, I fitted 1990–2013 and tested on 2014, 2018 and 2019. A paired t-test compares girls and boys across survey years.",
    findings: [
      "Stunting fell from 63.4% (1990) to 28.0% (2019), a drop of 35.4 points; underweight fell by 38.9 points. Average annual reduction: stunting 3.02% (95% CI 2.76–3.29, R² 0.964); robust slope 3.1% (2.85–3.32). Underweight 3.18% (2.78–3.58).",
      "The pace may have increased: 2.97% per year in 1990–2007 versus 3.59% in 2007–2019, but the intervals overlap (2.16–5.0 with only 6 survey points).",
      "The 1990–2013 trend over-predicted prevalence in all three held-out years (by 0.5, 1.8 and 3.8 points), so it understates recent progress; every observed value fell inside the 95% prediction interval.",
      "The 2025 trend value for stunting is 25.3% (95% PI 22.3–28.8), against a reference of 24.0% (40% below the 2012 level of 40.0%). The interval contains the reference, so the data cannot confirm or rule out reaching it.",
      "Girls' stunting was 0.64 points lower on average (95% CI −1.41 to 0.12, p = 0.09, 9 survey years): no clear sex difference.",
    ],
    helps: "A single annual-reduction figure with an interval gives programme teams a benchmark: a district or cohort declining more slowly than about 3.02% a year is falling behind the national pace. The backtest shows the benchmark is conservative, and the reference line turns the trend into a planning question: how much faster must we go?",
    limits: "National aggregates cannot explain why an individual child is stunted. Survey years are uneven, the 1991 value (73.6%) is a 10.2-point jump from 1990 in the source series, and projections extrapolate a past trend. An individual-level risk model needs BDHS or MICS microdata (registration required) and is the next step.",
    figs: [["/img/a_trend.webp", "Trend and projection for stunting and underweight", "Trend with 95% prediction band and reference level."], ["/img/a_segments_backtest.webp", "Pace by period and backtest on held-out years", "Pace by period (left) and backtest (right)."], ["/img/a_sex.webp", "Stunting by sex across survey years", "Stunting by sex and the girls-minus-boys gap."]] },
  { id: "B", stat: ["2,037,871", "reported cases in 6 waves"], tab: "B. COVID-19 surveillance", name: "COVID-19 surveillance and forecasting, Bangladesh", script: "analysis_b2.py (download the three CSV files first; see data/README.md)",
    objective: "Turn routine reported counts into wave summaries, a severity measure and a regional comparison, and test whether simple models forecast next week's cases better than a naive baseline.",
    data: [
      ["Source", "JHU CSSE COVID-19 Data Repository (open; archived 10 Mar 2023)"],
      ["Dataset link", [L("github.com/CSSEGISandData/COVID-19", "https://github.com/CSSEGISandData/COVID-19")]],
      ["Files", "time_series_covid19_confirmed_global.csv, time_series_covid19_deaths_global.csv, UID_ISO_FIPS_LookUp_Table.csv"],
      ["Records", "289 country/province series per file; Bangladesh = 1 series of 1,143 daily values (2020-01-22 to 2023-03-09); 163 complete weeks"],
      ["Checks", "0 missing values, 0 negative daily corrections, 88 days with zero new cases"],
    ],
    methods: "I summed daily counts into weekly totals. Waves are peaks in log weekly cases, with troughs as boundaries. Doubling time comes from the rise to each peak, and the fatality ratio uses a 2-week lag. I compared Bangladesh per million people with seven South Asian countries, using JHU population. For forecasting, I tested Ridge regression, a fixed damped-trend rule and a “same as last week” baseline. Each model was refit at 110 weekly origins from 2021-01-24, using an expanding window.",
    findings: [
      "2,037,871 reported cases and 29,445 deaths (crude fatality ratio 1.44%) over 1,143 days. 6 waves were detected; 5 major peaks of at least 10,000 weekly cases: 2020-06-28 (25,481), 2021-04-11 (47,392), 2021-08-01 (99,693), 2022-01-30 (100,196), 2022-07-03 (13,516). Doubling times during the rise ranged from 1.1 to 2.7 weeks.",
      "The lag-2 fatality ratio was 1.56%, 1.75% and 1.95% in waves 1–3 and 0.31% to 0.42% afterwards. This analysis cannot say why (vaccination, variants and testing all changed).",
      "A simple alert rule (two consecutive weeks with growth of at least 18%) fired 3–12 weeks (median 5) before each peak. It was defined after seeing the data and false alarms were not assessed, so it is illustrative.",
      "Bangladesh recorded 12,374 cases and 179 deaths per million, below India (32,384; 385), Nepal (34,360; 413) and Sri Lanka (31,384; 786) and above Pakistan (7,141; 139); testing differences limit interpretation.",
      "In 110 weekly forecast tests, mean absolute error was 5,056 cases for “same as last week”, 3,991 for the damped-trend rule (21% lower, better in 73% of weeks) and 5,143 for Ridge (61%). Ridge did not beat the baseline on average error. All models erred most in rising weeks.",
    ],
    helps: "The same routine counts that a monitoring team already collects can produce a wave table, an early-growth signal and a severity trend without new data collection. The forecast test sets an honest bar: a model is only useful if it beats the naive baseline, and here only the simple rule did.",
    limits: "Reported cases depend on testing and reporting and understate infections; deaths are under-reported too. The repository was archived in March 2023, so this is a retrospective exercise, not live surveillance. The damping factor (0.5) was fixed in advance, not tuned.",
    figs: [["/img/b_waves2.webp", "Weekly COVID-19 cases in Bangladesh with detected waves", "Detected waves (major waves labelled)."], ["/img/b_compare.webp", "South Asian comparison per million population", "Cumulative cases and deaths per million."], ["/img/b_rolling.webp", "Rolling-origin forecast test and error comparison", "Rolling-origin forecasts and error by model."]] },
  { id: "C", stat: ["590,005", "reported dengue cases, 2020 to 2025"], tab: "C. Dengue by division", name: "Dengue by division and season, Bangladesh", script: "analysis_c.py (download the two data files first; see data/README.md)",
    objective: "Show when and where dengue is concentrated in Bangladesh, how severe it is by division, and how closely monthly cases follow temperature and humidity, so that preparation can be timed and targeted.",
    data: [
      ["Source", "Mendeley Data: Monthly Division-Level Dengue Cases & Mortality with Climate and Environmental Indicators in Bangladesh (2020-2025), DOI 10.17632/cgwjshkx5k.2"],
      ["Dataset links", [L("data.mendeley.com/datasets/cgwjshkx5k", "https://data.mendeley.com/datasets/cgwjshkx5k"), L("file copy used: github.com/MehrazRumman/dengue-analysis", "https://github.com/MehrazRumman/dengue-analysis")]],
      ["Records", "574 rows × 11 columns; 14 blank rows (no month and no values) removed; 560 valid division-months = 8 divisions × 70 months (2020-01 to 2025-10)"],
      ["Checks", "0 duplicate division-months, 0 negative values, 0 rows with more deaths than cases; division names trimmed; temperature and pressure text converted to numbers"],
      ["Note", "The analysis here is my own; only the data files come from the public copy."],
    ],
    methods: "I cleaned and validated the data, then totalled cases by year and division. Incidence per 100,000 uses 2022 census populations, and I also computed each month’s share of cases. For climate, I used pooled within-division Spearman correlation between monthly cases (log) and temperature or humidity 0–3 months earlier.",
    findings: [
      "590,005 reported cases and 2,945 deaths (crude fatality 0.5%). 2023 alone had 323,971 cases (55% of the total) and 1,697 deaths; 2024 had 101,252 and 2025 to October 69,867.",
      "The season is short: September–November holds 64% of all cases (October alone 25.7%), and July–November held 86.4–94.7% of cases in each full year from 2021 to 2024.",
      "Over 2020–2025 the national rate was 347 cases per 100,000. Barishal (766) and Dhaka (717) were far above it; Sylhet (26) and Rangpur (56) were far below.",
      "Dhaka division reported 55% of cases but 70% of deaths, with the highest fatality (0.63%). Severe patients may be referred to Dhaka hospitals, so this does not prove the disease is more lethal there.",
      "Monthly cases track temperature three months earlier (ρ = 0.65, n = 536) and humidity one month earlier (ρ = 0.42, n = 552). Both climate and dengue are strongly seasonal, so this is an association, not proof of cause.",
    ],
    helps: "A health programme can time vector control and hospital readiness for the months before September, and focus first on the divisions with the highest rates. Separating incidence from fatality shows where the problem is many infections and where it is delayed or referred care.",
    limits: "Counts are reported (hospitalised) cases aggregated by month, so true infections are higher. One 2022 census population is used for all years. The dataset is a third-party compilation of official reports: its annual totals are close to publicly reported national figures (for example about 321,000 cases in 2023 against 323,971 here) but not identical. The data end in October 2025.",
    figs: [["/img/viz/v07_division_month_heatmap.webp", "Heatmap of mean monthly dengue incidence by division and month", "Season and geography together."], ["/img/viz/v09_division_streamgraph.webp", "Streamgraph of monthly dengue cases by division", "Monthly cases by division."], ["/img/viz/v10_burden_vs_severity.webp", "Bubble chart of incidence versus fatality by division", "Burden versus severity."]] },
];
