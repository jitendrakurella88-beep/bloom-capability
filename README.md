# LearnSphere Pro

Build a complete, modern, responsive AI-enabled Learning and Capability Platform based on the SIH26101 problem statement.

PROJECT NAME:
AI LearnHub – AI-enabled Learning & Capability Platform

GOAL:
Create a professional full-stack-ready frontend prototype for an employee learning and capability platform. The frontend should initially use realistic dummy/mock data, but the architecture must be ready to connect to a FastAPI backend later using REST APIs.

TECH STACK:
- React
- TypeScript
- Tailwind CSS
- React Router
- Recharts for analytics and charts
- Axios for API integration
- Lucide React for icons

DESIGN:
Create a premium, modern SaaS-style dashboard.
Use a clean professional interface suitable for a government/enterprise learning platform.
Use a light theme with white cards, subtle borders, soft shadows, rounded corners, and a professional blue/indigo accent.
Make the UI fully responsive for desktop, tablet, and mobile.
Do not make it look like a generic template.
Use consistent spacing, typography, icons, buttons, cards, charts, progress indicators, badges, and empty/loading states.

IMPORTANT:
This is a FRONTEND implementation.
Do NOT try to implement the actual AI, RAG, document parsing, ML model, or backend logic.
Use realistic dummy data and simulated responses for now.
Structure the code so real APIs can easily replace the dummy data later.

==================================================
1. AUTHENTICATION
==================================================

Create a Login page.

Fields:
- Email
- Password
- Remember me
- Login button

Add a simple role-based demo login.

Demo accounts:
Employee:
email: employee@test.com
password: 123456

Admin:
email: admin@test.com
password: 123456

After login:
- Employee → Employee Dashboard
- Admin → Admin Dashboard

For now, authentication can be simulated using local state/localStorage.

Add logout functionality.

==================================================
2. EMPLOYEE SIDEBAR
==================================================

Create a reusable employee sidebar with:

- Dashboard
- Profile
- Learning Materials
- Assessment
- Skill Gap
- Learning Roadmap
- AI Tutor
- Quiz
- Performance Analytics
- Role Readiness

Sidebar should:
- Show icons
- Highlight active page
- Collapse on smaller screens
- Have logout button

Create a top navigation bar with:
- Page title
- Search
- Notification icon
- User avatar/profile menu

==================================================
3. EMPLOYEE DASHBOARD
==================================================

Create a professional employee dashboard.

Header:
"Good Morning, [Employee Name] 👋"
Subtitle:
"Continue your learning journey and build the skills you need for your target role."

Show summary cards:

1. Overall Skill Score
2. Learning Progress
3. Courses Completed
4. Average Quiz Score

Create a Skill Progress chart using Recharts.

Create:
- Current Skills section
- Recommended Learning section
- Recent Activity section
- Upcoming Assessments section

Example skills:
Python – 82%
SQL – 64%
Machine Learning – 58%
Deep Learning – 42%
Communication – 76%

Recommended learning cards:
- Advanced SQL
- Machine Learning Fundamentals
- Deep Learning Basics
- Generative AI

Each card should have:
- Skill/course name
- Description
- Difficulty
- Estimated time
- Progress
- Start Learning button

==================================================
4. PROFILE PAGE
==================================================

Create an employee profile page.

Display:
- Profile photo/avatar
- Full name
- Employee ID
- Email
- Department
- Designation
- Experience
- Location

Sections:
Personal Information
Professional Information
Current Skills
Certifications
Learning Preferences

Add:
"Edit Profile" button.

Use a modal or editable form for editing.

==================================================
5. LEARNING MATERIALS
==================================================

Create a Learning Materials page.

This represents the document-upload portion of the AI platform.

Add:
"Upload Learning Material" button.

Allow UI for uploading:
- PDF
- DOCX
- PPTX
- TXT

Show uploaded documents in cards/table.

Each material should show:
- File name
- File type
- Upload date
- File size
- Processing status
- Actions

Statuses:
- Processing
- Processed
- Failed

Add simulated document processing progress.

Example:

Machine_Learning_Basics.pdf
Status: Processed
"AI-ready"

Important:
Do not actually implement document parsing or RAG.
Only create the frontend interface and mock processing status.

==================================================
6. ASSESSMENT PAGE
==================================================

Create an employee skill assessment interface.

Show:
Assessment title
Progress indicator
Question number
Question
Multiple-choice answers
Next button
Previous button
Submit Assessment button

Example:

"Which algorithm is commonly used for classification?"

Options:
- Linear Regression
- Logistic Regression
- K-Means
- PCA

After completion show:

Assessment Completed 🎉

Score: 78%

Show:
- Correct answers
- Incorrect answers
- Skill areas evaluated

Button:
"View Skill Gap"

==================================================
7. SKILL GAP ANALYSIS
==================================================

Create a visually impressive Skill Gap page.

Title:
"Your Skill Gap Analysis"

Show comparison:

Skill | Current Level | Required Level | Gap

Python | 82% | 85% | 3%
SQL | 64% | 80% | 16%
Machine Learning | 58% | 85% | 27%
Deep Learning | 42% | 70% | 28%

Use:
- Progress bars
- Charts
- Status badges
- Gap indicators

Create sections:

Strengths
- Python
- Communication

Needs Improvement
- SQL
- Machine Learning

Priority Skills
- Deep Learning
- Machine Learning

Add an "Explain Recommendation" button.

When clicked, show:

"Why is this recommended?"

Explain using mock data:
"The target role requires strong Machine Learning skills. Your current assessment score is below the expected level, so improving Machine Learning will have the highest impact on your role readiness."

==================================================
8. PERSONALIZED LEARNING ROADMAP
==================================================

Create a Learning Roadmap page.

Show a visual timeline:

Week 1
SQL Fundamentals
↓
Week 2
Advanced SQL
↓
Week 3
Machine Learning
↓
Week 4
Deep Learning
↓
Week 5
Generative AI

Each learning item should show:
- Skill
- Course
- Estimated hours
- Difficulty
- Progress
- Status
- Start Learning button

Statuses:
Not Started
In Progress
Completed

Add:
"Why this roadmap?" explanation section.

Show:
"Your roadmap is generated based on your skill gaps, assessment performance, target role, and learning progress."

Use mock data for now.

==================================================
9. AI TUTOR
==================================================

Create an AI Tutor chat interface.

Layout similar to a modern AI chat application.

Left side:
Conversation history.

Main area:
Chat messages.

User can type:
"Explain neural networks"

AI responds with a realistic dummy answer.

Include:
- Text input
- Send button
- Suggested questions
- Clear conversation button
- Copy response button

Suggested questions:
- Explain Machine Learning
- What is a neural network?
- Explain SQL joins
- Give me a Python example
- Explain overfitting

Add an AI status indicator.

Important:
Do not connect to a real LLM yet.
Use mock responses.

Architecture should make it easy to later connect:
POST /api/ai-tutor/chat

==================================================
10. QUIZ PAGE
==================================================

Create a modern quiz interface.

Show:
- Quiz title
- Difficulty
- Question number
- Progress
- Question
- Four options
- Timer
- Next
- Previous
- Submit

Include different difficulty levels:
Easy
Medium
Hard

After submission show a result page:

Quiz Completed

Score: 8/10
Accuracy: 80%

Show:
Correct Answers
Incorrect Answers
Topics to Improve

Add:
"Try Again"
"Continue Learning"

==================================================
11. ADAPTIVE QUIZ UI
==================================================

Create a visual indication of adaptive difficulty.

Example:

Current Difficulty:
Medium

Performance:
80%

Next Question Difficulty:
Hard

Show a small explanation:

"Difficulty adjusted based on your recent performance."

This is only frontend simulation.
Do not implement the actual adaptive ML algorithm.

==================================================
12. PERFORMANCE ANALYTICS
==================================================

Create a Performance Analytics page.

Show summary cards:

Average Score
82%

Learning Hours
24 hrs

Courses Completed
6

Quiz Attempts
18

Create charts using Recharts:

1. Quiz Performance Over Time
2. Learning Hours Per Week
3. Skill Improvement
4. Course Completion

Use:
- Line chart
- Bar chart
- Pie/donut chart

Add date filter:
7 Days
30 Days
90 Days
All Time

==================================================
13. ROLE READINESS
==================================================

Create a Role Readiness page.

Allow user to select target role:

Data Scientist
ML Engineer
Data Analyst
Software Engineer
AI Engineer

For selected role show:

Overall Readiness
76%

Create a circular progress indicator.

Then show:

Python
Current: 82%
Required: 85%

SQL
Current: 64%
Required: 80%

Machine Learning
Current: 58%
Required: 85%

Deep Learning
Current: 42%
Required: 70%

Communication
Current: 76%
Required: 70%

Show:
Strengths
Skill Gaps
Recommended Actions

Create an "Explain Readiness" section explaining why the employee received the score.

==================================================
14. ADMIN DASHBOARD
==================================================

Create a separate admin layout.

Admin sidebar:

- Dashboard
- Employees
- Skill Heatmap
- Department Analytics
- Training Analytics
- Future Skill Needs

Admin Dashboard header:

"Organization Learning Overview"

Summary cards:

Total Employees
1,248

Average Skill Score
74%

Training Completion
68%

Employees At Risk
124

Create charts:

1. Department Skill Performance
2. Training Completion
3. Skill Demand
4. Employee Readiness

==================================================
15. EMPLOYEE OVERVIEW
==================================================

Create admin employee management page.

Include:
Search
Filter by department
Filter by role
Filter by readiness

Table columns:

Employee
Department
Role
Skill Score
Learning Progress
Role Readiness
Status

Example:

Ravi Kumar
IT
Software Engineer
82%
76%
88%
On Track

Priya Sharma
HR
HR Manager
71%
68%
74%
Needs Attention

Add "View Details" button.

Create employee detail view with:
- Skills
- Skill gaps
- Learning progress
- Assessments
- Role readiness

==================================================
16. SKILL HEATMAP
==================================================

Create an organization-wide skill heatmap.

Rows:
Departments

Columns:
Skills

Example:

             Python SQL ML Deep Learning Cloud AI
IT             82    76  70    55        78   64
HR             60    68  42    25        40   35
Finance        72    80  45    30        50   38
Operations     55    62  35    22        44   30

Use visual intensity indicators.

Add legend:
High
Medium
Low

Make this visually impressive.

==================================================
17. DEPARTMENT ANALYTICS
==================================================

Create Department Analytics.

Department selector:
IT
HR
Finance
Operations
Sales

Show:
Employee count
Average skill score
Training completion
Average readiness

Charts:
- Skill distribution
- Learning progress
- Department comparison

Show:
Top Skills
Skill Gaps
Recommended Training

==================================================
18. TRAINING ANALYTICS
==================================================

Create Training Analytics page.

Show:

Courses Started
Courses Completed
Average Completion Rate
Average Course Score

Create charts:
- Course completion
- Most popular courses
- Learning hours
- Assessment performance

Show top courses:
Python
Machine Learning
SQL
Cloud Computing
Generative AI

==================================================
19. FUTURE SKILL NEEDS
==================================================

Create a Future Skill Needs page.

Show organization-level future skill demand.

Skills:
Artificial Intelligence
Generative AI
Cybersecurity
Cloud Computing
Data Analytics
Machine Learning

For each show:
Current Capability
Future Demand
Skill Gap
Priority

Example:

Generative AI
Current Capability: 35%
Future Demand: 85%
Gap: 50%
Priority: Critical

Use charts and visual indicators.

Add:
"Recommended Training Programs"

==================================================
20. EXPLAINABLE RECOMMENDATIONS
==================================================

Throughout the platform, recommendations must be explainable.

Whenever displaying:
- Recommended course
- Recommended skill
- Learning roadmap
- Role readiness
- Future skill

Add an "Why?" or "Explain" button.

When clicked show a modal/card explaining:

1. Current skill level
2. Required skill level
3. Assessment performance
4. Target role requirements
5. Learning history
6. Reason for recommendation

Use mock explanations.

==================================================
21. RESPONSIVENESS
==================================================

Make EVERY page responsive.

Desktop:
Sidebar + main content

Tablet:
Collapsible sidebar

Mobile:
Bottom navigation or hamburger menu

Charts must resize correctly.

Tables should become horizontally scrollable or card-based on mobile.

==================================================
22. COMPONENT ARCHITECTURE
==================================================

Create reusable components:

Navbar
Sidebar
AdminSidebar
StatCard
SkillCard
ProgressBar
SkillBadge
ChartCard
CourseCard
QuizQuestion
Modal
Notification
EmptyState
LoadingState
Button
Avatar
PageHeader

Avoid duplicating UI code.

==================================================
23. ROUTING
==================================================

Create routes:

/login

Employee:
/dashboard
/profile
/learning-materials
/assessment
/skill-gap
/roadmap
/ai-tutor
/quiz
/analytics
/role-readiness

Admin:
/admin
/admin/employees
/admin/skill-heatmap
/admin/departments
/admin/training
/admin/future-skills

Protect routes based on demo role.

==================================================
24. MOCK DATA
==================================================

Create centralized mock data.

Use realistic employee, skill, course, quiz, assessment, analytics, department, and future skill data.

Do NOT hardcode large amounts of data directly inside page components.

Keep mock data separate so it can later be replaced by API responses.

==================================================
25. API-READY ARCHITECTURE
==================================================

Create a service/API layer using Axios.

Example functions:

getProfile()
getDashboard()
getLearningMaterials()
getSkillGap()
getRoadmap()
getAssessment()
getQuiz()
getAnalytics()
getRoleReadiness()
getEmployees()
getDepartmentAnalytics()
getTrainingAnalytics()
getFutureSkills()
sendAITutorMessage()

Use a configurable API base URL.

For now, these can return mock data.

Make it easy to replace them with FastAPI endpoints later.

==================================================
26. LOADING AND ERROR STATES
==================================================

Every data-driven page should have:
- Loading state
- Error state
- Empty state

Use skeleton loaders where appropriate.

==================================================
27. UI QUALITY
==================================================

The application should feel like a real enterprise product, not a basic college project.

Use:
- Consistent design system
- Professional typography
- Clear visual hierarchy
- Responsive cards
- Smooth hover states
- Subtle transitions
- Accessible buttons/forms
- Proper spacing
- Helpful tooltips
- Meaningful empty states

Avoid excessive gradients, excessive animations, or clutter.

==================================================
28. DEMO EXPERIENCE
==================================================

Make the complete application usable from login to dashboard.

The demo should allow:

Employee:
Login
→ Dashboard
→ Assessment
→ Skill Gap
→ Roadmap
→ AI Tutor
→ Quiz
→ Analytics
→ Role Readiness

Admin:
Login
→ Dashboard
→ Employee Overview
→ Skill Heatmap
→ Department Analytics
→ Training Analytics
→ Future Skill Needs

Use realistic mock data throughout.

==================================================
29. IMPORTANT SIH DEMO STORY
==================================================

The UI should clearly demonstrate this flow:

Learning Material Upload
↓
Document Processing Status
↓
Assessment
↓
Competency/Skill Analysis
↓
Skill Gap Identification
↓
Explainable Recommendation
↓
Personalized Learning Roadmap
↓
AI Tutor
↓
Adaptive Quiz
↓
Performance Analytics
↓
Role Readiness
↓
Admin Organization Analytics
↓
Future Skill Needs

The frontend should visually communicate this complete journey.

==================================================
30. FINAL REQUIREMENT
==================================================

Generate the complete working frontend, not just static mockup screens.

All navigation buttons should work.
All routes should work.
All forms should work with mock data.
Charts should render.
Dialogs/modals should work.
Employee and Admin roles should work.
Responsive design should work.

Do not implement the backend or real AI yet.

At the end, make sure the project is clean, modular, reusable, and ready for future FastAPI + database + RAG + AI integration.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cab836bb-fa4c-404c-8a73-6fd554f80af8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
