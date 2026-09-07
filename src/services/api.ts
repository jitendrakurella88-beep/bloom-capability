import * as M from "@/data/mock";
import { request, mock, USE_MOCK, apiClient } from "./apiClient";

/* ------------------------------- Employee -------------------------------- */

export const getProfile = () => request("/employee/profile", M.employeeProfile);

export const getDashboard = () =>
  request("/employee/dashboard", {
    stats: M.dashboardStats,
    skills: M.skills,
    trend: M.skillTrend,
    recommended: M.recommendedCourses,
    activity: M.recentActivity,
    upcoming: M.upcomingAssessments,
  });

export const getLearningMaterials = () => request("/employee/materials", M.learningMaterials);

export const getAssessment = () =>
  request("/employee/assessment", {
    title: "Core Competency Assessment",
    questions: M.assessmentQuestions,
  });

export const getSkillGap = () => request("/employee/skill-gap", M.skills);

export const getRoadmap = () => request("/employee/roadmap", M.roadmap);

export const getQuiz = (difficulty: "Easy" | "Medium" | "Hard") =>
  request(`/employee/quiz?difficulty=${difficulty}`, M.quizBank[difficulty]);

export const getAnalytics = (range: string) => request(`/employee/analytics?range=${range}`, M.analytics);

export const getRoleReadiness = () => request("/employee/role-readiness", M.targetRoles);

export const getNotifications = () => request("/notifications", M.notifications, 200);

export async function sendAITutorMessage(message: string): Promise<{ reply: string }> {
  if (!USE_MOCK) {
    const { data } = await apiClient.post<{ reply: string }>("/ai-tutor/chat", { message });
    return data;
  }
  const lower = message.toLowerCase();
  const hit = M.tutorAnswers.find((a) => a.match.some((m) => lower.includes(m)));
  return mock({ reply: hit ? hit.answer : M.genericTutorAnswer }, 900);
}

/* --------------------------------- Admin ---------------------------------- */

export const getAdminDashboard = () =>
  request("/admin/dashboard", {
    stats: M.adminStats,
    departments: M.departmentPerformance,
    training: M.trainingCompletionTrend,
    demand: M.skillDemand,
    readiness: M.readinessDistribution,
  });

export const getEmployees = () => request("/admin/employees", M.employees);

export const getSkillHeatmap = () =>
  request("/admin/skill-heatmap", { skills: M.heatmapSkills, rows: M.heatmap });

export const getDepartmentAnalytics = (department: string) =>
  request(`/admin/departments/${department}`, {
    detail: M.departmentDetails[department] ?? M.departmentDetails["IT"]!,
    comparison: M.departmentPerformance,
  });

export const getTrainingAnalytics = () => request("/admin/training", M.trainingAnalytics);

export const getFutureSkills = () =>
  request("/admin/future-skills", { skills: M.futureSkills, programs: M.futurePrograms });
