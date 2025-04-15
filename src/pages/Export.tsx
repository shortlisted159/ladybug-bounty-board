import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CalendarIcon, Check, Download, FileDown, FileText, Filter, Users } from 'lucide-react';
import { format } from "date-fns";
import CustomDateRangePicker from '@/components/CustomDateRangePicker';

const Export = () => {
  const [dateRange, setDateRange] = useState(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedData, setSelectedData] = useState({
    bugs: true,
    teams: true,
    rewards: true,
    statistics: true,
  });
  
  const [exportInProgress, setExportInProgress] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const handleExport = () => {
    // Simulate export process
    setExportInProgress(true);
    
    setTimeout(() => {
      setExportInProgress(false);
      setExportSuccess(true);
      
      // Reset success message after a while
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  const handleDataSelectionChange = (key) => {
    setSelectedData({
      ...selectedData,
      [key]: !selectedData[key],
    });
  };

  const exportOptions = [
    {
      id: 'bugs',
      label: 'Bugs and Issues',
      description: 'All bug data including status, assignments, and history',
      icon: FileText,
    },
    {
      id: 'teams',
      label: 'Teams and Members',
      description: 'Team structure, members, and their designations',
      icon: Users,
    },
    {
      id: 'rewards',
      label: 'Bounties and Rewards',
      description: 'Reward history, bounty completion, and payouts',
      icon: Download,
    },
    {
      id: 'statistics',
      label: 'Performance Statistics',
      description: 'Team and individual performance metrics',
      icon: FileDown,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Export Data</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-teal" />
                Configure Export Options
              </CardTitle>
              <CardDescription>
                Select what data to export and the desired date range
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <CustomDateRangePicker onChange={setDateRange} />
              </div>
              
              <div className="space-y-4">
                <Label>Select Data to Export</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exportOptions.map((option) => (
                    <div 
                      key={option.id}
                      className="flex items-start space-x-3 border rounded-md p-3 hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox 
                        checked={selectedData[option.id]} 
                        onCheckedChange={() => handleDataSelectionChange(option.id)}
                        id={`check-${option.id}`}
                      />
                      <div className="grid gap-1.5">
                        <Label 
                          htmlFor={`check-${option.id}`}
                          className="flex items-center gap-1.5"
                        >
                          <option.icon className="h-4 w-4 text-muted-foreground" />
                          {option.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                      <SelectItem value="json">JSON (.json)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="export-filename">File Name</Label>
                  <Input 
                    id="export-filename" 
                    placeholder="bug-bounty-export"
                    defaultValue="bug-bounty-export" 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset Options</Button>
              <Button 
                onClick={handleExport} 
                disabled={exportInProgress}
                className="bg-teal hover:bg-teal/80"
              >
                {exportInProgress ? (
                  <>Exporting...</>
                ) : exportSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Export Successful
                  </>
                ) : (
                  <>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Data
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export History</CardTitle>
              <CardDescription>Recent data exports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Full Export</div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  CSV, 2.4MB
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Q2 Bugs Report</div>
                  <div className="text-xs text-muted-foreground">1 week ago</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Excel, 1.8MB
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">March Rewards</div>
                  <div className="text-xs text-muted-foreground">3 weeks ago</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  PDF, 842KB
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Export</CardTitle>
              <CardDescription>Common export templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                Active Bugs Report
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                Team Performance
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                Monthly Summary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Export;
