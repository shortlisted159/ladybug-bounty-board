
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Plus, Award, CalendarDays, Calendar, Sprint, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for bounties
const initialBounties = {
  daily: [
    {
      id: 1,
      title: "Fix 5 Frontend Bugs",
      description: "Close 5 frontend bugs by end of day",
      deadline: "2023-04-15",
      target: 5,
      current: 3,
      reward: "$50",
    },
    {
      id: 2,
      title: "Complete Code Reviews",
      description: "Review 10 PRs by end of day",
      deadline: "2023-04-15",
      target: 10,
      current: 8,
      reward: "$70",
    },
  ],
  weekly: [
    {
      id: 3,
      title: "Refactor Authentication",
      description: "Complete the auth module refactoring",
      deadline: "2023-04-18",
      target: 100,
      current: 65,
      reward: "$150",
    },
    {
      id: 4,
      title: "Performance Optimization",
      description: "Improve loading times by 30%",
      deadline: "2023-04-18",
      target: 100,
      current: 42,
      reward: "$200",
    },
  ],
  sprint: [
    {
      id: 5,
      title: "Zero Critical Bugs",
      description: "Close all critical bugs by sprint end",
      deadline: "2023-04-28",
      target: 100,
      current: 82,
      reward: "$500",
    },
    {
      id: 6,
      title: "Feature Completion",
      description: "Complete all planned features for the release",
      deadline: "2023-04-28",
      target: 100,
      current: 74,
      reward: "$600",
    },
  ],
};

// Mock data for reward history
const rewardHistory = [
  {
    name: 'Jamie Smith',
    totalEarned: 900,
    months: {
      Jan: 150,
      Feb: 200,
      Mar: 250,
      Apr: 300,
    },
  },
  {
    name: 'Alex Johnson',
    totalEarned: 850,
    months: {
      Jan: 200,
      Feb: 150,
      Mar: 300,
      Apr: 200,
    },
  },
  {
    name: 'Casey Wilson',
    totalEarned: 780,
    months: {
      Jan: 180,
      Feb: 220,
      Mar: 180,
      Apr: 200,
    },
  },
  {
    name: 'Morgan Lee',
    totalEarned: 820,
    months: {
      Jan: 210,
      Feb: 180,
      Mar: 230,
      Apr: 200,
    },
  },
];

const rewardHistoryChartData = [
  { month: 'Jan', 'QA Team': 530, 'Tech Team': 610 },
  { month: 'Feb', 'QA Team': 570, 'Tech Team': 550 },
  { month: 'Mar', 'QA Team': 730, 'Tech Team': 660 },
  { month: 'Apr', 'QA Team': 700, 'Tech Team': 630 },
];

const Bounties = () => {
  const [bounties, setBounties] = useState(initialBounties);
  const [showNewBountyDialog, setShowNewBountyDialog] = useState(false);
  const [newBounty, setNewBounty] = useState({
    title: '',
    description: '',
    deadline: '',
    target: '',
    reward: '',
    type: 'daily', // daily, weekly, or sprint
  });

  const handleNewBountySubmit = () => {
    if (newBounty.title && newBounty.deadline && newBounty.target && newBounty.reward) {
      const bounty = {
        id: Math.max(...[
          ...bounties.daily.map(b => b.id),
          ...bounties.weekly.map(b => b.id),
          ...bounties.sprint.map(b => b.id),
        ]) + 1,
        title: newBounty.title,
        description: newBounty.description,
        deadline: newBounty.deadline,
        target: parseInt(newBounty.target),
        current: 0,
        reward: newBounty.reward.startsWith('$') ? newBounty.reward : `$${newBounty.reward}`,
      };
      
      setBounties({
        ...bounties,
        [newBounty.type]: [...bounties[newBounty.type], bounty],
      });
      
      setNewBounty({
        title: '',
        description: '',
        deadline: '',
        target: '',
        reward: '',
        type: 'daily',
      });
      
      setShowNewBountyDialog(false);
    }
  };

  const getBountyProgress = (current, target) => {
    return (current / target) * 100;
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-light';
    if (progress < 70) return 'bg-orange';
    return 'bg-green-light';
  };

  const BountyCard = ({ bounty }) => (
    <Card key={bounty.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{bounty.title}</CardTitle>
        <CardDescription>{bounty.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>Due: {new Date(bounty.deadline).toLocaleDateString()}</span>
          </div>
          <div className="font-medium text-teal">{bounty.reward}</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            {typeof bounty.current === 'number' && typeof bounty.target === 'number' ? (
              <span>{bounty.current} / {bounty.target}</span>
            ) : (
              <span>{Math.round(bounty.current)}%</span>
            )}
          </div>
          <Progress 
            value={getBountyProgress(bounty.current, bounty.target)} 
            className={`h-2 ${getProgressColor(getBountyProgress(bounty.current, bounty.target))}`}
          />
        </div>
      </CardContent>
    </Card>
  );

  const BountyTab = ({ title, icon, bountyList }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      {bountyList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bountyList.map(bounty => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No bounties found for this period.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setNewBounty({ ...newBounty, type: title.toLowerCase() });
              setShowNewBountyDialog(true);
            }}
          >
            Add one now
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Bounties</h1>
        
        <Dialog open={showNewBountyDialog} onOpenChange={setShowNewBountyDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Bounty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Bounty</DialogTitle>
              <DialogDescription>
                Set up a new goal with rewards for your team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="bounty-title">Title</Label>
                <Input
                  id="bounty-title"
                  value={newBounty.title}
                  onChange={(e) => setNewBounty({ ...newBounty, title: e.target.value })}
                  placeholder="Bounty title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bounty-description">Description</Label>
                <Input
                  id="bounty-description"
                  value={newBounty.description}
                  onChange={(e) => setNewBounty({ ...newBounty, description: e.target.value })}
                  placeholder="Short description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bounty-deadline">Deadline</Label>
                  <Input
                    id="bounty-deadline"
                    type="date"
                    value={newBounty.deadline}
                    onChange={(e) => setNewBounty({ ...newBounty, deadline: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bounty-type">Type</Label>
                  <Select 
                    value={newBounty.type} 
                    onValueChange={(value) => setNewBounty({ ...newBounty, type: value })}
                  >
                    <SelectTrigger id="bounty-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="sprint">Sprint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bounty-target">Target</Label>
                  <Input
                    id="bounty-target"
                    type="number"
                    min="1"
                    value={newBounty.target}
                    onChange={(e) => setNewBounty({ ...newBounty, target: e.target.value })}
                    placeholder="Goal target"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bounty-reward">Reward</Label>
                  <Input
                    id="bounty-reward"
                    value={newBounty.reward}
                    onChange={(e) => setNewBounty({ ...newBounty, reward: e.target.value })}
                    placeholder="e.g. $100"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewBountyDialog(false)}>Cancel</Button>
              <Button onClick={handleNewBountySubmit}>Create Bounty</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="bounties" className="w-full">
        <TabsList className="w-[400px] mb-6">
          <TabsTrigger value="bounties">Active Bounties</TabsTrigger>
          <TabsTrigger value="rewards">Reward History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bounties" className="space-y-8">
          <BountyTab 
            title="Daily" 
            icon={<Calendar className="h-5 w-5 text-orange" />} 
            bountyList={bounties.daily} 
          />
          
          <BountyTab 
            title="Weekly" 
            icon={<Calendar className="h-5 w-5 text-teal" />} 
            bountyList={bounties.weekly} 
          />
          
          <BountyTab 
            title="Sprint" 
            icon={<Target className="h-5 w-5 text-coral" />} 
            bountyList={bounties.sprint} 
          />
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Rewards Over Time</CardTitle>
              <CardDescription>Comparing QA and Tech team rewards by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={rewardHistoryChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="QA Team" fill="#F4A896" />
                    <Bar dataKey="Tech Team" fill="#358597" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-medium flex items-center gap-2 mt-6">
            <Award className="h-5 w-5 text-orange" />
            Individual Rewards
          </h2>
          
          <div className="space-y-4">
            {rewardHistory.map((person, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{person.name}</CardTitle>
                    <div className="font-bold text-teal">${person.totalEarned}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(person.months).map(([month, amount]) => (
                      <div key={month} className="text-center p-2 bg-light-grey rounded-md">
                        <div className="text-sm font-medium">{month}</div>
                        <div className="text-teal">${amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bounties;
