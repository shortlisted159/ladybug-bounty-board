
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock } from 'lucide-react';

interface CriticalIssue {
  title: string;
  assignee: string;
  timeLeft: string;
  severity: 'high' | 'medium';
}

interface CriticalIssuesProps {
  issues: CriticalIssue[];
}

const CriticalIssues: React.FC<CriticalIssuesProps> = ({ issues }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange" /> Critical Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 border-l-4 ${
                issue.severity === 'high' ? 'border-red-light' : 'border-orange'
              } pl-3 py-2`}
            >
              <div className="flex-1">
                <div className="font-medium">{issue.title}</div>
                <div className="text-xs text-muted-foreground">Assigned to: {issue.assignee}</div>
              </div>
              <div className={`flex items-center gap-1 ${
                issue.severity === 'high' ? 'text-red-dark' : 'text-orange'
              }`}>
                <Clock className="h-4 w-4" />
                <span className="text-xs">{issue.timeLeft}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CriticalIssues;
