# Auntor Chakma: portfolio

React + Vite. Routes use a hash router, so direct links look like `/#/project/a`.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Layout
```
src/data/        site.js (all copy) and the analysis results as JSON:
                 nutrition.json, covid.json, dengue.json, viz.json
src/components/  Nav, Hero, Story (About, Experience), Research, Projects, Contact
src/projects/    ProjectPage.jsx plus ChartsA/B/C.jsx (five charts per project)
public/img/      figures and the 10-chart gallery (WebP)
```

Every number on the project pages is read from the JSON files or copied from the
analysis output. If an analysis is re-run, replace the JSON and the text in
`src/data/site.js`.

Deploy `dist/` to Vercel or Netlify (`netlify.toml` is included).
