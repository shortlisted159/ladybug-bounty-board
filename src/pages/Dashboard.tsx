import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Bug, CheckCircle2, Clock, AlertTriangle, Users, Medal } from 'lucide-react';

// Mock data for dashboard
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

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Bug className="h-5 w-5 text-orange" /> Total Bugs
            </CardTitle>
            <CardDescription>Current bug status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bugsData.reduce((sum, item) => sum + item.value, 0)}</div>
            <div className="h-[200px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bugsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {bugsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-teal" /> Team Performance
            </CardTitle>
            <CardDescription>QA vs Tech team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="bugs" name="Bugs Reported" fill="#F4A896" />
                  <Bar dataKey="resolved" name="Bugs Resolved" fill="#358597" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Medal className="h-5 w-5 text-orange" /> Bounty Progress
            </CardTitle>
            <CardDescription>Goal completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="sprint">Sprint</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="space-y-4 mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{bountyProgressData.daily}%</span>
                </div>
                <Progress value={bountyProgressData.daily} className="h-2" />
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Reward: <span className="font-medium text-charcoal">$65</span>
                </div>
              </TabsContent>
              <TabsContent value="weekly" className="space-y-4 mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{bountyProgressData.weekly}%</span>
                </div>
                <Progress value={bountyProgressData.weekly} className="h-2" />
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Reward: <span className="font-medium text-charcoal">$240</span>
                </div>
              </TabsContent>
              <TabsContent value="sprint" className="space-y-4 mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{bountyProgressData.sprint}%</span>
                </div>
                <Progress value={bountyProgressData.sprint} className="h-2" />
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Reward: <span className="font-medium text-charcoal">$820</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-teal" /> Recent Resolutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformersData.map((performer, index) => (
                <div key={index} className="flex items-center justify-between border-b last:border-0 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-light-grey rounded-full h-8 w-8 flex items-center justify-center">
                      {performer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{performer.name}</div>
                      <div className="text-xs text-muted-foreground">Resolved {performer.resolved} bugs</div>
                    </div>
                  </div>
                  <div className="font-medium text-teal">${performer.reward}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange" /> Critical Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-l-4 border-red-light pl-3 py-2">
                <div className="flex-1">
                  <div className="font-medium">Login Authentication Bypass</div>
                  <div className="text-xs text-muted-foreground">Assigned to: Jamie</div>
                </div>
                <div className="flex items-center gap-1 text-red-dark">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">2d</span>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l-4 border-red-light pl-3 py-2">
                <div className="flex-1">
                  <div className="font-medium">Payment Processing Error</div>
                  <div className="text-xs text-muted-foreground">Assigned to: Alex</div>
                </div>
                <div className="flex items-center gap-1 text-red-dark">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">1d</span>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l-4 border-orange pl-3 py-2">
                <div className="flex-1">
                  <div className="font-medium">Data Synchronization Issue</div>
                  <div className="text-xs text-muted-foreground">Assigned to: Morgan</div>
                </div>
                <div className="flex items-center gap-1 text-orange">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">4h</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
