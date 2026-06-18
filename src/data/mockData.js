export const mockColleges = [
  { id: "c1", name: "UIT", fullName: "University Institute of Technology", specializations: [
      { id: "s1", name: "B.Tech CSE", years: [
          { id: "y1", label: "2nd Year - Sem 3", batches: [
              { id: "b1", name: "CSE-B 2024", facultyIds: ["f1"], studentIds: ["st1", "st2"] },
              { id: "b2", name: "CSE-A 2023", facultyIds: ["f2"], studentIds: ["st3"] }
          ]}
      ]},
      { id: "s2", name: "B.Tech ECE", years: [
          { id: "y2", label: "2nd Year - Sem 3", batches: [
              { id: "b3", name: "ECE-A 2024", facultyIds: ["f3"], studentIds: [] }
          ]}
      ]}
  ]},
  { id: "c2", name: "USCS", fullName: "University School of Computer Science", placeholder: true },
  { id: "c3", name: "Law", fullName: "School of Law", placeholder: true },
  { id: "c4", name: "MBA", fullName: "School of Business", placeholder: true },
  { id: "c5", name: "UIM (BBA)", fullName: "University Institute of Management", placeholder: true }
];

export const mockStudents = [
  { id: "st1", name: "Aarav Sharma", photoUrl: "https://i.pravatar.cc/150?u=st1", erpId: "UIT2024CSE0145", email: "aarav.s@university.edu", college: "UIT", specialization: "B.Tech CSE", year: "2nd Year", semester: "Sem 3", domain: "Computer Science", enrolledBatches: ["b1"], rating: 1450, problemsSolved: 42, contestsParticipated: 5, rank: 12, badges: ["Fast Solver", "Top 10%"] },
  { id: "st2", name: "Priya Patel", photoUrl: "https://i.pravatar.cc/150?u=st2", erpId: "UIT2024CSE0146", email: "priya.p@university.edu", college: "UIT", specialization: "B.Tech CSE", year: "2nd Year", semester: "Sem 3", domain: "Computer Science", enrolledBatches: ["b1"], rating: 1620, problemsSolved: 85, contestsParticipated: 8, rank: 3, badges: ["Code Master"] },
  { id: "st3", name: "Rohan Gupta", photoUrl: "https://i.pravatar.cc/150?u=st3", erpId: "UIT2023CSE0012", email: "rohan.g@university.edu", college: "UIT", specialization: "B.Tech CSE", year: "3rd Year", semester: "Sem 5", domain: "Computer Science", enrolledBatches: ["b2"], rating: 1200, problemsSolved: 15, contestsParticipated: 2, rank: 45, badges: [] }
];

export const mockFaculty = [
  { id: "f1", name: "Dr. Vikram Singh", photoUrl: "https://i.pravatar.cc/150?u=f1", erpId: "FAC001", email: "vikram.s@university.edu", college: "UIT", department: "Computer Science", designation: "Associate Professor", branch: "CSE", subjectsTaught: ["Data Structures", "Algorithms"], assignedBatches: ["b1"], lecturesUploaded: 12, assessmentsCreated: 4 },
  { id: "f2", name: "Prof. Neha Verma", photoUrl: "https://i.pravatar.cc/150?u=f2", erpId: "FAC002", email: "neha.v@university.edu", college: "UIT", department: "Computer Science", designation: "Assistant Professor", branch: "CSE", subjectsTaught: ["Database Management Systems", "Operating Systems"], assignedBatches: ["b2"], lecturesUploaded: 8, assessmentsCreated: 2 },
  { id: "f3", name: "Dr. Sanjay Kumar", photoUrl: "https://i.pravatar.cc/150?u=f3", erpId: "FAC003", email: "sanjay.k@university.edu", college: "UIT", department: "Electronics", designation: "Professor", branch: "ECE", subjectsTaught: ["Digital Logic", "Microprocessors"], assignedBatches: ["b3"], lecturesUploaded: 15, assessmentsCreated: 6 }
];

export const mockAdmins = [
  { id: "a0", name: "Prof. S. K. Gupta", photoUrl: "https://i.pravatar.cc/150?u=a0", roleLevel: "VC", role: "Vice Chancellor", college: "Apex University", managedCollege: "All", managedDepartment: "All", permissions: ["god-mode"] },
  { id: "a1", name: "Dr. Alok Nath", photoUrl: "https://i.pravatar.cc/150?u=a1", roleLevel: "Dean", role: "Dean of UIT", college: "UIT", managedCollege: "UIT", managedDepartment: "All", permissions: ["manage-faculty","manage-students","manage-batches","allocate-faculty","view-all-records"] },
  { id: "a2", name: "Dr. Ritu Sharma", photoUrl: "https://i.pravatar.cc/150?u=a2", roleLevel: "HOD", role: "HOD - Computer Science", college: "UIT", managedCollege: "UIT", managedDepartment: "Computer Science", permissions: ["manage-faculty","view-students","view-batches"] }
];

export const mockProblems = [
  { id: "p1", title: "Two Sum", type: "Coding", difficulty: "Easy", tags: ["Arrays", "Hash Table"], description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", starterCode: "function twoSum(nums, target) {\n  \n}", sampleTestCases: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]", languages: ["javascript", "python", "cpp", "java"], status: "Solved", acceptance: 45.2 },
  { id: "p2", title: "Reverse Linked List", type: "Coding", difficulty: "Medium", tags: ["Linked List"], description: "Given the head of a singly linked list, reverse the list, and return the reversed list.", starterCode: "function reverseList(head) {\n  \n}", sampleTestCases: "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]", languages: ["javascript", "python", "cpp", "java"], status: "Unsolved", acceptance: 34.5 },
  { id: "p3", title: "Explain ACID Properties", type: "Subjective", difficulty: "Easy", tags: ["Database"], description: "Explain the ACID properties in a database management system with real-world examples." }
];

const now = new Date();
const futureStart = new Date(now.getTime() + 1000 * 60 * 60 * 24);
const futureEnd = new Date(now.getTime() + 1000 * 60 * 60 * 26);
const pastStart = new Date(now.getTime() - 1000 * 60 * 60 * 48);
const pastEnd = new Date(now.getTime() - 1000 * 60 * 60 * 46);

export const mockContests = [
  { 
    id: "ct1", title: "Weekly Coding Challenge #45", type: "Contest", questionTypes: ["Coding"], 
    scheduledStartTime: futureStart.toISOString(), scheduledEndTime: futureEnd.toISOString(), durationMins: 120, 
    batchIds: ["b1", "b2"], createdBy: "f1", problems: ["p1", "p2"], participantsCount: 45, status: "Scheduled",
    solutionVideoId: "l1"
  },
  { 
    id: "ct2", title: "DSA Mid-Term Challenge", type: "Contest", questionTypes: ["Coding"], 
    scheduledStartTime: pastStart.toISOString(), scheduledEndTime: pastEnd.toISOString(), durationMins: 120, 
    batchIds: ["b1"], createdBy: "f1", problems: ["p1", "p2"], participantsCount: 85, status: "Ended",
    solutionVideoId: "l2"
  }
];

export const mockLectures = [
  { id: "l1", title: "Editorial: Weekly Challenge #45", subject: "Data Structures", facultyId: "f1", batchId: "b1", uploadDate: "2026-06-01", durationMins: 45, thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80", description: "Complete solution walkthrough for the weekly coding challenge.", views: 120 },
  { id: "l2", title: "Editorial: DSA Mid-Term", subject: "Data Structures", facultyId: "f1", batchId: "b1", uploadDate: "2026-06-10", durationMins: 60, thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80", description: "Detailed explanations of all problems in the Mid-Term.", views: 85 }
];

export const mockSubmissions = [
  { studentId: "st1", contestId: "ct2", status: "Evaluated", score: 85, accuracy: 92, rank: 4, submittedAt: pastEnd.toISOString() }
];
