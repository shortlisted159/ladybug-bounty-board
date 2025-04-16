
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Users } from 'lucide-react';

interface TeamData {
  name: string;
  bugs: number;
  resolved: number;
}

interface TeamPerformanceChartProps {
  data: TeamData[];
}

const TeamPerformanceChart: React.FC<TeamPerformanceChartProps> = ({ data }) => {
  return (
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
              data={data}
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
  );
};

export default TeamPerformanceChart;
