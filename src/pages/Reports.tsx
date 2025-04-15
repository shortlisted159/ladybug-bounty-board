
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Filter, FileBarChart, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

// Mock data for reports
const bugsOverTime = [
  { week: 'Week 1', created: 24, resolved: 18 },
  { week: 'Week 2', created: 18, resolved: 22 },
  { week: 'Week 3', created: 15, resolved: 20 },
  { week: 'Week 4', created: 20, resolved: 17 },
  { week: 'Week 5', created: 12, resolved: 16 },
  { week: 'Week 6', created: 8, resolved: 12 },
];

const bugsByBucket = [
  { name: 'Frontend Issues', value: 35, color: '#F4A896' },
  { name: 'Backend Issues', value: 42, color: '#358597' },
  { name: 'Functional Testing', value: 18, color: '#F4A950' },
  { name: 'Performance Issues', value: 25, color: '#7D141D' },
];

const bugSeverityData = [
  { name: 'Critical', value: 8, color: '#FF1E27' },
  { name: 'High', value: 15, color: '#F4A950' },
  { name: 'Medium', value: 22, color: '#F4A896' },
  { name: 'Low', value: 30, color: '#F4EFEA' },
];

const teamPerformanceData = [
  { name: 'Jamie', bugs: 15, resolved: 12, team: 'QA Team' },
  { name: 'Alex', bugs: 22, resolved: 18, team: 'QA Team' },
  { name: 'Casey', bugs: 18, resolved: 14, team: 'QA Team' },
  { name: 'Morgan', bugs: 5, resolved: 23, team: 'Tech Team' },
  { name: 'Taylor', bugs: 8, resolved: 20, team: 'Tech Team' },
  { name: 'Jordan', bugs: 3, resolved: 16, team: 'Tech Team' },
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('6weeks');
  const [severityFilter, setSeverityFilter] = useState('all');
  
  // Function to filter data based on selected filters
  const getFilteredData = () => {
    // In a real app, this would filter based on actual data
    // For now, we'll just return the mock data
    return bugsOverTime;
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Reports</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="time-range">Time Range:</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="time-range" className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2weeks">2 Weeks</SelectItem>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="6weeks">6 Weeks</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="severity-filter">Severity:</Label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger id="severity-filter" className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="w-[500px] mb-6">
          <TabsTrigger value="overall">Overall Metrics</TabsTrigger>
          <TabsTrigger value="buckets">Bugs by Category</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-teal" />
                  Bugs Created vs Resolved
                </CardTitle>
                <CardDescription>Tracking bug creation and resolution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={filteredData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone"
                        dataKey="created" 
                        name="Bugs Created" 
                        stroke="#F4A896" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="resolved" 
                        name="Bugs Resolved" 
                        stroke="#358597" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PieChartIcon className="h-5 w-5 text-coral" />
                  Bug Severity Distribution
                </CardTitle>
                <CardDescription>Current bug counts by severity level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bugSeverityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bugSeverityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary Statistics</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-light-grey rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Total Bugs</div>
                  <div className="text-3xl font-bold text-charcoal">120</div>
                  <div className="text-xs text-muted-foreground">Last 6 weeks</div>
                </div>
                <div className="p-4 bg-light-grey rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Resolution Rate</div>
                  <div className="text-3xl font-bold text-teal">87.5%</div>
                  <div className="text-xs text-muted-foreground">Bugs resolved / created</div>
                </div>
                <div className="p-4 bg-light-grey rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Avg. Resolution Time</div>
                  <div className="text-3xl font-bold text-orange">2.3</div>
                  <div className="text-xs text-muted-foreground">Days per bug</div>
                </div>
                <div className="p-4 bg-light-grey rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Open Critical Bugs</div>
                  <div className="text-3xl font-bold text-red-light">3</div>
                  <div className="text-xs text-muted-foreground">Needs immediate attention</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="buckets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bugs by Category</CardTitle>
              <CardDescription>Distribution of bugs across different buckets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bugsByBucket}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" name="Number of Bugs">
                      {bugsByBucket.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Most Common Issues</CardTitle>
                <CardDescription>Top bug categories by frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-coral"></div>
                      <span>UI Rendering Issues</span>
                    </div>
                    <span className="font-bold">23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal"></div>
                      <span>API Response Errors</span>
                    </div>
                    <span className="font-bold">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange"></div>
                      <span>Form Validation</span>
                    </div>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-light"></div>
                      <span>Authentication Issues</span>
                    </div>
                    <span className="font-bold">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-beige"></div>
                      <span>Performance Bottlenecks</span>
                    </div>
                    <span className="font-bold">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resolution Rates by Category</CardTitle>
                <CardDescription>Which buckets get fixed fastest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Frontend Issues</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-coral h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Backend Issues</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Functional Testing</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Performance Issues</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-light h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileBarChart className="h-5 w-5 text-orange" />
                Team Member Performance
              </CardTitle>
              <CardDescription>Comparing bug reporting and resolution by team member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teamPerformanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bugs" name="Bugs Reported" fill="#F4A896" />
                    <Bar dataKey="resolved" name="Bugs Resolved" fill="#358597" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">QA Team Performance</CardTitle>
                <CardDescription>Metrics for the QA team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bugs Reported</span>
                    <span className="font-bold">55</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bugs Verified</span>
                    <span className="font-bold">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Bugs per Member</span>
                    <span className="font-bold">18.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Critical Bugs Found</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Rating</span>
                    <span className="font-bold text-teal">4.8/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tech Team Performance</CardTitle>
                <CardDescription>Metrics for the Tech team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bugs Resolved</span>
                    <span className="font-bold">59</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bugs Reopened</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Resolution Time</span>
                    <span className="font-bold">2.7 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Critical Bugs Fixed</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Rating</span>
                    <span className="font-bold text-teal">4.6/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
