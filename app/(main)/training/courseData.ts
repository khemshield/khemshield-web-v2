import { StaticImageData } from "next/image";

import ai from "@/public/assets/images/training/ai-engineering.png";
import agentic_ai from "@/public/assets/images/training/agentic-ai.png";
import cloud_computing from "@/public/assets/images/training/cloud_computing.png";
import cybersecurity from "@/public/assets/images/training/cybersecurity.jpg";
import dart from "@/public/assets/images/training/dart.jpg";
import data_science from "@/public/assets/images/training/data-science.png";
import frontend from "@/public/assets/images/training/frontend.jpg";
import fullstack from "@/public/assets/images/training/fullstack.png";
import infosec from "@/public/assets/images/training/infosec.jpg";
import javascript from "@/public/assets/images/training/javascript.png";
import mobile_app from "@/public/assets/images/training/mobile_app.png";
import python from "@/public/assets/images/training/python.png";

/**
 * Course registry, single source of truth for the /training list AND the
 * /training/[slug] detail pages.
 *
 * Required fields (name, price, rating, etc.) render the card and the detail
 * hero. The optional fields below progressively enrich the detail page; the
 * template shows a section only when its data exists, so a thin course still
 * renders a clean, complete page, it just deepens as you fill these in.
 *
 * To add a course: add one entry. To make it richer: fill more optional fields.
 */

export type CoursePhase = {
  title: string;
  subtitle?: string;
  topics: string[];
  tools?: string[];
};

export type Course = {
  slug: string;
  name: string;
  category: string;
  image: StaticImageData;
  price: number;
  rating: number;
  reviewCount: number;
  // ── optional, progressively enriches the detail page ──
  tagline?: string;
  overview?: string;
  audience?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  durationWeeks?: number;
  outcomes?: string[];
  prerequisites?: string[];
  tools?: string[];
  curriculum?: CoursePhase[];
  certifications?: string[];
};

export const courses: Course[] = [
  // ───────────────────────── Cybersecurity ─────────────────────────
  {
    slug: "infosec-fundamentals",
    name: "InfoSec (Fundamentals)",
    category: "Cybersecurity",
    image: infosec,
    price: 120000,
    rating: 4.5,
    reviewCount: 8,
    level: "Beginner",
    durationWeeks: 8,
    tagline: "Master the core principles that underpin all of security.",
    overview:
      "A foundational program covering how information security really works, the concepts, threats, and controls every security professional builds on. The perfect first step before specialising.",
    audience: "Beginners and IT staff moving into security.",
    outcomes: [
      "Understand the CIA triad and core security principles",
      "Identify common threats, vulnerabilities, and attack vectors",
      "Apply access control, encryption, and network security basics",
      "Recognise risk and the fundamentals of governance",
    ],
    prerequisites: ["Basic computer and networking literacy"],
  },
  {
    slug: "security-analyst",
    name: "Security Analyst",
    category: "Cybersecurity",
    image: cybersecurity,
    price: 350000,
    rating: 4.5,
    reviewCount: 34,
    level: "Intermediate",
    durationWeeks: 24,
    tagline: "Detect, analyse, and respond to real-world threats.",
    overview:
      "A complete path into the Security Operations Center, delivered in two tracks. The 3-month Core Skills Track builds your foundation: security principles, risk management and frameworks, network defence, and operating system fundamentals. The 6-month Applied Track carries on from there into hands-on threat and vulnerability assessment, incident analysis and response workflows, Python scripting, and a guided career launch. Start with the Core track and continue into Applied, or take the full program end to end.",
    audience:
      "Aspiring SOC analysts, IT and helpdesk staff moving into security, and career changers. The Core track assumes no security background; the Applied track builds on it.",
    prerequisites: [
      "Basic computer and networking literacy",
      "No prior security experience required for the Core track",
    ],
    outcomes: [
      "Explain core security principles, threats, and attacker techniques",
      "Apply risk management with the NIST RMF and common control frameworks",
      "Monitor systems and investigate alerts with SIEM platforms",
      "Analyse network traffic and harden networks, systems, and the cloud",
      "Work confidently on the Linux command line",
      "Query and investigate data with SQL",
      "Assess vulnerabilities and run the incident response lifecycle",
      "Automate security tasks with Python",
      "Build a portfolio and prepare for analyst interviews",
    ],
    tools: [
      "Linux",
      "Python",
      "SQL",
      "Wireshark",
      "Splunk",
      "Nmap",
      "Nessus",
      "VirtualBox / VMware",
      "Git / GitHub",
    ],
    certifications: [
      "Certifications are optional. The hands-on labs and the portfolio you build carry the most weight with employers.",
    ],
    curriculum: [
      {
        title: "Cybersecurity Foundations",
        subtitle: "What security means, and what an analyst actually does",
        topics: [
          "What security means in practice and the value of cybersecurity",
          "Security analyst responsibilities and the core skills of the role",
          "Malware types and common attack vectors",
          "Social engineering techniques",
          "Attack types and threat actor profiles",
          "Core security domains (CISSP aligned)",
          "Ethics in cybersecurity",
          "Starting your cybersecurity portfolio",
        ],
      },
      {
        title: "Risk Management and Security Frameworks",
        subtitle:
          "Building the Shield, governing risk with proven frameworks and controls",
        topics: [
          "Threat analysis, risk exposure, and vulnerabilities",
          "Security frameworks and controls",
          "The NIST Risk Management Framework (RMF)",
          "Security frameworks in practice",
          "Security controls and implementation",
          "Secure design principles",
          "Security audits and assessments",
          "The layers of the web",
        ],
      },
      {
        title: "Security Operations, Monitoring and SIEM",
        subtitle: "Detect and investigate threats the way a SOC does",
        topics: [
          "Security monitoring concepts and the role of SIEM",
          "Logs and log management",
          "SIEM dashboards and alert interpretation",
          "Common SIEM platforms",
          "Network traffic analysis tools",
          "Playbooks and response workflows",
          "The incident response lifecycle",
          "Incident response playbooks",
        ],
        tools: ["Splunk", "Wireshark"],
      },
      {
        title: "Network Fundamentals for Defenders",
        subtitle: "How networks work, and how attackers and defenders use them",
        topics: [
          "Network structure, architecture, and standard tools",
          "The TCP/IP model and common network protocols",
          "Cloud networking fundamentals",
          "Virtual Private Networks (VPNs)",
          "Firewalls, security zones, and proxy servers",
          "Network intrusion techniques",
          "Network attack prevention strategies",
          "Network and cloud network hardening",
        ],
        tools: ["Wireshark", "Nmap"],
      },
      {
        title: "Computing and Operating System Fundamentals",
        subtitle: "Operating systems, virtualization, and the Linux command line",
        topics: [
          "Core functions of an operating system",
          "How operating systems, applications, and hardware relate",
          "Common operating systems and virtualization technologies",
          "GUIs versus command-line interfaces",
          "Linux architecture and distributions",
          "The shell and command line",
          "File system navigation and management",
          "System and operating system hardening",
        ],
        tools: ["Linux", "VirtualBox / VMware"],
      },
      {
        title: "Databases and SQL for Analysts",
        subtitle: "Store, query, and investigate data with SQL",
        topics: [
          "User authentication and authorization",
          "Access control concepts",
          "Relational and non-relational databases",
          "SQL and NoSQL fundamentals",
          "Data filtering and conditions in SQL",
          "Combining data across tables",
        ],
        tools: ["SQL"],
      },
      {
        title: "Threat Analysis and Vulnerability Assessment",
        subtitle: "Applied Track begins, find weaknesses before attackers do",
        topics: [
          "Threat modelling and the attacker mindset",
          "Vulnerability scanning and assessment",
          "Prioritising and scoring vulnerabilities",
          "Mapping threats to controls and mitigations",
          "Reporting and communicating risk",
        ],
        tools: ["Nessus", "OpenVAS", "Nmap"],
      },
      {
        title: "Incident Analysis, Alerting and Response Workflows",
        subtitle: "Run investigations and response end to end",
        topics: [
          "Building and tuning detection and alerting rules",
          "Triaging and correlating alerts",
          "Investigating incidents across logs and network data",
          "Containment, eradication, and recovery workflows",
          "Documenting findings and post-incident review",
        ],
        tools: ["Splunk"],
      },
      {
        title: "Python Scripting for Security",
        subtitle: "Automate the repetitive parts of the job",
        topics: [
          "Python fundamentals for security tasks",
          "Parsing logs and files programmatically",
          "Automating data collection and enrichment",
          "Interacting with APIs and security tools",
          "Building small scripts to speed up investigations",
        ],
        tools: ["Python"],
      },
      {
        title: "Career Launch",
        subtitle: "Portfolio, interviews, and job readiness",
        topics: [
          "Building a security analyst portfolio",
          "Tailoring your CV and online profiles",
          "Interview preparation and common questions",
          "Practical labs and a capstone walkthrough",
          "Job search strategy and readiness",
        ],
      },
    ],
  },

  // ──────────────────────────── AI ────────────────────────────────
  {
    slug: "ai-engineering",
    name: "AI Engineering (LLMs & Applied ML)",
    category: "AI",
    image: ai,
    price: 350000,
    rating: 5,
    reviewCount: 12,
    level: "Intermediate",
    durationWeeks: 10,
    tagline: "Build production AI applications with LLMs and applied ML.",
    overview:
      "Go beyond demos. Learn to design, build, and ship real AI features, working with large language models, retrieval, and evaluation, the way modern AI teams do.",
    audience: "Developers building AI-powered products.",
    outcomes: [
      "Engineer effective prompts and structured outputs",
      "Build retrieval-augmented generation (RAG) systems",
      "Integrate model APIs and evaluate AI quality",
      "Deploy and monitor AI features in production",
    ],
    prerequisites: ["Comfort programming in Python"],
  },
  {
    slug: "agentic-ai-development",
    name: "Agentic AI Development",
    category: "AI",
    image: agentic_ai,
    price: 400000,
    rating: 5,
    reviewCount: 9,
    level: "Intermediate",
    durationWeeks: 16,
    tagline: "Design, build, and deploy production-grade AI agents.",
    overview:
      "A hands-on, end-to-end program that takes you from prompting and RAG to designing, orchestrating, and shipping production-grade AI agents. You will build agents that plan, call tools, use memory, and collaborate, connect them to real systems with the Model Context Protocol, then deploy them safely to the cloud with evaluation, guardrails, and monitoring. Every phase is project-driven and ends in a portfolio-quality capstone.",
    audience:
      "Developers and data professionals who want to build and ship autonomous AI agents. Comfortable with Python, no prior AI experience required.",
    prerequisites: [
      "Comfortable programming in Python",
      "Basic familiarity with APIs and JSON",
      "Prior LLM or AI Engineering experience helpful but not required",
    ],
    outcomes: [
      "Explain how LLMs, RAG, and agents differ and when to use each",
      "Build RAG pipelines that ground models in your own data",
      "Design agent loops with planning, tool calling, and memory",
      "Connect agents to tools and data with the Model Context Protocol (MCP)",
      "Orchestrate multi-agent workflows with CrewAI, AutoGen, and LangGraph",
      "Evaluate, trace, and add guardrails so agents run safely and reliably",
      "Deploy and monitor agents in production on the cloud",
      "Ship a portfolio-grade capstone agent from idea to deployment",
    ],
    tools: [
      "Python",
      "OpenAI GPT",
      "Claude",
      "Gemini",
      "Llama",
      "Hugging Face",
      "LangChain",
      "LangGraph",
      "PydanticAI",
      "OpenAI Agents SDK",
      "Model Context Protocol (MCP)",
      "CrewAI",
      "AutoGen",
      "Pinecone",
      "Chroma",
      "pgvector",
      "LangSmith",
      "Langfuse",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "AWS / GCP / Azure",
      "Streamlit",
      "Git / GitHub",
    ],
    certifications: [
      "Certifications are optional. The capstone agent and portfolio you build carry the most weight with employers.",
    ],
    curriculum: [
      {
        title: "Foundations of Agentic AI & Prompt Engineering",
        subtitle: "Understand LLMs and learn to direct them reliably",
        topics: [
          "How AI, ML, deep learning, and generative AI differ from agentic AI",
          "Large language model families: GPT, Claude, Gemini, and open models like Llama",
          "Calling model APIs: tokens, context windows, and structured outputs",
          "Embeddings and vector search with Pinecone, Chroma, and pgvector",
          "Prompt engineering: zero-shot, few-shot, chain-of-thought, and role prompting",
          "Retrieval-Augmented Generation (RAG) over documents, SQL, and APIs",
          "Responsible AI: bias, safety, and ethical use",
        ],
        tools: ["Python", "OpenAI / Claude / Gemini APIs", "Pinecone", "Chroma", "pgvector"],
      },
      {
        title: "Agent Architecture, Tools & the Model Context Protocol",
        subtitle: "Give models the ability to reason and act",
        topics: [
          "The agent loop: plan, act, observe, and iterate",
          "Function and tool calling with structured, schema-validated outputs",
          "The Model Context Protocol (MCP): the standard way to connect agents to tools and data",
          "Building and consuming MCP servers for files, databases, and APIs",
          "Short-term and long-term memory, state, and context management",
          "Building agents with LangChain, LangGraph, PydanticAI, and the OpenAI Agents SDK",
        ],
        tools: [
          "LangChain",
          "LangGraph",
          "PydanticAI",
          "OpenAI Agents SDK",
          "Model Context Protocol (MCP)",
        ],
      },
      {
        title: "Multi-Agent Systems & Orchestration",
        subtitle: "From a single agent to a coordinated team",
        topics: [
          "Multi-agent patterns: supervisor and worker, planner and executor, debate",
          "Orchestration frameworks: CrewAI, AutoGen, and LangGraph",
          "Inter-agent communication, handoffs, and shared state",
          "Task decomposition and planning across long-running workflows",
          "Human-in-the-loop checkpoints for control and safety",
          "Tracing, evaluation, and cost and latency optimisation",
        ],
        tools: ["CrewAI", "AutoGen", "LangGraph", "LangSmith", "Langfuse"],
      },
      {
        title: "Production, Deployment & Reliability",
        subtitle: "Ship agents safely and at scale",
        topics: [
          "Serving agents behind APIs with FastAPI",
          "Containerisation with Docker and orchestration with Kubernetes",
          "Cloud deployment on AWS, GCP, and Azure",
          "Observability: logging, tracing, and monitoring with Prometheus and Grafana",
          "Evaluation and testing: offline evals, regression tests, and Pytest",
          "Guardrails, prompt-injection defence, security, privacy, and compliance",
        ],
        tools: ["FastAPI", "Docker", "Kubernetes", "AWS / GCP / Azure", "Prometheus", "Grafana", "Pytest"],
      },
      {
        title: "Applied Agents, Industry Integration & Capstone",
        subtitle: "Build real agents and a job-ready portfolio",
        topics: [
          "Specialised agents: coding assistants, research, customer support, and data analysis",
          "Computer-use and browser agents for real-world automation",
          "Enterprise integration: APIs, legacy systems, and workflow automation",
          "Sector use cases across finance, healthcare, and retail, with ROI and impact analysis",
          "Capstone: plan, build an MVP, iterate, and deploy a production-grade agent",
          "Documentation, demo, and portfolio building",
        ],
        tools: ["Streamlit", "FastAPI", "Git / GitHub", "Docker"],
      },
    ],
  },
  {
    slug: "data-science-machine-learning",
    name: "Data Science & Machine Learning",
    category: "AI",
    image: data_science,
    price: 350000,
    rating: 5,
    reviewCount: 10,
    level: "Beginner",
    durationWeeks: 24,
    tagline: "From Python foundations to building and deploying ML models.",
    overview:
      "A structured, eight-phase pathway that takes you from zero programming knowledge to building and deploying machine learning models. Each phase builds progressively, with clear topics, tools, and certification guidance aligned to what the industry actually expects.",
    audience:
      "Aspiring data scientists and analysts, no prior programming required.",
    prerequisites: ["No prior programming experience needed", "Basic mathematics"],
    outcomes: [
      "Program confidently in Python for data work",
      "Apply the maths and statistics behind machine learning",
      "Wrangle, analyse, and visualise real-world datasets",
      "Query data with SQL and relational databases",
      "Train, tune, and evaluate ML models with scikit-learn",
      "Build and present an end-to-end portfolio project",
    ],
    tools: [
      "Python 3.x",
      "Jupyter",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "SQL",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "Flask / FastAPI",
      "Git / GitHub",
      "Streamlit",
      "Docker",
    ],
    certifications: [
      "Certifications are suggestions, practical portfolio projects carry equal or greater weight with employers.",
    ],
    curriculum: [
      {
        title: "Programming Foundations",
        subtitle: "Build your technical base with Python",
        topics: [
          "Python syntax, variables, data types, and operators",
          "Control flow: conditionals, loops, and iteration",
          "Functions, scope, lambda expressions, and decorators",
          "Object-oriented programming: classes, inheritance, polymorphism",
          "File handling, exceptions, and working with modules",
          "Virtual environments and package management with pip",
        ],
        tools: ["Python 3.x", "VS Code / PyCharm", "Jupyter Notebook", "pip / conda"],
      },
      {
        title: "Mathematics & Statistics",
        subtitle: "The quantitative backbone every data scientist needs",
        topics: [
          "Linear algebra: vectors, matrices, dot products, transformations",
          "Calculus: derivatives, partial derivatives, gradient descent intuition",
          "Probability: distributions, Bayes theorem, conditional probability",
          "Descriptive statistics: mean, median, variance, std deviation",
          "Inferential statistics: hypothesis testing, confidence intervals, p-values",
          "Correlation, covariance, and statistical significance",
        ],
        tools: ["NumPy", "SciPy", "Matplotlib"],
      },
      {
        title: "Data Wrangling & Analysis",
        subtitle: "Collect, clean, and make sense of real-world data",
        topics: [
          "NumPy arrays: indexing, slicing, broadcasting, vectorised ops",
          "Pandas DataFrames: loading, inspecting, filtering, merging",
          "Handling missing values, duplicates, and outliers",
          "Data transformation: encoding, scaling, feature engineering",
          "Exploratory Data Analysis (EDA) workflows and reporting",
          "Working with CSV, JSON, Excel, and SQL sources",
        ],
        tools: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "SQLite / SQLAlchemy"],
      },
      {
        title: "Data Visualisation",
        subtitle: "Communicate insights through compelling visuals",
        topics: [
          "Chart selection: bar, line, scatter, histogram, box plots",
          "Customising figures: labels, annotations, palettes, themes",
          "Multivariate visualisation and pair plots",
          "Interactive dashboards and web-ready charts",
          "Storytelling with data: structuring a visual narrative",
          "Geographic and time-series visualisation",
        ],
        tools: ["Matplotlib", "Seaborn"],
      },
      {
        title: "Databases & SQL",
        subtitle: "Query, store, and retrieve data at scale",
        topics: [
          "Relational concepts: tables, keys, and relationships",
          "Core SQL: SELECT, WHERE, GROUP BY, ORDER BY, HAVING",
          "Joins: INNER, LEFT, RIGHT, and FULL OUTER",
          "Subqueries, CTEs, and window functions",
          "Database design and normalisation principles",
          "Connecting Python to databases with SQLite3 and pandas",
        ],
        tools: ["SQLite3", "SQLAlchemy", "Pandas"],
      },
      {
        title: "Machine Learning Fundamentals",
        subtitle: "Understand the core concepts that power predictive models",
        topics: [
          "Supervised vs. unsupervised vs. reinforcement learning",
          "The ML workflow: framing, prep, training, evaluation, iteration",
          "Bias-variance trade-off, overfitting, and regularisation",
          "Train/validation/test splits and cross-validation",
          "Metrics: accuracy, precision, recall, F1, AUC-ROC, RMSE",
          "Feature selection and dimensionality reduction with PCA",
        ],
        tools: ["Scikit-learn", "NumPy", "Pandas", "Matplotlib / Seaborn"],
      },
      {
        title: "Machine Learning Algorithms",
        subtitle: "Master the algorithms, from regression to ensembles",
        topics: [
          "Regression: Linear, Ridge, Lasso, Polynomial, ElasticNet",
          "Classification: Logistic Regression, KNN, Naive Bayes",
          "Decision trees: splitting criteria, pruning, visualisation",
          "Ensembles: Random Forest, Gradient Boosting, AdaBoost, XGBoost, LightGBM",
          "Clustering: K-Means, DBSCAN, Hierarchical",
          "Model tuning: GridSearchCV, RandomizedSearchCV, hyperparameters",
        ],
        tools: ["Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "Optuna"],
      },
      {
        title: "End-to-End Projects & Portfolio",
        subtitle: "Apply everything, build, document, and present",
        topics: [
          "Translating a business problem into an ML task",
          "End-to-end pipelines: ingestion, EDA, modelling, evaluation",
          "Model serialisation with Pickle and Joblib",
          "Building prediction APIs with Flask and FastAPI",
          "Version control with Git and GitHub for data projects",
          "Structuring and presenting portfolio projects",
        ],
        tools: ["Git / GitHub", "Flask / FastAPI", "Pickle / Joblib", "Streamlit", "Docker"],
      },
    ],
  },

  // ───────────────────────── Development ───────────────────────────
  {
    slug: "mobile-app-development",
    name: "Mobile App Development (iOS/Android)",
    category: "Development",
    image: mobile_app,
    price: 250000,
    rating: 4.5,
    reviewCount: 6,
    level: "Intermediate",
    durationWeeks: 16,
    tagline: "Build and ship native apps for iOS and Android.",
    overview:
      "Design and build real mobile applications from first screen to app store, with a focus on clean architecture and great user experience.",
    outcomes: [
      "Build cross-platform mobile UIs",
      "Manage state, navigation, and device APIs",
      "Connect apps to backends and APIs",
      "Prepare and publish to the app stores",
    ],
  },
  {
    slug: "frontend-web-development",
    name: "Frontend Web Development (Including ReactJs)",
    category: "Development",
    image: frontend,
    price: 200000,
    rating: 4.5,
    reviewCount: 34,
    level: "Beginner",
    durationWeeks: 14,
    tagline: "Build modern, responsive interfaces with React.",
    overview:
      "Learn to build fast, accessible, responsive websites and web apps, from HTML and CSS fundamentals through to component-driven development with React.",
    outcomes: [
      "Build responsive layouts with HTML and CSS",
      "Write interactive UIs with JavaScript and React",
      "Manage component state and data fetching",
      "Ship polished, accessible web interfaces",
    ],
  },
  {
    slug: "fullstack-web-development",
    name: "Fullstack Web Development (MERN stack, NextJs)",
    category: "Development",
    image: fullstack,
    price: 300000,
    rating: 5,
    reviewCount: 12,
    level: "Intermediate",
    durationWeeks: 20,
    tagline: "Ship complete applications, frontend to backend.",
    overview:
      "Become a full-stack developer. Build and deploy complete web applications using the MERN stack and Next.js, covering both the interface and the server.",
    outcomes: [
      "Build REST APIs with Node and Express",
      "Model and query data with MongoDB",
      "Build full-stack apps with React and Next.js",
      "Authenticate users and deploy to production",
    ],
  },

  // ──────────────────────── Infrastructure ─────────────────────────
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    category: "Infrastructure",
    image: cloud_computing,
    price: 180000,
    rating: 4.0,
    reviewCount: 4,
    level: "Intermediate",
    durationWeeks: 10,
    tagline: "Deploy and scale applications on the cloud.",
    overview:
      "Learn the foundations of modern cloud infrastructure, compute, storage, networking, and deployment, so you can build and run reliable, scalable systems.",
    outcomes: [
      "Understand core cloud services and models",
      "Deploy and scale applications in the cloud",
      "Manage storage, networking, and security",
      "Apply cost and reliability best practices",
    ],
  },

  // ───────────────────────── Programming ───────────────────────────
  {
    slug: "python",
    name: "Python",
    category: "Programming",
    image: python,
    price: 120000,
    rating: 4.5,
    reviewCount: 34,
    level: "Beginner",
    durationWeeks: 8,
    tagline: "Program confidently with Python.",
    overview:
      "A practical introduction to Python, the most versatile language in tech. Build a strong foundation you can take into security, AI, data, or web development.",
    outcomes: [
      "Write clean Python with core syntax and data types",
      "Use functions, modules, and error handling",
      "Work with files, APIs, and libraries",
      "Apply object-oriented programming",
    ],
  },
  {
    slug: "javascript",
    name: "JavaScript",
    category: "Programming",
    image: javascript,
    price: 120000,
    rating: 4.0,
    reviewCount: 4,
    level: "Beginner",
    durationWeeks: 8,
    tagline: "Master the language of the web.",
    overview:
      "Learn JavaScript from the ground up, the language that powers every modern website and the foundation for frontend and full-stack development.",
    outcomes: [
      "Master core JavaScript syntax and the DOM",
      "Handle events, async code, and promises",
      "Work with APIs and JSON",
      "Write modern ES6+ JavaScript",
    ],
  },
  {
    slug: "dart",
    name: "Dart",
    category: "Programming",
    image: dart,
    price: 150000,
    rating: 4.0,
    reviewCount: 32,
    level: "Beginner",
    durationWeeks: 8,
    tagline: "Build with Dart, the language behind Flutter.",
    overview:
      "Learn Dart, the modern, fast language built for multi-platform apps and the foundation of Flutter mobile development.",
    outcomes: [
      "Write clean, typed Dart code",
      "Use functions, classes, and async programming",
      "Understand null safety and collections",
      "Prepare for Flutter app development",
    ],
  },
];

export const getCourseBySlug = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);

export const getRelatedCourses = (course: Course, n = 3): Course[] => {
  const sameCategory = courses.filter(
    (c) => c.slug !== course.slug && c.category === course.category
  );
  const others = courses.filter(
    (c) => c.slug !== course.slug && c.category !== course.category
  );
  return [...sameCategory, ...others].slice(0, n);
};
