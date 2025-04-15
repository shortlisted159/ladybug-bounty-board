
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Bug } from 'lucide-react';

interface BugData {
  name: string;
  value: number;
  color: string;
}

interface BugStatusChartProps {
  data: BugData[];
}

const BugStatusChart: React.FC<BugStatusChartProps> = ({ data }) => {
  const totalBugs = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Bug className="h-5 w-5 text-orange" /> Total Bugs
        </CardTitle>
        <CardDescription>Current bug status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{totalBugs}</div>
        <div className="h-[200px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BugStatusChart;
