
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Medal } from 'lucide-react';

interface BountyProgress {
  daily: number;
  weekly: number;
  sprint: number;
}

interface BountyProgressCardProps {
  progress: BountyProgress;
}

const BountyProgressCard: React.FC<BountyProgressCardProps> = ({ progress }) => {
  return (
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
              <span className="font-medium">{progress.daily}%</span>
            </div>
            <Progress value={progress.daily} className="h-2" />
            <div className="text-center text-sm text-muted-foreground mt-4">
              Reward: <span className="font-medium text-charcoal">$65</span>
            </div>
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4 mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{progress.weekly}%</span>
            </div>
            <Progress value={progress.weekly} className="h-2" />
            <div className="text-center text-sm text-muted-foreground mt-4">
              Reward: <span className="font-medium text-charcoal">$240</span>
            </div>
          </TabsContent>
          <TabsContent value="sprint" className="space-y-4 mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{progress.sprint}%</span>
            </div>
            <Progress value={progress.sprint} className="h-2" />
            <div className="text-center text-sm text-muted-foreground mt-4">
              Reward: <span className="font-medium text-charcoal">$820</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BountyProgressCard;
