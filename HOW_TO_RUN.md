# How to run and deploy this portfolio

This is a React project built with Vite. It needs one install step on your
own machine. The build was not run inside the assistant's environment because
that sandbox has no reliable access to the npm registry.

## 1. Run locally
```
cd auntor-portfolio-react
npm install
npm run dev
```
Open the URL it prints, usually http://localhost:5173

## 2. Build for the web
```
npm run build
```
This creates a dist/ folder.

## 3. Deploy
- Netlify: connect the Git repo with build command `npm run build` and publish
  directory `dist`. The included netlify.toml sets the single-page-app redirect
  so project pages load correctly on refresh.
- Vercel: import the repo, choose the Vite preset, deploy.

## Layout: one file per section
```
src/
  data/        content and chart numbers, one file per section:
               hero, about, skills, experience, publications, projects,
               and p1..p4 for the chart data (each labelled with its CSV)
  lib/         charts.jsx (the SVG chart components), Tooltip.jsx
  components/  Nav, Hero, About, Skills, Projects, Publications,
               Experience, Footer, ChartBlock
  pages/       Landing.jsx, ProjectPage.jsx, content.jsx (chart text)
  App.jsx, main.jsx, styles.css
```

## Editing content
Everything you would want to change is in src/data/ and src/pages/content.jsx.
- Fix a job date: src/data/experience.js
- Change the summary: src/data/hero.js and src/data/about.js
- Edit a chart caption or finding: src/pages/content.jsx

## Where the data is
The numbers behind every chart are in src/data/p1.js to p4.js. Each file names
its source CSV at the top and was taken directly from it:
- p1.js  -> dataset.csv (1,000 dengue clinical patients)
- p2.js  -> dengu_dataset.csv (198,052 surveillance cases)
- p3.js  -> DiaBD diabetes dataset (5,288 patients)
- p4.js  -> Diabetes_Final_Data_V2.csv (5,437 patients)
