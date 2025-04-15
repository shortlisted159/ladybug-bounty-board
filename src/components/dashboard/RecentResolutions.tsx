
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface Performer {
  name: string;
  resolved: number;
  reward: number;
}

interface RecentResolutionsProps {
  performers: Performer[];
}

const RecentResolutions: React.FC<RecentResolutionsProps> = ({ performers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-teal" /> Recent Resolutions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performers.map((performer, index) => (
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
  );
};

export default RecentResolutions;
