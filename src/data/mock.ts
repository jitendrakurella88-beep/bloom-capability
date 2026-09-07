/**
 * Centralised mock data for AI LearnHub.
 * Every shape here mirrors the payload the FastAPI backend is expected to return,
 * so swapping `src/services/api.ts` to real endpoints requires no UI changes.
 */

export type Role = "employee" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface Skill {
  name: string;
  current: number;
  required: number;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  skill: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  hours: number;
  progress: number;
  rationale: string;
}

export const demoAccounts = [
  { email: "employee@test.com", password: "123456", role: "employee" as const },
  { email: "admin@test.com", password: "123456", role: "admin" as const },
];

export const employeeProfile = {
  id: "EMP-10482",
  name: "Ravi Kumar",
  email: "employee@test.com",
  phone: "+91 98765 43210",
  department: "Information Technology",
  designation: "Software Engineer",
  experience: "4 years 2 months",
  location: "Bengaluru, Karnataka",
  joinedOn: "12 Mar 2022",
  reportingTo: "Anita Desai (Engineering Manager)",
  targetRole: "Data Scientist",
  avatar: "RK",
  bio: "Backend engineer transitioning into applied machine learning. Focused on data pipelines, model deployment and analytics tooling.",
  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
    { name: "Python for Data Science", issuer: "NPTEL", year: "2023" },
    { name: "SQL Advanced Certification", issuer: "HackerRank", year: "2023" },
  ],
  preferences: {
    format: "Video + Hands-on labs",
    pace: "6 hours / week",
    language: "English",
    difficulty: "Intermediate",
    notifications: "Weekly digest",
  },
};

export const skills: Skill[] = [
  { name: "Python", current: 82, required: 85, category: "Programming" },
  { name: "SQL", current: 64, required: 80, category: "Data" },
  { name: "Machine Learning", current: 58, required: 85, category: "AI/ML" },
  { name: "Deep Learning", current: 42, required: 70, category: "AI/ML" },
  { name: "Communication", current: 76, required: 70, category: "Behavioural" },
];

export const dashboardStats = {
  overallSkillScore: 68,
  learningProgress: 54,
  coursesCompleted: 6,
  averageQuizScore: 78,
};

export const recommendedCourses: Course[] = [
  {
    id: "c1",
    title: "Advanced SQL",
    skill: "SQL",
    description: "Window functions, CTEs, query tuning and analytical joins for large datasets.",
    difficulty: "Intermediate",
    hours: 8,
    progress: 35,
    rationale:
      "Your SQL assessment score is 64% against a required 80% for Data Scientist. Advanced SQL closes the fastest gap in your roadmap.",
  },
  {
    id: "c2",
    title: "Machine Learning Fundamentals",
    skill: "Machine Learning",
    description: "Supervised & unsupervised learning, model evaluation and feature engineering.",
    difficulty: "Intermediate",
    hours: 14,
    progress: 12,
    rationale:
      "Machine Learning carries the highest weight (30%) for your target role and shows a 27% gap — the largest impact on readiness.",
  },
  {
    id: "c3",
    title: "Deep Learning Basics",
    skill: "Deep Learning",
    description: "Neural networks, backpropagation, CNNs and training best practices.",
    difficulty: "Advanced",
    hours: 18,
    progress: 0,
    rationale:
      "Deep Learning is at 42% versus a 70% requirement. It is flagged Priority because future demand in your department is rising.",
  },
  {
    id: "c4",
    title: "Generative AI",
    skill: "Generative AI",
    description: "LLMs, prompting patterns, embeddings and retrieval-augmented generation.",
    difficulty: "Advanced",
    hours: 12,
    progress: 0,
    rationale:
      "Organisation-level forecast shows Generative AI demand rising to 85% while current capability is 35% — a critical future skill.",
  },
];

export const recentActivity = [
  { id: "a1", title: "Completed 'Python Data Structures' quiz", meta: "Score 86%", time: "2 hours ago", type: "quiz" },
  { id: "a2", title: "Uploaded Machine_Learning_Basics.pdf", meta: "Processed · AI-ready", time: "Yesterday", type: "upload" },
  { id: "a3", title: "Finished Module 3 of Advanced SQL", meta: "35% course progress", time: "2 days ago", type: "course" },
  { id: "a4", title: "Asked AI Tutor about gradient descent", meta: "12 messages", time: "3 days ago", type: "tutor" },
  { id: "a5", title: "Skill assessment completed", meta: "Overall 78%", time: "5 days ago", type: "assessment" },
];

export const upcomingAssessments = [
  { id: "u1", title: "Machine Learning Level 2", date: "12 Oct 2026", duration: "45 min", questions: 30 },
  { id: "u2", title: "SQL Analytical Queries", date: "18 Oct 2026", duration: "30 min", questions: 20 },
  { id: "u3", title: "Communication & Stakeholder Skills", date: "24 Oct 2026", duration: "25 min", questions: 15 },
];

export const skillTrend = [
  { month: "Apr", Python: 62, SQL: 44, ML: 30, DL: 18 },
  { month: "May", Python: 68, SQL: 50, ML: 36, DL: 22 },
  { month: "Jun", Python: 71, SQL: 54, ML: 41, DL: 27 },
  { month: "Jul", Python: 75, SQL: 57, ML: 46, DL: 31 },
  { month: "Aug", Python: 79, SQL: 61, ML: 52, DL: 37 },
  { month: "Sep", Python: 82, SQL: 64, ML: 58, DL: 42 },
];

export interface Material {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "PPTX" | "TXT";
  size: string;
  uploadedOn: string;
  status: "Processing" | "Processed" | "Failed";
  progress: number;
  chunks: number;
}

export const learningMaterials: Material[] = [
  { id: "m1", name: "Machine_Learning_Basics.pdf", type: "PDF", size: "4.2 MB", uploadedOn: "04 Sep 2026", status: "Processed", progress: 100, chunks: 184 },
  { id: "m2", name: "SQL_Query_Optimisation.docx", type: "DOCX", size: "1.1 MB", uploadedOn: "02 Sep 2026", status: "Processed", progress: 100, chunks: 62 },
  { id: "m3", name: "Deep_Learning_Workshop.pptx", type: "PPTX", size: "12.6 MB", uploadedOn: "01 Sep 2026", status: "Processing", progress: 46, chunks: 0 },
  { id: "m4", name: "Cloud_Security_Notes.txt", type: "TXT", size: "220 KB", uploadedOn: "28 Aug 2026", status: "Failed", progress: 0, chunks: 0 },
  { id: "m5", name: "Generative_AI_Handbook.pdf", type: "PDF", size: "8.9 MB", uploadedOn: "24 Aug 2026", status: "Processed", progress: 100, chunks: 311 },
];

export interface Question {
  id: string;
  skill: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const assessmentQuestions: Question[] = [
  {
    id: "q1",
    skill: "Machine Learning",
    difficulty: "Easy",
    question: "Which algorithm is commonly used for classification?",
    options: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"],
    answer: 1,
    explanation: "Logistic Regression models the probability of a categorical outcome, making it a classification algorithm.",
  },
  {
    id: "q2",
    skill: "SQL",
    difficulty: "Medium",
    question: "Which SQL clause returns rows only when there is a match in both tables?",
    options: ["LEFT JOIN", "FULL OUTER JOIN", "INNER JOIN", "CROSS JOIN"],
    answer: 2,
    explanation: "INNER JOIN keeps only the rows where the join condition is satisfied on both sides.",
  },
  {
    id: "q3",
    skill: "Python",
    difficulty: "Easy",
    question: "What does a Python list comprehension primarily improve?",
    options: ["Memory safety", "Readability and conciseness", "Type checking", "Thread safety"],
    answer: 1,
    explanation: "List comprehensions express map/filter logic in one readable expression.",
  },
  {
    id: "q4",
    skill: "Machine Learning",
    difficulty: "Medium",
    question: "A model performs well on training data but poorly on test data. This is:",
    options: ["Underfitting", "Overfitting", "Regularisation", "Normalisation"],
    answer: 1,
    explanation: "Overfitting means the model memorised training noise instead of learning general patterns.",
  },
  {
    id: "q5",
    skill: "Deep Learning",
    difficulty: "Hard",
    question: "Which component introduces non-linearity into a neural network?",
    options: ["Loss function", "Activation function", "Optimizer", "Learning rate"],
    answer: 1,
    explanation: "Activation functions such as ReLU let the network approximate non-linear relationships.",
  },
  {
    id: "q6",
    skill: "Data",
    difficulty: "Medium",
    question: "Which metric is best for an imbalanced classification problem?",
    options: ["Accuracy", "F1 Score", "Mean Squared Error", "R² Score"],
    answer: 1,
    explanation: "F1 balances precision and recall, which matters when one class dominates.",
  },
  {
    id: "q7",
    skill: "SQL",
    difficulty: "Hard",
    question: "Which window function assigns a unique sequential number without gaps?",
    options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "NTILE()"],
    answer: 2,
    explanation: "ROW_NUMBER() always produces consecutive integers within the partition.",
  },
  {
    id: "q8",
    skill: "Python",
    difficulty: "Medium",
    question: "Which library is the de-facto standard for tabular data in Python?",
    options: ["NumPy", "pandas", "Matplotlib", "SciPy"],
    answer: 1,
    explanation: "pandas provides DataFrame structures purpose-built for tabular analysis.",
  },
];

export const quizBank: Record<"Easy" | "Medium" | "Hard", Question[]> = {
  Easy: assessmentQuestions.filter((q) => q.difficulty === "Easy").concat(assessmentQuestions.slice(0, 3)),
  Medium: assessmentQuestions.filter((q) => q.difficulty === "Medium"),
  Hard: assessmentQuestions.filter((q) => q.difficulty === "Hard").concat(assessmentQuestions.slice(3, 6)),
};

export const roadmap = [
  {
    week: "Week 1",
    skill: "SQL",
    course: "SQL Fundamentals",
    hours: 6,
    difficulty: "Beginner" as const,
    progress: 100,
    status: "Completed" as const,
    rationale: "Foundation refresh — your assessment showed gaps in grouping and filtering before advanced topics.",
  },
  {
    week: "Week 2",
    skill: "SQL",
    course: "Advanced SQL",
    hours: 8,
    difficulty: "Intermediate" as const,
    progress: 35,
    status: "In Progress" as const,
    rationale: "Closes the 16% SQL gap required by the Data Scientist role profile.",
  },
  {
    week: "Week 3",
    skill: "Machine Learning",
    course: "Machine Learning Fundamentals",
    hours: 14,
    difficulty: "Intermediate" as const,
    progress: 12,
    status: "In Progress" as const,
    rationale: "Highest weighted skill for your target role with a 27% gap.",
  },
  {
    week: "Week 4",
    skill: "Deep Learning",
    course: "Deep Learning Basics",
    hours: 18,
    difficulty: "Advanced" as const,
    progress: 0,
    status: "Not Started" as const,
    rationale: "Sequenced after ML fundamentals because it depends on model evaluation concepts.",
  },
  {
    week: "Week 5",
    skill: "Generative AI",
    course: "Generative AI Applications",
    hours: 12,
    difficulty: "Advanced" as const,
    progress: 0,
    status: "Not Started" as const,
    rationale: "Aligned with the organisation's critical future skill forecast for 2027.",
  },
];

export const tutorSuggestions = [
  "Explain Machine Learning",
  "What is a neural network?",
  "Explain SQL joins",
  "Give me a Python example",
  "Explain overfitting",
];

export const tutorConversations = [
  { id: "t1", title: "Neural networks explained", updated: "Today" },
  { id: "t2", title: "SQL window functions", updated: "Yesterday" },
  { id: "t3", title: "Bias vs variance", updated: "3 days ago" },
  { id: "t4", title: "Pandas groupby patterns", updated: "Last week" },
];

export const tutorAnswers: { match: string[]; answer: string }[] = [
  {
    match: ["neural network", "neural networks"],
    answer:
      "A neural network is a stack of layers of small computing units called neurons.\n\n1. **Input layer** receives your features (for example pixel values).\n2. **Hidden layers** multiply those inputs by learned weights, add a bias, and pass the result through an activation function such as ReLU. This is what lets the network model non-linear relationships.\n3. **Output layer** produces the prediction — a probability for classification or a number for regression.\n\nTraining works by comparing the prediction to the true label with a loss function, then using backpropagation to push the error backwards and gradient descent to nudge every weight in the direction that reduces the loss.\n\nBecause your Deep Learning score is 42%, I would start with a single hidden layer network on a small tabular dataset before moving to CNNs.",
  },
  {
    match: ["machine learning"],
    answer:
      "Machine Learning is the practice of letting a program learn patterns from data instead of following hand-written rules.\n\n- **Supervised learning** — labelled data; e.g. predicting churn from customer history.\n- **Unsupervised learning** — no labels; e.g. clustering customers into segments.\n- **Reinforcement learning** — an agent learns via rewards.\n\nA typical workflow: collect data → clean and engineer features → split into train/validation/test → fit a model → evaluate with the right metric → deploy and monitor.\n\nGiven your roadmap, the next practical step is Machine Learning Fundamentals in Week 3.",
  },
  {
    match: ["sql join", "joins"],
    answer:
      "SQL joins combine rows from two tables using a matching condition.\n\n- **INNER JOIN** — only rows matching in both tables.\n- **LEFT JOIN** — all rows from the left table, NULLs where no match.\n- **RIGHT JOIN** — mirror of LEFT.\n- **FULL OUTER JOIN** — everything from both sides.\n- **CROSS JOIN** — cartesian product.\n\n```sql\nSELECT e.name, d.department\nFROM employees e\nINNER JOIN departments d ON d.id = e.department_id;\n```\n\nTip: when a LEFT JOIN silently drops rows, check whether a WHERE clause on the right table turned it into an INNER JOIN.",
  },
  {
    match: ["python example", "python"],
    answer:
      "Here is a compact example that loads data, engineers a feature and trains a baseline model:\n\n```python\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import f1_score\n\ndf = pd.read_csv(\"employees.csv\")\ndf[\"tenure_years\"] = df[\"tenure_months\"] / 12\n\nX = df[[\"tenure_years\", \"training_hours\", \"quiz_score\"]]\ny = df[\"promoted\"]\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LogisticRegression(max_iter=1000).fit(X_train, y_train)\nprint(f1_score(y_test, model.predict(X_test)))\n```\n\nTry changing the metric to accuracy and notice how misleading it becomes on imbalanced data.",
  },
  {
    match: ["overfitting", "overfit"],
    answer:
      "Overfitting happens when a model memorises the training set — including its noise — and therefore generalises badly.\n\n**Signs:** training accuracy keeps rising while validation accuracy plateaus or falls.\n\n**Fixes:**\n- More or better data, including augmentation\n- Regularisation (L1/L2, dropout)\n- Simpler model or fewer features\n- Early stopping on validation loss\n- Cross-validation to get an honest estimate\n\nThe mirror problem is underfitting, where the model is too simple to capture the signal at all.",
  },
];

export const genericTutorAnswer =
  "Here is how I would approach that.\n\nFirst, break the topic into the concept, a worked example, and a check for understanding. Based on your profile (Python 82%, SQL 64%, Machine Learning 58%) I would anchor the explanation in a Python example you can run, then connect it back to your Data Scientist target role.\n\nAsk me to go deeper on any step, or pick one of the suggested questions to continue.";

export const analytics = {
  summary: { averageScore: 82, learningHours: 24, coursesCompleted: 6, quizAttempts: 18 },
  quizOverTime: [
    { date: "Week 1", score: 62 },
    { date: "Week 2", score: 68 },
    { date: "Week 3", score: 71 },
    { date: "Week 4", score: 66 },
    { date: "Week 5", score: 78 },
    { date: "Week 6", score: 84 },
    { date: "Week 7", score: 82 },
    { date: "Week 8", score: 88 },
  ],
  hoursPerWeek: [
    { week: "W1", hours: 2 },
    { week: "W2", hours: 4 },
    { week: "W3", hours: 3 },
    { week: "W4", hours: 5 },
    { week: "W5", hours: 2 },
    { week: "W6", hours: 4 },
    { week: "W7", hours: 1 },
    { week: "W8", hours: 3 },
  ],
  skillImprovement: [
    { skill: "Python", start: 62, now: 82 },
    { skill: "SQL", start: 44, now: 64 },
    { skill: "ML", start: 30, now: 58 },
    { skill: "DL", start: 18, now: 42 },
    { skill: "Comm.", start: 68, now: 76 },
  ],
  courseCompletion: [
    { name: "Completed", value: 6 },
    { name: "In Progress", value: 3 },
    { name: "Not Started", value: 5 },
  ],
};

export const targetRoles = [
  {
    id: "data-scientist",
    name: "Data Scientist",
    readiness: 76,
    requirements: [
      { skill: "Python", current: 82, required: 85 },
      { skill: "SQL", current: 64, required: 80 },
      { skill: "Machine Learning", current: 58, required: 85 },
      { skill: "Deep Learning", current: 42, required: 70 },
      { skill: "Communication", current: 76, required: 70 },
    ],
  },
  {
    id: "ml-engineer",
    name: "ML Engineer",
    readiness: 68,
    requirements: [
      { skill: "Python", current: 82, required: 90 },
      { skill: "SQL", current: 64, required: 70 },
      { skill: "Machine Learning", current: 58, required: 85 },
      { skill: "Deep Learning", current: 42, required: 80 },
      { skill: "Communication", current: 76, required: 65 },
    ],
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    readiness: 88,
    requirements: [
      { skill: "Python", current: 82, required: 70 },
      { skill: "SQL", current: 64, required: 85 },
      { skill: "Machine Learning", current: 58, required: 50 },
      { skill: "Deep Learning", current: 42, required: 30 },
      { skill: "Communication", current: 76, required: 75 },
    ],
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    readiness: 91,
    requirements: [
      { skill: "Python", current: 82, required: 80 },
      { skill: "SQL", current: 64, required: 65 },
      { skill: "Machine Learning", current: 58, required: 40 },
      { skill: "Deep Learning", current: 42, required: 25 },
      { skill: "Communication", current: 76, required: 70 },
    ],
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    readiness: 61,
    requirements: [
      { skill: "Python", current: 82, required: 88 },
      { skill: "SQL", current: 64, required: 70 },
      { skill: "Machine Learning", current: 58, required: 88 },
      { skill: "Deep Learning", current: 42, required: 85 },
      { skill: "Communication", current: 76, required: 70 },
    ],
  },
];

/* ---------------------------------- Admin --------------------------------- */

export const adminStats = {
  totalEmployees: 1248,
  averageSkillScore: 74,
  trainingCompletion: 68,
  employeesAtRisk: 124,
};

export const departmentPerformance = [
  { department: "IT", score: 78, completion: 74, readiness: 80 },
  { department: "HR", score: 62, completion: 58, readiness: 61 },
  { department: "Finance", score: 71, completion: 66, readiness: 69 },
  { department: "Operations", score: 58, completion: 52, readiness: 55 },
  { department: "Sales", score: 66, completion: 63, readiness: 64 },
];

export const trainingCompletionTrend = [
  { month: "Apr", started: 320, completed: 180 },
  { month: "May", started: 410, completed: 245 },
  { month: "Jun", started: 385, completed: 262 },
  { month: "Jul", started: 470, completed: 318 },
  { month: "Aug", started: 520, completed: 366 },
  { month: "Sep", started: 560, completed: 412 },
];

export const skillDemand = [
  { skill: "Generative AI", demand: 85, capability: 35 },
  { skill: "Cloud Computing", demand: 78, capability: 58 },
  { skill: "Cybersecurity", demand: 80, capability: 46 },
  { skill: "Data Analytics", demand: 74, capability: 62 },
  { skill: "Machine Learning", demand: 82, capability: 54 },
  { skill: "Artificial Intelligence", demand: 88, capability: 48 },
];

export const readinessDistribution = [
  { name: "Role Ready", value: 412 },
  { name: "On Track", value: 486 },
  { name: "Needs Attention", value: 226 },
  { name: "At Risk", value: 124 },
];

export interface EmployeeRow {
  id: string;
  name: string;
  department: string;
  role: string;
  skillScore: number;
  progress: number;
  readiness: number;
  status: "On Track" | "Needs Attention" | "At Risk" | "Role Ready";
  email: string;
  skills: { skill: string; current: number; required: number }[];
  assessments: { name: string; score: number; date: string }[];
}

const mkSkills = (base: number) => [
  { skill: "Python", current: Math.min(98, base + 8), required: 85 },
  { skill: "SQL", current: Math.max(20, base - 6), required: 80 },
  { skill: "Machine Learning", current: Math.max(18, base - 14), required: 85 },
  { skill: "Deep Learning", current: Math.max(12, base - 28), required: 70 },
  { skill: "Communication", current: Math.min(96, base + 2), required: 70 },
];

const mkAssessments = (base: number) => [
  { name: "Core Skills Assessment", score: base, date: "02 Sep 2026" },
  { name: "Domain Assessment L1", score: Math.max(30, base - 9), date: "18 Aug 2026" },
  { name: "Communication Assessment", score: Math.min(97, base + 6), date: "04 Aug 2026" },
];

const rawEmployees: [string, string, string, number, number, number, EmployeeRow["status"]][] = [
  ["Ravi Kumar", "IT", "Software Engineer", 82, 76, 88, "On Track"],
  ["Priya Sharma", "HR", "HR Manager", 71, 68, 74, "Needs Attention"],
  ["Arjun Mehta", "IT", "Data Engineer", 88, 84, 91, "Role Ready"],
  ["Sneha Iyer", "Finance", "Financial Analyst", 76, 71, 78, "On Track"],
  ["Vikram Rao", "Operations", "Operations Lead", 54, 41, 48, "At Risk"],
  ["Ananya Bose", "IT", "ML Engineer", 91, 88, 93, "Role Ready"],
  ["Rahul Nair", "Sales", "Account Executive", 63, 57, 60, "Needs Attention"],
  ["Meera Joshi", "Finance", "Risk Analyst", 79, 74, 81, "On Track"],
  ["Karan Singh", "Operations", "Process Analyst", 48, 36, 42, "At Risk"],
  ["Divya Menon", "HR", "L&D Specialist", 74, 80, 77, "On Track"],
  ["Sanjay Patel", "IT", "Cloud Architect", 86, 79, 87, "Role Ready"],
  ["Nisha Verma", "Sales", "Sales Manager", 68, 62, 66, "Needs Attention"],
];

export const employees: EmployeeRow[] = rawEmployees.map(
  ([name, department, role, skillScore, progress, readiness, status], i) => ({
    id: `EMP-1${(480 + i * 7).toString()}`,
    name,
    department,
    role,
    skillScore,
    progress,
    readiness,
    status,
    email: `${name.toLowerCase().split(" ").join(".")}@org.gov.in`,
    skills: mkSkills(skillScore),
    assessments: mkAssessments(skillScore),
  }),
);

export const heatmapSkills = ["Python", "SQL", "ML", "Deep Learning", "Cloud", "AI"];
export const heatmap = [
  { department: "IT", values: [82, 76, 70, 55, 78, 64] },
  { department: "HR", values: [60, 68, 42, 25, 40, 35] },
  { department: "Finance", values: [72, 80, 45, 30, 50, 38] },
  { department: "Operations", values: [55, 62, 35, 22, 44, 30] },
  { department: "Sales", values: [48, 58, 32, 20, 42, 28] },
];

export const departmentDetails: Record<
  string,
  {
    employees: number;
    avgScore: number;
    completion: number;
    readiness: number;
    distribution: { skill: string; value: number }[];
    progress: { month: string; value: number }[];
    topSkills: string[];
    gaps: string[];
    training: string[];
  }
> = {
  IT: {
    employees: 412,
    avgScore: 78,
    completion: 74,
    readiness: 80,
    distribution: [
      { skill: "Python", value: 82 },
      { skill: "SQL", value: 76 },
      { skill: "ML", value: 70 },
      { skill: "Cloud", value: 78 },
      { skill: "AI", value: 64 },
    ],
    progress: [
      { month: "Apr", value: 58 },
      { month: "May", value: 62 },
      { month: "Jun", value: 66 },
      { month: "Jul", value: 69 },
      { month: "Aug", value: 72 },
      { month: "Sep", value: 74 },
    ],
    topSkills: ["Python", "Cloud Computing", "SQL"],
    gaps: ["Deep Learning", "Generative AI"],
    training: ["Deep Learning Basics", "Generative AI Applications", "MLOps Essentials"],
  },
  HR: {
    employees: 118,
    avgScore: 62,
    completion: 58,
    readiness: 61,
    distribution: [
      { skill: "Python", value: 60 },
      { skill: "SQL", value: 68 },
      { skill: "ML", value: 42 },
      { skill: "Cloud", value: 40 },
      { skill: "AI", value: 35 },
    ],
    progress: [
      { month: "Apr", value: 42 },
      { month: "May", value: 46 },
      { month: "Jun", value: 49 },
      { month: "Jul", value: 52 },
      { month: "Aug", value: 55 },
      { month: "Sep", value: 58 },
    ],
    topSkills: ["People Analytics", "SQL", "Communication"],
    gaps: ["Machine Learning", "AI Literacy"],
    training: ["AI for HR Professionals", "People Analytics with SQL", "Data Storytelling"],
  },
  Finance: {
    employees: 206,
    avgScore: 71,
    completion: 66,
    readiness: 69,
    distribution: [
      { skill: "Python", value: 72 },
      { skill: "SQL", value: 80 },
      { skill: "ML", value: 45 },
      { skill: "Cloud", value: 50 },
      { skill: "AI", value: 38 },
    ],
    progress: [
      { month: "Apr", value: 48 },
      { month: "May", value: 53 },
      { month: "Jun", value: 57 },
      { month: "Jul", value: 60 },
      { month: "Aug", value: 63 },
      { month: "Sep", value: 66 },
    ],
    topSkills: ["SQL", "Risk Modelling", "Python"],
    gaps: ["Machine Learning", "Cloud Computing"],
    training: ["ML for Financial Forecasting", "Cloud Fundamentals", "Advanced SQL"],
  },
  Operations: {
    employees: 324,
    avgScore: 58,
    completion: 52,
    readiness: 55,
    distribution: [
      { skill: "Python", value: 55 },
      { skill: "SQL", value: 62 },
      { skill: "ML", value: 35 },
      { skill: "Cloud", value: 44 },
      { skill: "AI", value: 30 },
    ],
    progress: [
      { month: "Apr", value: 34 },
      { month: "May", value: 38 },
      { month: "Jun", value: 42 },
      { month: "Jul", value: 46 },
      { month: "Aug", value: 49 },
      { month: "Sep", value: 52 },
    ],
    topSkills: ["Process Excellence", "SQL", "Reporting"],
    gaps: ["Automation", "Data Analytics", "AI"],
    training: ["Process Automation Basics", "Data Analytics Foundations", "Excel to Python"],
  },
  Sales: {
    employees: 188,
    avgScore: 66,
    completion: 63,
    readiness: 64,
    distribution: [
      { skill: "Python", value: 48 },
      { skill: "SQL", value: 58 },
      { skill: "ML", value: 32 },
      { skill: "Cloud", value: 42 },
      { skill: "AI", value: 28 },
    ],
    progress: [
      { month: "Apr", value: 44 },
      { month: "May", value: 48 },
      { month: "Jun", value: 52 },
      { month: "Jul", value: 56 },
      { month: "Aug", value: 60 },
      { month: "Sep", value: 63 },
    ],
    topSkills: ["Negotiation", "CRM Analytics", "Communication"],
    gaps: ["Data Analytics", "Generative AI"],
    training: ["Generative AI for Sales", "CRM Data Analytics", "Storytelling with Data"],
  },
};

export const trainingAnalytics = {
  summary: { started: 2665, completed: 1783, completionRate: 67, averageScore: 76 },
  completion: [
    { course: "Python", started: 620, completed: 470 },
    { course: "Machine Learning", started: 540, completed: 322 },
    { course: "SQL", started: 580, completed: 448 },
    { course: "Cloud Computing", started: 490, completed: 318 },
    { course: "Generative AI", started: 435, completed: 225 },
  ],
  popular: [
    { course: "Python", learners: 620 },
    { course: "SQL", learners: 580 },
    { course: "Machine Learning", learners: 540 },
    { course: "Cloud Computing", learners: 490 },
    { course: "Generative AI", learners: 435 },
  ],
  hours: [
    { month: "Apr", hours: 1840 },
    { month: "May", hours: 2120 },
    { month: "Jun", hours: 2380 },
    { month: "Jul", hours: 2660 },
    { month: "Aug", hours: 3010 },
    { month: "Sep", hours: 3320 },
  ],
  assessmentPerformance: [
    { level: "Beginner", score: 84 },
    { level: "Intermediate", score: 74 },
    { level: "Advanced", score: 62 },
  ],
  topCourses: [
    { name: "Python", learners: 620, rate: 76, score: 82 },
    { name: "Machine Learning", learners: 540, rate: 60, score: 71 },
    { name: "SQL", learners: 580, rate: 77, score: 80 },
    { name: "Cloud Computing", learners: 490, rate: 65, score: 74 },
    { name: "Generative AI", learners: 435, rate: 52, score: 68 },
  ],
};

export const futureSkills = [
  {
    skill: "Artificial Intelligence",
    capability: 48,
    demand: 88,
    priority: "Critical" as const,
    rationale:
      "AI-enabled service delivery is a stated 2027 objective. Only 48% organisational capability against an 88% projected requirement leaves a 40% shortfall across 1,248 employees.",
  },
  {
    skill: "Generative AI",
    capability: 35,
    demand: 85,
    priority: "Critical" as const,
    rationale:
      "Generative AI appears in 62% of newly published internal role profiles, yet capability is the lowest of any tracked skill.",
  },
  {
    skill: "Cybersecurity",
    capability: 46,
    demand: 80,
    priority: "High" as const,
    rationale: "Compliance mandates and rising incident volume raise the required baseline for every department, not just IT.",
  },
  {
    skill: "Cloud Computing",
    capability: 58,
    demand: 78,
    priority: "High" as const,
    rationale: "Ongoing datacentre-to-cloud migration requires 78% baseline capability by Q3 2027.",
  },
  {
    skill: "Data Analytics",
    capability: 62,
    demand: 74,
    priority: "Medium" as const,
    rationale: "Capability is closest to target; targeted upskilling in Operations and Sales closes most of the remaining gap.",
  },
  {
    skill: "Machine Learning",
    capability: 54,
    demand: 82,
    priority: "High" as const,
    rationale: "Predictive workload planning and demand forecasting projects need ML-literate staff in four departments.",
  },
];

export const futurePrograms = [
  { name: "Generative AI Foundations", audience: "All departments", duration: "6 weeks", covers: ["Generative AI", "AI"], impact: "+22% capability" },
  { name: "Applied Machine Learning Track", audience: "IT, Finance", duration: "10 weeks", covers: ["Machine Learning", "Data Analytics"], impact: "+18% capability" },
  { name: "Cyber Resilience Certification", audience: "All departments", duration: "4 weeks", covers: ["Cybersecurity"], impact: "+25% capability" },
  { name: "Cloud Migration Bootcamp", audience: "IT, Operations", duration: "8 weeks", covers: ["Cloud Computing"], impact: "+16% capability" },
];

export const notifications = [
  { id: "n1", title: "New assessment assigned", body: "Machine Learning Level 2 is due on 12 Oct 2026.", time: "1h ago", unread: true },
  { id: "n2", title: "Document processed", body: "Generative_AI_Handbook.pdf is now AI-ready.", time: "4h ago", unread: true },
  { id: "n3", title: "Roadmap updated", body: "Week 3 now recommends Machine Learning Fundamentals.", time: "Yesterday", unread: false },
  { id: "n4", title: "Quiz streak", body: "You completed 5 quizzes this week. Keep going!", time: "2 days ago", unread: false },
];
