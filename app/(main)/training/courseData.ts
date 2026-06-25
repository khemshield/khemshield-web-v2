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
    tools: ["Wireshark", "Linux", "VirtualBox"],
    certifications: [
      "The curriculum aligns with entry-level certifications such as CompTIA Security+, but hands-on practice carries the most weight as you grow.",
    ],
    curriculum: [
      {
        title: "Security First Principles",
        subtitle: "The vocabulary and ideas the whole field rests on",
        topics: [
          "What information security is and why it matters",
          "The CIA triad: confidentiality, integrity, availability",
          "Threats, vulnerabilities, risks, and exploits",
          "Security domains and the language of the field",
          "Ethics and professional responsibility",
        ],
      },
      {
        title: "Threats, Attacks, and Attackers",
        subtitle: "Know how systems are actually attacked",
        topics: [
          "Threat actor types and their motivations",
          "Malware families and how they spread",
          "Social engineering and phishing",
          "Common attack vectors and the attack lifecycle",
          "Real-world breach case studies",
        ],
      },
      {
        title: "Core Defences and Controls",
        subtitle: "The building blocks of protecting a system",
        topics: [
          "Access control: authentication, authorisation, and least privilege",
          "Cryptography basics: encryption, hashing, and certificates",
          "Network security fundamentals: firewalls and segmentation",
          "Endpoint, application, and data protection",
          "Defence in depth and security by design",
        ],
        tools: ["Wireshark"],
      },
      {
        title: "Risk, Governance, and Frameworks",
        subtitle: "How organisations manage security at scale",
        topics: [
          "Risk management fundamentals",
          "Security policies, standards, and procedures",
          "Frameworks and controls (NIST, ISO 27001, CIS)",
          "Compliance and the basics of governance",
          "Building good security habits and a learning path",
        ],
      },
    ],
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
      "The curriculum aligns with industry certifications such as CompTIA Security+, but the hands-on labs and the portfolio you build carry the most weight with employers.",
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
      "Go beyond demos. This program trains you for the AI/ML Engineer role: integrating LLM APIs, understanding the transformer architectures underneath them, grounding models in your own data with retrieval, fine-tuning with the modern ML stack, and shipping it all to production with proper MLOps, evaluation, and safety. Every phase is project-driven and builds toward a deployed, monitored capstone.",
    audience:
      "Developers and data professionals building AI-powered products. Comfortable with Python; no prior ML experience required.",
    prerequisites: [
      "Comfortable programming in Python",
      "Basic familiarity with APIs and JSON",
    ],
    outcomes: [
      "Integrate LLM APIs from Anthropic, OpenAI, and Google into real applications",
      "Engineer effective prompts, structured outputs, and tool calling",
      "Explain transformer architectures, attention, and embeddings",
      "Build retrieval-augmented generation (RAG) systems with vector databases",
      "Train, fine-tune, and evaluate models with PyTorch, TensorFlow, and Hugging Face",
      "Apply MLOps to version, deploy, and monitor models in production",
      "Containerise and ship AI features to the cloud",
      "Build AI responsibly with safety, guardrails, and systematic evaluation",
    ],
    tools: [
      "Python",
      "Claude (Anthropic)",
      "OpenAI",
      "Google Gemini",
      "Hugging Face",
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "Pinecone",
      "Chroma",
      "pgvector",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "AWS / GCP / Azure",
      "MLflow",
      "Git / GitHub",
    ],
    certifications: [
      "Certifications are optional. The production AI application and portfolio you build carry the most weight with employers.",
    ],
    curriculum: [
      {
        title: "Engineering Foundations for AI",
        subtitle: "Clean, tested Python and the software discipline AI systems need",
        topics: [
          "Python for AI engineering: typing, packaging, and project structure",
          "Clean code, code review, and testing discipline with Pytest",
          "Working with APIs, JSON, and asynchronous I/O",
          "Version control and collaboration with Git and GitHub",
          "Environments, dependencies, and reproducibility",
        ],
        tools: ["Python", "Pytest", "Git / GitHub"],
      },
      {
        title: "How Modern Models Work: Transformers and Embeddings",
        subtitle: "The architecture behind today's AI, from attention to embeddings",
        topics: [
          "Neural network and deep learning refresher",
          "The transformer architecture and the attention mechanism",
          "Tokenisation, context windows, and model capabilities",
          "Embeddings and vector representations of text",
          "Model families: open and closed, and how to choose",
        ],
        tools: ["PyTorch", "Hugging Face Transformers"],
      },
      {
        title: "Building with LLM APIs and Prompt Engineering",
        subtitle: "Ship real features on top of frontier models",
        topics: [
          "Integrating LLM APIs: Anthropic Claude, OpenAI, and Google",
          "Prompt engineering: zero-shot, few-shot, and chain-of-thought",
          "Structured outputs, tool calling, and JSON schemas",
          "In-context learning and prompt patterns that scale",
          "Streaming, token budgeting, and cost control",
        ],
        tools: ["Claude (Anthropic)", "OpenAI", "Google Gemini", "Python"],
      },
      {
        title: "Retrieval-Augmented Generation and Vector Databases",
        subtitle: "Ground models in your own data",
        topics: [
          "Embeddings and semantic search fundamentals",
          "Vector databases: Pinecone, Chroma, and pgvector",
          "Chunking, indexing, and retrieval strategies",
          "Building RAG pipelines over documents and APIs",
          "Evaluating and improving retrieval quality",
        ],
        tools: ["Pinecone", "Chroma", "pgvector", "LangChain"],
      },
      {
        title: "Applied Machine Learning and the Hugging Face Ecosystem",
        subtitle: "Train, fine-tune, and adapt models for your use case",
        topics: [
          "The ML workflow: data, training, evaluation, iteration",
          "PyTorch and TensorFlow fundamentals for engineers",
          "Using and fine-tuning models with Hugging Face",
          "Evaluation metrics and experiment tracking",
          "When to prompt, retrieve, fine-tune, or train from scratch",
        ],
        tools: ["PyTorch", "TensorFlow", "Hugging Face", "scikit-learn"],
      },
      {
        title: "MLOps, Deployment, and Production Reliability",
        subtitle: "Take models from notebook to monitored production",
        topics: [
          "Serving models and AI features behind APIs with FastAPI",
          "Containerisation with Docker and orchestration with Kubernetes",
          "Cloud deployment on AWS, GCP, and Azure",
          "Model and data versioning, and CI/CD for ML",
          "Monitoring, logging, evaluation, and drift detection",
        ],
        tools: ["FastAPI", "Docker", "Kubernetes", "AWS / GCP / Azure", "MLflow"],
      },
      {
        title: "Safety, Evaluation, and Capstone",
        subtitle: "Build AI that is safe, evaluated, and stakeholder-ready",
        topics: [
          "AI safety, alignment, and ethical considerations",
          "Guardrails, prompt-injection defence, and privacy",
          "Systematic evaluation and regression testing of AI quality",
          "Communicating AI systems and trade-offs to stakeholders",
          "Capstone: design, build, and deploy a production AI application",
        ],
        tools: ["LangSmith", "Python", "Git / GitHub"],
      },
    ],
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
    audience:
      "Developers who want to build and ship cross-platform mobile apps. Some programming experience helps; the Dart course is a great primer.",
    prerequisites: [
      "Basic programming experience",
      "Dart fundamentals helpful but not required",
    ],
    outcomes: [
      "Build cross-platform mobile UIs for iOS and Android with Flutter",
      "Manage state, navigation, and app architecture",
      "Work with device APIs, storage, and permissions",
      "Connect apps to REST and GraphQL backends",
      "Handle authentication, offline data, and notifications",
      "Prepare, test, and publish to the App Store and Play Store",
    ],
    tools: [
      "Flutter",
      "Dart",
      "Android Studio",
      "Xcode",
      "Firebase",
      "REST / GraphQL",
      "Git / GitHub",
    ],
    certifications: [
      "Certifications are optional. The apps you ship and your portfolio carry the most weight with employers.",
    ],
    curriculum: [
      {
        title: "Mobile Foundations with Dart and Flutter",
        subtitle: "Set up your toolkit and ship your first screens",
        topics: [
          "Dart language essentials for app developers",
          "The Flutter framework and the widget tree",
          "Setting up Android Studio, emulators, and devices",
          "Hot reload and the developer workflow",
          "Your first multi-screen app",
        ],
        tools: ["Dart", "Flutter", "Android Studio"],
      },
      {
        title: "Building Beautiful, Responsive UIs",
        subtitle: "Craft interfaces that feel native on every device",
        topics: [
          "Core widgets: layout, lists, forms, and navigation",
          "Theming, styling, and responsive design",
          "Animations and gestures",
          "Handling different screen sizes and platforms",
          "Accessibility and polish",
        ],
        tools: ["Flutter"],
      },
      {
        title: "State Management and App Architecture",
        subtitle: "Structure apps that stay maintainable as they grow",
        topics: [
          "Managing state: setState, Provider, and Riverpod",
          "App architecture and separation of concerns",
          "Routing and navigation patterns",
          "Dependency injection and project structure",
          "Forms, validation, and user input",
        ],
        tools: ["Provider", "Riverpod"],
      },
      {
        title: "Data, APIs, and Local Storage",
        subtitle: "Connect your app to the outside world",
        topics: [
          "Calling REST and GraphQL APIs",
          "Parsing JSON and modelling data",
          "Local storage and offline-first patterns",
          "Caching and synchronisation",
          "Error handling and loading states",
        ],
        tools: ["REST / GraphQL", "SQLite / Hive"],
      },
      {
        title: "Device Features, Auth, and Notifications",
        subtitle: "Use the full power of the phone",
        topics: [
          "Authentication and secure storage",
          "Camera, location, and device sensors",
          "Push notifications",
          "Integrating Firebase services",
          "Permissions and platform channels",
        ],
        tools: ["Firebase"],
      },
      {
        title: "Testing, Release, and the App Stores",
        subtitle: "Ship with confidence and publish",
        topics: [
          "Testing: unit, widget, and integration tests",
          "Performance profiling and optimisation",
          "App icons, splash screens, and store assets",
          "Building and signing for iOS and Android",
          "Publishing to the App Store and Play Store",
        ],
        tools: ["Flutter", "Xcode", "Android Studio"],
      },
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
    audience:
      "Beginners and aspiring frontend developers. No prior experience required.",
    prerequisites: ["No prior experience required", "Basic computer literacy"],
    outcomes: [
      "Build responsive, accessible layouts with HTML and CSS",
      "Write interactive UIs with modern JavaScript (ES6+)",
      "Build component-driven applications with React",
      "Manage state, props, and data fetching",
      "Consume REST and GraphQL APIs",
      "Style with Tailwind and ship polished interfaces",
    ],
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Vite",
      "Git / GitHub",
      "Figma",
    ],
    certifications: [
      "Certifications are optional. The interfaces you build and your portfolio carry the most weight with employers.",
    ],
    curriculum: [
      {
        title: "Web Foundations: HTML and CSS",
        subtitle: "Structure and style your first web pages",
        topics: [
          "How the web works: browsers, HTTP, and the DOM",
          "Semantic HTML and document structure",
          "CSS fundamentals: the box model, layout, and the cascade",
          "Flexbox and CSS Grid",
          "Responsive design and mobile-first workflows",
        ],
        tools: ["HTML", "CSS"],
      },
      {
        title: "Modern JavaScript",
        subtitle: "Make pages interactive",
        topics: [
          "JavaScript syntax, types, and operators",
          "Functions, scope, and the DOM",
          "Arrays, objects, and ES6+ features",
          "Events, forms, and interactivity",
          "Asynchronous JavaScript: promises and fetch",
        ],
        tools: ["JavaScript"],
      },
      {
        title: "Building Interfaces with React",
        subtitle: "Think in components",
        topics: [
          "Components, JSX, and props",
          "State and the useState hook",
          "Rendering lists and handling events",
          "Forms and controlled components",
          "Composing a UI from reusable parts",
        ],
        tools: ["React", "Vite"],
      },
      {
        title: "State, Effects, and Data Fetching",
        subtitle: "Connect your UI to real data",
        topics: [
          "Side effects with useEffect",
          "Fetching and displaying API data",
          "Lifting state and sharing data",
          "Context and custom hooks",
          "Handling loading and error states",
        ],
        tools: ["React", "REST / GraphQL"],
      },
      {
        title: "Styling, Routing, and Tooling",
        subtitle: "Build a real multi-page app",
        topics: [
          "Styling with Tailwind CSS",
          "Client-side routing with React Router",
          "Reusable components and design systems",
          "Forms and validation",
          "Build tooling and performance basics",
        ],
        tools: ["Tailwind CSS", "React Router", "Vite"],
      },
      {
        title: "Accessibility, Deployment, and Portfolio",
        subtitle: "Ship it and show it off",
        topics: [
          "Web accessibility (a11y) essentials",
          "Performance and Core Web Vitals",
          "Version control with Git and GitHub",
          "Deploying to Vercel or Netlify",
          "Building and presenting a frontend portfolio",
        ],
        tools: ["Git / GitHub", "Vercel / Netlify"],
      },
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
    audience:
      "Developers who want to build complete web applications end to end. Comfortable with JavaScript basics.",
    prerequisites: ["JavaScript fundamentals", "Basic HTML and CSS"],
    outcomes: [
      "Build REST and GraphQL APIs with Node and Express",
      "Model, query, and relate data with MongoDB",
      "Build full-stack apps with React and Next.js",
      "Authenticate and authorise users securely",
      "Test, containerise, and deploy to production",
      "Architect and ship a complete portfolio project",
    ],
    tools: [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Next.js",
      "GraphQL",
      "Tailwind CSS",
      "Docker",
      "Git / GitHub",
    ],
    certifications: [
      "Certifications are optional. The applications you ship and your portfolio carry the most weight with employers.",
    ],
    curriculum: [
      {
        title: "JavaScript and TypeScript for Full-Stack",
        subtitle: "A solid language base for both ends of the stack",
        topics: [
          "Modern JavaScript (ES6+) deep dive",
          "Asynchronous patterns: promises and async/await",
          "TypeScript fundamentals and typing",
          "Tooling, modules, and package management",
          "Git and collaborative workflows",
        ],
        tools: ["JavaScript", "TypeScript", "Git / GitHub"],
      },
      {
        title: "Frontend with React and Next.js",
        subtitle: "Build the interface users see",
        topics: [
          "Component-driven development with React",
          "Hooks, state, and data fetching",
          "Routing and rendering with Next.js",
          "Server and client components",
          "Styling with Tailwind CSS",
        ],
        tools: ["React", "Next.js", "Tailwind CSS"],
      },
      {
        title: "Backend APIs with Node and Express",
        subtitle: "Build the server behind the app",
        topics: [
          "The Node.js runtime and the event loop",
          "Building REST APIs with Express",
          "Middleware, routing, and error handling",
          "Validation and request handling",
          "Project structure and clean architecture",
        ],
        tools: ["Node.js", "Express"],
      },
      {
        title: "Databases with MongoDB",
        subtitle: "Persist and query your data",
        topics: [
          "Document modelling with MongoDB and Mongoose",
          "CRUD, queries, and aggregation",
          "Relationships, indexing, and performance",
          "Data validation and schema design",
          "Connecting the API to the database",
        ],
        tools: ["MongoDB", "Mongoose"],
      },
      {
        title: "Authentication, Authorisation, and APIs",
        subtitle: "Secure the app and extend its surface",
        topics: [
          "Authentication with sessions and JWT",
          "Role-based authorisation and security",
          "Building and consuming GraphQL APIs",
          "File uploads and third-party integrations",
          "API security best practices",
        ],
        tools: ["JWT", "GraphQL"],
      },
      {
        title: "Testing, Quality, and DevOps",
        subtitle: "Make it reliable and shippable",
        topics: [
          "Testing the stack: unit and integration",
          "Environment configuration and secrets",
          "Containerisation with Docker",
          "CI/CD pipelines",
          "Logging, monitoring, and error tracking",
        ],
        tools: ["Docker", "Jest"],
      },
      {
        title: "Deployment and Capstone",
        subtitle: "Put a real product into the world",
        topics: [
          "Deploying frontend and backend to the cloud",
          "Performance, caching, and scaling basics",
          "End-to-end project architecture",
          "Building a production-grade capstone",
          "Documentation and portfolio presentation",
        ],
        tools: ["Vercel", "Render / Railway", "Docker"],
      },
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
    audience:
      "Developers, sysadmins, and IT professionals moving into cloud roles.",
    prerequisites: ["Basic networking and Linux familiarity"],
    outcomes: [
      "Understand core cloud service and deployment models",
      "Deploy, scale, and manage applications in the cloud",
      "Configure compute, storage, and networking",
      "Secure cloud resources with IAM and best practices",
      "Automate infrastructure with Infrastructure as Code",
      "Apply cost, reliability, and monitoring best practices",
    ],
    tools: [
      "AWS",
      "Linux",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Git / GitHub",
    ],
    certifications: [
      "The curriculum aligns with certifications such as the AWS Certified Cloud Practitioner, but hands-on projects carry the most weight with employers.",
    ],
    curriculum: [
      {
        title: "Cloud Foundations",
        subtitle: "The mental model behind the cloud",
        topics: [
          "What cloud computing is: IaaS, PaaS, and SaaS",
          "Public, private, and hybrid cloud models",
          "Core providers: AWS, Azure, and GCP",
          "Regions, availability zones, and the shared responsibility model",
          "Creating and navigating a cloud account safely",
        ],
        tools: ["AWS"],
      },
      {
        title: "Compute, Storage, and Networking",
        subtitle: "The core resources every system uses",
        topics: [
          "Virtual machines and compute services",
          "Object, block, and file storage",
          "Virtual networks, subnets, and security groups",
          "Load balancing and DNS",
          "Scaling and high availability",
        ],
        tools: ["AWS", "Linux"],
      },
      {
        title: "Containers and Orchestration",
        subtitle: "Package and run applications consistently",
        topics: [
          "Containerisation with Docker",
          "Container registries and images",
          "Orchestration with Kubernetes",
          "Managed container services",
          "Microservices basics",
        ],
        tools: ["Docker", "Kubernetes"],
      },
      {
        title: "Security, Identity, and Cost",
        subtitle: "Run the cloud safely and affordably",
        topics: [
          "Identity and access management (IAM)",
          "Securing data and resources",
          "Monitoring, logging, and alerting",
          "Cost management and optimisation",
          "Backup, recovery, and reliability",
        ],
        tools: ["AWS"],
      },
      {
        title: "Automation, Deployment, and Capstone",
        subtitle: "Ship infrastructure like code",
        topics: [
          "Infrastructure as Code with Terraform",
          "CI/CD pipelines for the cloud",
          "Deploying a real application end to end",
          "Observability and operations",
          "Capstone: design and deploy a cloud architecture",
        ],
        tools: ["Terraform", "Git / GitHub"],
      },
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
    audience:
      "Complete beginners and anyone starting out in tech, security, data, or web.",
    prerequisites: ["No prior programming experience required"],
    outcomes: [
      "Write clean Python with core syntax and data types",
      "Use functions, modules, and error handling",
      "Apply object-oriented programming",
      "Work with files, APIs, and popular libraries",
      "Build small, real-world Python projects",
    ],
    tools: ["Python", "VS Code", "pip", "Git / GitHub"],
    certifications: [
      "Certifications are optional. The projects you build and your portfolio carry the most weight.",
    ],
    curriculum: [
      {
        title: "Getting Started with Python",
        subtitle: "Write and run your first programs",
        topics: [
          "Installing Python and setting up your editor",
          "Variables, data types, and operators",
          "Strings, numbers, and basic input and output",
          "Writing and running your first programs",
        ],
        tools: ["Python", "VS Code"],
      },
      {
        title: "Control Flow and Data Structures",
        subtitle: "Make decisions and organise data",
        topics: [
          "Conditionals and decision making",
          "Loops and iteration",
          "Lists, tuples, sets, and dictionaries",
          "Comprehensions and common patterns",
        ],
        tools: ["Python"],
      },
      {
        title: "Functions, Modules, and Errors",
        subtitle: "Write reusable, robust code",
        topics: [
          "Defining and calling functions",
          "Scope, arguments, and return values",
          "Modules, packages, and the standard library",
          "Exceptions and error handling",
        ],
        tools: ["Python"],
      },
      {
        title: "Object-Oriented Python",
        subtitle: "Model the world with classes",
        topics: [
          "Classes, objects, and attributes",
          "Methods, inheritance, and polymorphism",
          "Encapsulation and special methods",
          "Structuring larger programs",
        ],
        tools: ["Python"],
      },
      {
        title: "Files, Libraries, and Projects",
        subtitle: "Apply Python to real tasks",
        topics: [
          "Reading and writing files",
          "Working with JSON and APIs",
          "Using pip and popular libraries",
          "Virtual environments and project setup",
          "Building and sharing a portfolio project",
        ],
        tools: ["Python", "pip", "Git / GitHub"],
      },
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
    audience:
      "Beginners and aspiring web developers. No prior experience required.",
    prerequisites: ["No prior programming experience required"],
    outcomes: [
      "Master core JavaScript syntax and data types",
      "Manipulate the DOM and handle events",
      "Write asynchronous code with promises and async/await",
      "Work with APIs and JSON",
      "Write modern, modular ES6+ JavaScript",
      "Build interactive browser projects",
    ],
    tools: ["JavaScript", "HTML", "CSS", "VS Code", "Git / GitHub"],
    certifications: [
      "Certifications are optional. The projects you build and your portfolio carry the most weight.",
    ],
    curriculum: [
      {
        title: "JavaScript Foundations",
        subtitle: "The core of the language",
        topics: [
          "Running JavaScript in the browser and Node",
          "Variables, data types, and operators",
          "Strings, numbers, and template literals",
          "Conditionals and comparison",
        ],
        tools: ["JavaScript"],
      },
      {
        title: "Functions, Arrays, and Objects",
        subtitle: "Structure logic and data",
        topics: [
          "Functions, parameters, and scope",
          "Arrays and array methods",
          "Objects and properties",
          "Loops and iteration",
        ],
        tools: ["JavaScript"],
      },
      {
        title: "The DOM and Events",
        subtitle: "Make the page respond to users",
        topics: [
          "Selecting and manipulating elements",
          "Handling events and user input",
          "Forms and validation",
          "Building interactive UI features",
        ],
        tools: ["JavaScript", "HTML", "CSS"],
      },
      {
        title: "Asynchronous JavaScript",
        subtitle: "Work with data over the network",
        topics: [
          "Callbacks and the event loop",
          "Promises and async/await",
          "Fetching data from APIs",
          "Working with JSON",
          "Error handling",
        ],
        tools: ["JavaScript"],
      },
      {
        title: "Modern JavaScript and Projects",
        subtitle: "Write professional, modular code",
        topics: [
          "ES6+ features: destructuring, spread, and modules",
          "Local storage and browser APIs",
          "Organising and bundling code",
          "Version control with Git",
          "Building a portfolio project",
        ],
        tools: ["JavaScript", "Git / GitHub"],
      },
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
    audience: "Beginners and aspiring Flutter developers.",
    prerequisites: ["No prior programming experience required"],
    outcomes: [
      "Write clean, strongly typed Dart code",
      "Use functions, classes, and object-oriented programming",
      "Understand null safety and collections",
      "Write asynchronous Dart with futures and streams",
      "Be ready to start building apps with Flutter",
    ],
    tools: ["Dart", "VS Code", "Git / GitHub"],
    certifications: [
      "Certifications are optional. What matters most is being ready to build real apps with Flutter.",
    ],
    curriculum: [
      {
        title: "Dart Fundamentals",
        subtitle: "The basics of a modern, typed language",
        topics: [
          "Setting up Dart and your editor",
          "Variables, types, and null safety",
          "Operators, strings, and numbers",
          "Input, output, and control flow",
        ],
        tools: ["Dart"],
      },
      {
        title: "Functions and Collections",
        subtitle: "Organise logic and data",
        topics: [
          "Functions, parameters, and arrow syntax",
          "Lists, sets, and maps",
          "Iteration and collection methods",
          "Scope and closures",
        ],
        tools: ["Dart"],
      },
      {
        title: "Object-Oriented Dart",
        subtitle: "Model real things with classes",
        topics: [
          "Classes, objects, and constructors",
          "Inheritance, mixins, and interfaces",
          "Abstract classes and polymorphism",
          "Generics and enums",
        ],
        tools: ["Dart"],
      },
      {
        title: "Asynchronous Dart",
        subtitle: "Handle work that takes time",
        topics: [
          "Futures and async/await",
          "Streams and event handling",
          "Error handling",
          "Working with packages from pub",
        ],
        tools: ["Dart"],
      },
      {
        title: "From Dart to Flutter",
        subtitle: "Bridge into app development",
        topics: [
          "Structuring Dart projects",
          "The pub package ecosystem",
          "Dart for Flutter: what carries over",
          "A first taste of Flutter widgets",
          "Preparing for app development",
        ],
        tools: ["Dart", "Flutter"],
      },
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
