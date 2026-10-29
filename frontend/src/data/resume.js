// All portfolio content lives here so you can edit copy without touching
// component code. Update the LinkedIn URL + email below to your real ones.

export const profile = {
  name: "Vinayak Rachha",
  title: "Python Developer · Backend · React · Full Stack",
  location: "Prabhadevi, Mumbai, India",
  email: "vinayakrachha@gmail.com",
  // TODO: replace with your real LinkedIn profile URL
  linkedin: "https://www.linkedin.com/in/r-vinayaka/",
  summary:
    "Python developer with 3+ years designing and shipping AI-driven applications, data pipelines, and analytics tools end to end. Strong in clean, tested, object-oriented Python with Pandas and NumPy for data wrangling, REST API design, SQL and NoSQL data modeling, and React front ends and dashboards. Hands-on with LLM/GenAI features — RAG, prompt engineering, and agent orchestration (function-calling and tool-use) over vector databases (Chroma) — and with resilient incremental ETL from third-party APIs and databases. Owns problems from design through testing, deployment (Docker, AWS, CI/CD), and clear, structured deliverables in Agile teams.",
};

export const skills = [
  {
    group: "Languages",
    items: [
      "Python (OOP, clean code, packaging)",
      "SQL",
      "JavaScript",
      "Node.js",
    ],
  },
  {
    group: "Backend",
    items: [
      "REST",
      "Flask",
      "Microservices",
      "Third-party API integration",
      "Async",
      "Multi-threading",
      "OAuth2.0 / SSO",
      "Redis",
    ],
  },
  {
    group: "Frontend & Dashboards",
    items: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML/CSS",
      "Bootstrap",
      "Responsive UI",
    ],
  },
  {
    group: "Data & Analytics",
    items: [
      "Pandas",
      "NumPy",
      "SQLAlchemy",
      "PostgreSQL",
      "MongoDB",
      "ETL",
      "Apache Airflow",
      "openpyxl",
    ],
  },
  {
    group: "Agentic AI / LLM",
    items: [
      "LangGraph",
      "Agentic tool-use & function-calling",
      "Multi-agent orchestration",
      "RAG",
      "AWS Bedrock (Claude)",
      "Vector databases (Chroma)",
      "Document parsing/OCR",
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS",
      "Docker",
      "Nginx",
      "Gunicorn",
      "Git",
      "CI/CD (Jenkins, GitHub Actions)",
    ],
  },
  {
    group: "Tools & Practices",
    items: [
      "PyCharm",
      "PyTest",
      "Unit testing",
      "SonarQube",
      "Agile/Scrum",
      "Jira",
      "VS Code",
    ],
  },
];

export const experience = [
  {
    role: "Senior Software Development Engineer",
    company: "Gamyam InfoTech LLP",
    location: "Hyderabad, Telangana, India",
    period: "Feb 2026 – Present",
    points: [
      "Built a production conversational AI agent (natural-language-to-SQL) in Python on AWS Bedrock (Claude): an agentic tool-use loop that calls execute-SQL and semantic-search tools with multi-step reasoning, grounded in RAG over a 3M+ vector store (Chroma), streaming responses to a React dashboard over Server-Sent Events (SSE).",
      "Engineered the agent’s orchestration and context layer: a deterministic semantic router short-circuits known questions to a verified query-template cache and falls back to the LLM agent, with schema-grounded prompts, per-session history, tool-result shaping, and Bedrock prompt caching of the ~21k-token context to cut token cost and throttling.",
      "Implemented authentication and tenant isolation (Microsoft Entra ID SSO) on a multi-tenant schema with secure defaults, and deployed the containerized Flask/Gunicorn service on AWS (EC2, RDS, Docker) behind an Nginx reverse proxy for TLS and SSE passthrough.",
      "Built the data platform and production hardening behind it: a PostgreSQL warehouse (SQL and materialized views) with resilient incremental ETL (delta reconciliation, rate-limit handling, resumable backfills), plus structured logging, per-query telemetry (SQL, latency, row counts), and a pytest suite covering the agent tools and chat flows.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Banyan Cloud",
    location: "Hyderabad, Telangana, India",
    period: "Feb 2023 – Feb 2026",
    points: [
      "Engineered REST API microservices (sync and async) for a multi-cloud CSPM/DSPM security platform across AWS, GCP, OCI and Azure, deployed on Kubernetes via Jenkins CI/CD.",
      "Built an end to end cloud log and data pipeline: collected logs via provider SDKs and CLIs using multi-threading and multi-processing, persisted them to PostgreSQL and MongoDB, computed metrics with Pandas and NumPy, orchestrated on Apache Airflow, and built multiple dashboard features in a React UI through contract-defined APIs.",
      "Drove security and quality with IaC guardrails and policy checks, NVD vulnerability detection, SonarQube gates, code reviews, and automated testing in Agile (Scrum, Jira).",
    ],
  },
];

export const education = [
  {
    degree: "B.E. Mechanical Engineering",
    school: "University of Mumbai",
    period: "Aug 2016 – Nov 2020",
  },
];

// A light background note — the pre-software, mechanical-engineering chapter.
export const background =
  "Before moving into software, I started out my career in mechanical engineering, where I worked as a Service Engineer and interned with Indian Railways and Rashtriya Chemicals & Fertilizers Limited during my graduation breaks.";

export const languages = {
  note: "Read, write & speak",
  items: ["English", "Hindi", "Telugu", "Marathi"],
};

export const hobbies = [
  { label: "Bike riding", icon: "🏍️" },
  { label: "Video gaming", icon: "🎮" },
  { label: "Watching anime", icon: "📺" },
];

export const projects = [
  {
    name: "Country Population Finder",
    stack: "React.js & Node.js",
    demo: "https://vinayak01.ccbp.tech/",
    points: [
      "Responsive single-page app to search and browse countries with population data, using asynchronous data fetching for live results.",
      "Client-side live search and filtering, with responsive Bootstrap and CSS layouts for a consistent experience across devices.",
    ],
  },
  {
    name: "SIP & Investment Calculator",
    stack: "Python & React",
    demo: "https://smilyidiot.github.io/SIP_calculator/",
    points: [
      "Full-stack SIP and lump-sum investment calculator: a REST API computes compounding projections (total invested, estimated returns, future value) consumed by a React 18 (hooks) + Vite single-page app.",
      "Year-by-year breakdown and a hand-built SVG growth chart with light/dark themes, plus a client-side fallback so the UI works offline; backend math covered by pytest.",
    ],
  },
];
