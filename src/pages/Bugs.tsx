
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock team members data
const teamMembers = [
  { id: 1, name: 'Jamie Smith', team: 'QA Team' },
  { id: 2, name: 'Alex Johnson', team: 'QA Team' },
  { id: 3, name: 'Casey Wilson', team: 'QA Team' },
  { id: 4, name: 'Morgan Lee', team: 'Tech Team' },
  { id: 5, name: 'Taylor Brown', team: 'Tech Team' },
  { id: 6, name: 'Jordan Green', team: 'Tech Team' },
];

// Mock buckets data
const buckets = [
  { id: 1, name: 'Frontend Issues' },
  { id: 2, name: 'Backend Issues' },
  { id: 3, name: 'Functional Testing' },
  { id: 4, name: 'Performance Issues' },
];

// Bug stages
const bugStages = ["New", "In Progress", "Testing", "Resolved", "Closed"];

// Mock bugs data
const initialBugs = [
  {
    id: 1,
    title: 'Login Authentication Bypass',
    description: 'Users can bypass login screen by manipulating URL parameters',
    status: 'In Progress',
    severity: 'High',
    assignedTo: 'Jamie Smith',
    reportedBy: 'Casey Wilson',
    bucket: 'Backend Issues',
    createdAt: '2023-04-10T10:30:00',
    updatedAt: '2023-04-12T14:20:00',
  },
  {
    id: 2,
    title: 'Button Styling Broken on Mobile',
    description: 'Submit buttons are not visible on mobile viewport sizes',
    status: 'New',
    severity: 'Medium',
    assignedTo: null,
    reportedBy: 'Alex Johnson',
    bucket: 'Frontend Issues',
    createdAt: '2023-04-11T09:15:00',
    updatedAt: '2023-04-11T09:15:00',
  },
  {
    id: 3,
    title: 'Payment Processing Error',
    description: 'Transactions fail with error code 5023 during peak hours',
    status: 'In Progress',
    severity: 'Critical',
    assignedTo: 'Alex Johnson',
    reportedBy: 'Casey Wilson',
    bucket: 'Backend Issues',
    createdAt: '2023-04-09T15:45:00',
    updatedAt: '2023-04-11T11:30:00',
  },
  {
    id: 4,
    title: 'Data Synchronization Issue',
    description: 'User profile changes not syncing across devices',
    status: 'Testing',
    severity: 'Medium',
    assignedTo: 'Morgan Lee',
    reportedBy: 'Jamie Smith',
    bucket: 'Backend Issues',
    createdAt: '2023-04-08T13:20:00',
    updatedAt: '2023-04-12T09:10:00',
  },
  {
    id: 5,
    title: 'Navigation Menu Overlap',
    description: 'Menu items overlap on certain browser widths',
    status: 'Resolved',
    severity: 'Low',
    assignedTo: 'Taylor Brown',
    reportedBy: 'Alex Johnson',
    bucket: 'Frontend Issues',
    createdAt: '2023-04-07T11:05:00',
    updatedAt: '2023-04-10T16:40:00',
  },
  {
    id: 6,
    title: 'Search Results Pagination',
    description: 'Pagination controls disappear after page 3',
    status: 'Closed',
    severity: 'Low',
    assignedTo: 'Taylor Brown',
    reportedBy: 'Casey Wilson',
    bucket: 'Frontend Issues',
    createdAt: '2023-04-06T10:15:00',
    updatedAt: '2023-04-10T14:30:00',
  },
];

const Bugs = () => {
  const [bugs, setBugs] = useState(initialBugs);
  const [showNewBugDialog, setShowNewBugDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [newBug, setNewBug] = useState({
    title: '',
    description: '',
    status: 'New',
    severity: 'Medium',
    bucket: '',
    assignedTo: '',
  });

  const handleNewBugSubmit = () => {
    if (newBug.title && newBug.description && newBug.bucket) {
      const bug = {
        id: bugs.length + 1,
        title: newBug.title,
        description: newBug.description,
        status: newBug.status,
        severity: newBug.severity,
        assignedTo: newBug.assignedTo || null,
        reportedBy: 'Current User', // In a real app, this would be the logged-in user
        bucket: newBug.bucket,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBugs([bug, ...bugs]);
      setNewBug({
        title: '',
        description: '',
        status: 'New',
        severity: 'Medium',
        bucket: '',
        assignedTo: '',
      });
      setShowNewBugDialog(false);
    }
  };

  const updateBugStatus = (bugId, newStatus) => {
    setBugs(
      bugs.map(bug => 
        bug.id === bugId 
          ? { ...bug, status: newStatus, updatedAt: new Date().toISOString() } 
          : bug
      )
    );
  };

  const filteredBugs = bugs
    .filter(bug => filterStatus === "All" || bug.status === filterStatus)
    .filter(bug => filterSeverity === "All" || bug.severity === filterSeverity)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === "oldest") return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      if (sortBy === "severity-high") return getSeverityOrder(b.severity) - getSeverityOrder(a.severity);
      if (sortBy === "severity-low") return getSeverityOrder(a.severity) - getSeverityOrder(b.severity);
      return 0;
    });

  function getSeverityOrder(severity) {
    const order = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    return order[severity] || 0;
  }

  function getSeverityClass(severity) {
    switch (severity) {
      case 'Critical': return 'bg-red-gradient text-white';
      case 'High': return 'bg-red-light text-white';
      case 'Medium': return 'bg-orange text-charcoal';
      case 'Low': return 'bg-beige text-charcoal';
      default: return 'bg-beige text-charcoal';
    }
  }

  function getStatusClass(status) {
    switch (status) {
      case 'New': return 'bug-stage-new';
      case 'In Progress': return 'bug-stage-in-progress';
      case 'Testing': return 'bug-stage-testing';
      case 'Resolved': return 'bug-stage-resolved';
      case 'Closed': return 'bug-stage-closed';
      default: return 'bug-stage-new';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Bugs</h1>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="p-2">
                <div className="mb-2">
                  <Label>Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {bugStages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Severity</Label>
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("newest")}>
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                Oldest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("severity-high")}>
                Highest severity
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("severity-low")}>
                Lowest severity
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={showNewBugDialog} onOpenChange={setShowNewBugDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Bug
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Report New Bug</DialogTitle>
                <DialogDescription>
                  Provide details about the bug you've discovered.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="bug-title">Title</Label>
                  <Input
                    id="bug-title"
                    value={newBug.title}
                    onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                    placeholder="Short, descriptive title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bug-description">Description</Label>
                  <Textarea
                    id="bug-description"
                    value={newBug.description}
                    onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
                    placeholder="Detailed description of the issue"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bug-severity">Severity</Label>
                    <Select 
                      value={newBug.severity} 
                      onValueChange={(value) => setNewBug({ ...newBug, severity: value })}
                    >
                      <SelectTrigger id="bug-severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bug-bucket">Bucket</Label>
                    <Select 
                      value={newBug.bucket} 
                      onValueChange={(value) => setNewBug({ ...newBug, bucket: value })}
                    >
                      <SelectTrigger id="bug-bucket">
                        <SelectValue placeholder="Select bucket" />
                      </SelectTrigger>
                      <SelectContent>
                        {buckets.map((bucket) => (
                          <SelectItem key={bucket.id} value={bucket.name}>{bucket.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bug-assignee">Assign to (optional)</Label>
                  <Select 
                    value={newBug.assignedTo} 
                    onValueChange={(value) => setNewBug({ ...newBug, assignedTo: value })}
                  >
                    <SelectTrigger id="bug-assignee">
                      <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name} ({member.team})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewBugDialog(false)}>Cancel</Button>
                <Button onClick={handleNewBugSubmit}>Submit Bug</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="w-[200px] mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="board">Board View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          {filteredBugs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No bugs match your filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBugs.map((bug) => (
                <Card key={bug.id} className="overflow-hidden">
                  <div className={`h-2 ${getStatusClass(bug.status)}`} />
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>{bug.title}</span>
                      <Badge className={getSeverityClass(bug.severity)}>
                        {bug.severity}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{bug.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="font-medium">Status:</span> 
                        <Select 
                          value={bug.status}
                          onValueChange={(value) => updateBugStatus(bug.id, value)}
                        >
                          <SelectTrigger className="h-7 w-[130px] text-xs ml-1 border-none bg-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {bugStages.map(stage => (
                              <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <span className="font-medium">Bucket:</span> 
                        <Badge variant="outline" className="ml-1">{bug.bucket}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Assigned to:</span>
                        {bug.assignedTo ? (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-xs">
                                {bug.assignedTo.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{bug.assignedTo}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>
                        Reported by {bug.reportedBy} on {new Date(bug.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        Last updated: {new Date(bug.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="board" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {bugStages.map((stage) => {
              const stageBugs = filteredBugs.filter(bug => bug.status === stage);
              return (
                <div key={stage} className="space-y-3">
                  <div className={`p-2 rounded-t-md ${getStatusClass(stage)} text-center font-medium`}>
                    {stage} ({stageBugs.length})
                  </div>
                  <div className="space-y-2">
                    {stageBugs.length === 0 ? (
                      <div className="border border-dashed rounded-md p-4 text-center text-muted-foreground text-sm">
                        No bugs in this stage
                      </div>
                    ) : (
                      stageBugs.map((bug) => (
                        <Card key={bug.id} className="p-3 text-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{bug.title}</div>
                            <Badge className={getSeverityClass(bug.severity)} variant="secondary" className="text-[10px] px-1">
                              {bug.severity}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {bug.description}
                          </div>
                          <div className="flex justify-between text-[10px]">
                            <span>{bug.bucket}</span>
                            {bug.assignedTo ? (
                              <div className="flex items-center gap-1">
                                <Avatar className="h-4 w-4">
                                  <AvatarFallback className="text-[8px]">
                                    {bug.assignedTo.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate max-w-[60px]">{bug.assignedTo}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Unassigned</span>
                            )}
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bugs;
