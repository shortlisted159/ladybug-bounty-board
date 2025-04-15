
import React from 'react';
import BugStatusChart from '@/components/dashboard/BugStatusChart';
import TeamPerformanceChart from '@/components/dashboard/TeamPerformanceChart';
import BountyProgressCard from '@/components/dashboard/BountyProgressCard';
import RecentResolutions from '@/components/dashboard/RecentResolutions';
import CriticalIssues from '@/components/dashboard/CriticalIssues';

// Mock data
const bugsData = [
  { name: 'New', value: 15, color: '#F4EFEA' },
  { name: 'In Progress', value: 8, color: '#F4A950' },
  { name: 'Testing', value: 5, color: '#F4A896' },
  { name: 'Resolved', value: 12, color: '#96CF24' },
  { name: 'Closed', value: 20, color: '#358597' },
];

const teamData = [
  { name: 'QA Team', bugs: 27, resolved: 0 },
  { name: 'Tech Team', bugs: 0, resolved: 32 },
];

const bountyProgressData = {
  daily: 65,
  weekly: 48,
  sprint: 82
};

const topPerformersData = [
  { name: 'Alex', resolved: 14, reward: 140 },
  { name: 'Jamie', resolved: 10, reward: 100 },
  { name: 'Casey', resolved: 8, reward: 80 },
  { name: 'Morgan', resolved: 6, reward: 60 },
  { name: 'Taylor', resolved: 4, reward: 40 },
];

const criticalIssuesData = [
  {
    title: 'Login Authentication Bypass',
    assignee: 'Jamie',
    timeLeft: '2d',
    severity: 'high' as const,
  },
  {
    title: 'Payment Processing Error',
    assignee: 'Alex',
    timeLeft: '1d',
    severity: 'high' as const,
  },
  {
    title: 'Data Synchronization Issue',
    assignee: 'Morgan',
    timeLeft: '4h',
    severity: 'medium' as const,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BugStatusChart data={bugsData} />
        <TeamPerformanceChart data={teamData} />
        <BountyProgressCard progress={bountyProgressData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentResolutions performers={topPerformersData} />
        <CriticalIssues issues={criticalIssuesData} />
      </div>
    </div>
  );
};

export default Dashboard;
