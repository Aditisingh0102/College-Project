import React from 'react';
import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/shared/StatCard';
import { Building2, Users, GraduationCap, ClipboardList, Trophy, PlaySquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { currentUser, colleges, students, faculty, batches, contests, lectures } = useAppContext();

  if (!currentUser) return null;

  const isVC = currentUser.roleLevel === 'VC';
  const isDean = currentUser.roleLevel === 'Dean';
  const isHOD = currentUser.roleLevel === 'HOD';
  
  // Filter logic based on Role
  const scopedFaculty = (isVC || isDean)
    ? faculty 
    : faculty.filter(f => f.department === currentUser.managedDepartment);
    
  const scopedStudents = (isVC || isDean)
    ? students
    : students.filter(s => s.domain === currentUser.managedDepartment);

  const universityData = [
    { name: 'UIT', students: 850 },
    { name: 'USCS', students: 420 },
    { name: 'Law', students: 300 },
    { name: 'MBA', students: 250 },
    { name: 'BBA', students: 310 },
  ];

  const collegeData = [
    { name: 'Computer Science', students: 500 },
    { name: 'Electronics', students: 200 },
    { name: 'Mechanical', students: 150 },
  ];

  const deptData = [
    { name: '2nd Year', students: 120 },
    { name: '3rd Year', students: 180 },
    { name: '4th Year', students: 90 },
  ];

  let chartData;
  let chartTitle;
  let dashboardTitle;

  if (isVC) {
    chartData = universityData;
    chartTitle = "Students per College";
    dashboardTitle = "Vice Chancellor (God Mode)";
  } else if (isDean) {
    chartData = collegeData;
    chartTitle = "Students per Department";
    dashboardTitle = "College Dean Overview";
  } else {
    chartData = deptData;
    chartTitle = "Students per Year";
    dashboardTitle = "Department HOD Overview";
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardTitle}</h1>
          <p className="text-gray-500 dark:text-gray-400">{currentUser.role} • {currentUser.college}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {(isVC || isDean) && <StatCard title={isVC ? "Colleges" : "Departments"} value={isVC ? 5 : 3} icon={Building2} colorClass="text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" />}
        <StatCard title="Students" value={scopedStudents.length * (isVC || isDean ? 400 : 80)} icon={Users} colorClass="text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" />
        <StatCard title="Faculty" value={scopedFaculty.length} icon={GraduationCap} colorClass="text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400" />
        <StatCard title="Batches" value={isVC || isDean ? "45" : "12"} icon={ClipboardList} colorClass="text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400" />
        <StatCard title="Contests" value={contests.length} icon={Trophy} colorClass="text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400" />
        <StatCard title="Lectures" value={lectures.length * (isVC || isDean ? 15 : 3)} icon={PlaySquare} colorClass="text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            {chartTitle}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} 
                  itemStyle={{ color: '#60a5fa' }} 
                />
                <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent {isVC ? "University" : isDean ? "College" : "Department"} Activity</h3>
          <div className="space-y-4">
            {scopedFaculty.map((f, i) => (
              <div key={f.id} className="flex items-start space-x-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">{f.name}</span> managed a new batch. <span className="text-xs text-gray-500 block">{i + 1} hours ago</span></p>
              </div>
            ))}
            <div className="flex items-start space-x-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
              <p className="text-gray-600 dark:text-gray-400">Contest <span className="font-semibold text-gray-900 dark:text-white">Weekly Coding Challenge #45</span> was created. <span className="text-xs text-gray-500 block">1 day ago</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
