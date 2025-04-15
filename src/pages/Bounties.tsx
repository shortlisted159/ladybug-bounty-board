
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, ChevronRight, Clock, DollarSign, Filter, Gem, Star, Trophy, Users } from 'lucide-react';

// Mock data for bounties
const activeBounties = [
  { 
    id: 1, 
    title: "Find Security Vulnerabilities", 
    reward: 200, 
    progress: 45, 
    daysLeft: 5,
    category: "Security",
    difficulty: "Hard"
  },
  { 
    id: 2, 
    title: "UI/UX Improvements", 
    reward: 150, 
    progress: 78, 
    daysLeft: 2,
    category: "Frontend",
    difficulty: "Medium"
  },
  { 
    id: 3, 
    title: "Performance Optimization", 
    reward: 180, 
    progress: 32, 
    daysLeft: 7,
    category: "Backend",
    difficulty: "Hard"
  },
  { 
    id: 4, 
    title: "Accessibility Compliance", 
    reward: 120, 
    progress: 91, 
    daysLeft: 1,
    category: "Frontend",
    difficulty: "Medium"
  }
];

const completedBounties = [
  { 
    id: 101, 
    title: "Fix Authentication Issues", 
    reward: 160, 
    category: "Security",
    completedBy: "Alex Johnson",
    completedOn: "Apr 10, 2025"
  },
  { 
    id: 102, 
    title: "Mobile Responsiveness", 
    reward: 140, 
    category: "Frontend",
    completedBy: "Jamie Smith",
    completedOn: "Apr 8, 2025"
  },
  { 
    id: 103, 
    title: "Database Optimization", 
    reward: 190, 
    category: "Backend",
    completedBy: "Casey Lee",
    completedOn: "Apr 5, 2025"
  }
];

const rewardTiers = [
  { name: 'Bronze', minReward: 100, maxReward: 150, color: '#CD7F32', count: 12 },
  { name: 'Silver', minReward: 151, maxReward: 200, color: '#C0C0C0', count: 8 },
  { name: 'Gold', minReward: 201, maxReward: 300, color: '#FFD700', count: 5 },
  { name: 'Platinum', minReward: 301, maxReward: 500, color: '#E5E4E2', count: 3 }
];

const topContributors = [
  { name: 'Alex Johnson', bounties: 7, totalRewards: 980 },
  { name: 'Jamie Smith', bounties: 5, totalRewards: 720 },
  { name: 'Casey Lee', bounties: 4, totalRewards: 640 },
  { name: 'Morgan Wu', bounties: 3, totalRewards: 510 }
];

const categoryData = [
  { name: 'Security', value: 35 },
  { name: 'Frontend', value: 25 },
  { name: 'Backend', value: 20 },
  { name: 'Mobile', value: 15 },
  { name: 'Other', value: 5 }
];

const Bounties = () => {
  const [activeTab, setActiveTab] = useState("active");

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-amber-600 bg-amber-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Security':
        return 'text-purple-600 bg-purple-100';
      case 'Frontend':
        return 'text-blue-600 bg-blue-100';
      case 'Backend':
        return 'text-teal-600 bg-teal-100';
      case 'Mobile':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Bounties</h1>
        <Button className="bg-teal hover:bg-teal/80">
          <Award className="mr-2 h-4 w-4" />
          Create New Bounty
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="active" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">Active Bounties</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {activeBounties.map(bounty => (
                  <Card key={bounty.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg font-medium">{bounty.title}</CardTitle>
                        <Badge className={getDifficultyColor(bounty.difficulty)}>
                          {bounty.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Badge variant="outline" className={getCategoryColor(bounty.category)}>
                          {bounty.category}
                        </Badge>
                        <span className="flex items-center text-xs text-muted-foreground ml-2">
                          <Clock className="h-3 w-3 mr-1" /> {bounty.daysLeft} days left
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{bounty.progress}%</span>
                      </div>
                      <Progress value={bounty.progress} className="h-2" />
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-teal font-medium">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${bounty.reward} Reward
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {completedBounties.map(bounty => (
                  <Card key={bounty.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg font-medium">{bounty.title}</CardTitle>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Badge variant="outline" className={getCategoryColor(bounty.category)}>
                          {bounty.category}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Completed by</span>
                        <span className="text-sm font-medium">{bounty.completedBy}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Completion date</span>
                        <span className="text-sm font-medium">{bounty.completedOn}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-teal font-medium">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${bounty.reward} Paid
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-orange" /> 
                Reward Tiers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {rewardTiers.map((tier) => (
                <div key={tier.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: tier.color }}
                    ></div>
                    <span className="font-medium">{tier.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${tier.minReward}-${tier.maxReward} ({tier.count})
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-orange" /> 
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topContributors.map((contributor, index) => (
                <div 
                  key={contributor.name} 
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-light-grey rounded-full h-8 w-8 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {contributor.bounties} bounties completed
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-teal">${contributor.totalRewards}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5 text-teal" /> 
                Bounties by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#358597" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bounties;
