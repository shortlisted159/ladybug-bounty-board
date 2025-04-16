
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bug, Search, Filter, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Initial mock data
const initialBugs = [
  {
    id: 1,
    title: "Login Authentication Bypass",
    description: "Users can access protected routes without authentication",
    status: "New",
    severity: "High",
    bucket: "Security",
    assignedTo: "Jamie",
    createdAt: "2023-04-10",
    updatedAt: "2023-04-10",
  },
  {
    id: 2,
    title: "Payment Processing Error",
    description: "Payments are being processed twice for some users",
    status: "In Progress",
    severity: "High",
    bucket: "Backend Issues",
    assignedTo: "Alex",
    createdAt: "2023-04-08",
    updatedAt: "2023-04-11",
  },
  {
    id: 3,
    title: "Missing Validation on Form Fields",
    description: "Form submission allows invalid data formats",
    status: "Testing",
    severity: "Medium",
    bucket: "Frontend Issues",
    assignedTo: "Casey",
    createdAt: "2023-04-05",
    updatedAt: "2023-04-12",
  },
  {
    id: 4,
    title: "Mobile Layout Broken on Small Screens",
    description: "UI elements overlap on screens below 320px width",
    status: "Resolved",
    severity: "Low",
    bucket: "UI/UX",
    assignedTo: "Morgan",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-13",
  },
  {
    id: 5,
    title: "Data Synchronization Issue",
    description: "Changes made on mobile don't sync with web app",
    status: "Closed",
    severity: "Medium",
    bucket: "Cross-platform",
    assignedTo: "Taylor",
    createdAt: "2023-03-28",
    updatedAt: "2023-04-09",
  },
];

// Available buckets for bugs
const buckets = [
  "Frontend Issues", 
  "Backend Issues", 
  "Security", 
  "Performance", 
  "UI/UX", 
  "Cross-platform"
];

// Team members
const teamMembers = [
  "unassigned",
  "Jamie",
  "Alex",
  "Casey",
  "Morgan",
  "Taylor",
];

// Status badge styling function
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "New":
      return "bg-beige text-charcoal";
    case "In Progress":
      return "bg-orange text-charcoal";
    case "Testing":
      return "bg-coral text-charcoal";
    case "Resolved":
      return "bg-green-light text-charcoal";
    case "Closed":
      return "bg-teal text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

// Severity badge styling function
const getSeverityBadgeClass = (severity) => {
  switch (severity) {
    case "Low":
      return "bg-beige text-charcoal";
    case "Medium":
      return "bg-orange text-charcoal";
    case "High":
      return "bg-red-dark text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Bugs = () => {
  const [bugs, setBugs] = useState(initialBugs);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewBugDialog, setShowNewBugDialog] = useState(false);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    status: "New",
    severity: "Medium",
    bucket: "",
    assignedTo: "unassigned",
  });

  // Filter bugs based on search, tab, and severity
  const filteredBugs = bugs.filter((bug) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      activeTab === "all" || bug.status.toLowerCase() === activeTab.toLowerCase();

    // Severity filter
    const matchesSeverity =
      severityFilter === "all" ||
      bug.severity.toLowerCase() === severityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleNewBugSubmit = () => {
    if (newBug.title && newBug.description && newBug.bucket) {
      const bug = {
        id: bugs.length + 1,
        ...newBug,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setBugs([...bugs, bug]);
      setNewBug({
        title: "",
        description: "",
        status: "New",
        severity: "Medium",
        bucket: "",
        assignedTo: "unassigned",
      });
      setShowNewBugDialog(false);
      toast({
        title: "Bug Created",
        description: "The bug has been successfully added",
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bug Tracking</h1>
        <Dialog open={showNewBugDialog} onOpenChange={setShowNewBugDialog}>
          <DialogTrigger asChild>
            <Button className="bg-teal hover:bg-teal/80">
              <Plus className="mr-2 h-4 w-4" /> New Bug
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Report New Bug</DialogTitle>
              <DialogDescription>
                Add details about the bug you've found.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBug.title}
                  onChange={(e) =>
                    setNewBug({ ...newBug, title: e.target.value })
                  }
                  placeholder="Brief description of the bug"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newBug.description}
                  onChange={(e) =>
                    setNewBug({ ...newBug, description: e.target.value })
                  }
                  placeholder="Detailed explanation of the issue"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    value={newBug.severity}
                    onValueChange={(value) =>
                      setNewBug({ ...newBug, severity: value })
                    }
                  >
                    <SelectTrigger id="severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bucket">Bucket</Label>
                  <Select
                    value={newBug.bucket}
                    onValueChange={(value) =>
                      setNewBug({ ...newBug, bucket: value })
                    }
                  >
                    <SelectTrigger id="bucket">
                      <SelectValue placeholder="Select bucket" />
                    </SelectTrigger>
                    <SelectContent>
                      {buckets.map((bucket) => (
                        <SelectItem key={bucket} value={bucket}>
                          {bucket}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Select
                  value={newBug.assignedTo}
                  onValueChange={(value) =>
                    setNewBug({ ...newBug, assignedTo: value })
                  }
                >
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member === "unassigned" ? "Unassigned" : member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewBugDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewBugSubmit} className="bg-teal hover:bg-teal/80">
                Submit Bug
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bugs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select
                value={severityFilter}
                onValueChange={setSeverityFilter}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="in progress">In Progress</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Bucket</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead className="text-right">Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBugs.length > 0 ? (
                        filteredBugs.map((bug) => (
                          <TableRow key={bug.id}>
                            <TableCell className="font-medium">
                              {bug.title}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeClass(bug.status)}>
                                {bug.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getSeverityBadgeClass(bug.severity)}>
                                {bug.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>{bug.bucket}</TableCell>
                            <TableCell>{bug.assignedTo === "unassigned" ? "Unassigned" : bug.assignedTo}</TableCell>
                            <TableCell className="text-right">{bug.updatedAt}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            No bugs found matching your filters
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bug className="h-5 w-5 text-teal" /> Bug Summary
              </CardTitle>
              <CardDescription>Current status of bugs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>New</span>
                    <span className="font-medium">
                      {bugs.filter((bug) => bug.status === "New").length}
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-beige rounded-full"
                      style={{
                        width: `${(bugs.filter((bug) => bug.status === "New").length / bugs.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>In Progress</span>
                    <span className="font-medium">
                      {bugs.filter((bug) => bug.status === "In Progress").length}
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-orange rounded-full"
                      style={{
                        width: `${(bugs.filter((bug) => bug.status === "In Progress").length / bugs.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Testing</span>
                    <span className="font-medium">
                      {bugs.filter((bug) => bug.status === "Testing").length}
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-coral rounded-full"
                      style={{
                        width: `${(bugs.filter((bug) => bug.status === "Testing").length / bugs.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resolved</span>
                    <span className="font-medium">
                      {bugs.filter((bug) => bug.status === "Resolved").length}
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-green-light rounded-full"
                      style={{
                        width: `${(bugs.filter((bug) => bug.status === "Resolved").length / bugs.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Closed</span>
                    <span className="font-medium">
                      {bugs.filter((bug) => bug.status === "Closed").length}
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{
                        width: `${(bugs.filter((bug) => bug.status === "Closed").length / bugs.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="text-sm font-medium mb-3">Filter by Severity</div>
                <ToggleGroup
                  type="single"
                  value={severityFilter}
                  onValueChange={(value) => setSeverityFilter(value || "all")}
                  className="justify-start"
                >
                  <ToggleGroupItem value="all" aria-label="All severities">
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem value="high" aria-label="High severity">
                    High
                  </ToggleGroupItem>
                  <ToggleGroupItem value="medium" aria-label="Medium severity">
                    Med
                  </ToggleGroupItem>
                  <ToggleGroupItem value="low" aria-label="Low severity">
                    Low
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bugs;
