import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/hooks/use-toast";

// Mock data for teams
const initialTeams = [
  {
    id: 1,
    name: 'QA Team',
    description: 'Quality Assurance specialists',
    members: [
      { id: 1, name: 'Jamie Smith', designation: 'Senior QA' },
      { id: 2, name: 'Alex Johnson', designation: 'QA Engineer' },
      { id: 3, name: 'Casey Wilson', designation: 'QA Analyst' },
    ],
  },
  {
    id: 2,
    name: 'Tech Team',
    description: 'Development and engineering',
    members: [
      { id: 4, name: 'Morgan Lee', designation: 'Senior Developer' },
      { id: 5, name: 'Taylor Brown', designation: 'Full Stack Developer' },
      { id: 6, name: 'Jordan Green', designation: 'Backend Developer' },
    ],
  },
];

// Mock data for buckets
const initialBuckets = [
  {
    id: 1,
    name: 'Frontend Issues',
    description: 'UI/UX and client-side problems',
    assignedTo: ['Tech Team'],
  },
  {
    id: 2,
    name: 'Backend Issues',
    description: 'Server-side and API problems',
    assignedTo: ['Tech Team'],
  },
  {
    id: 3,
    name: 'Functional Testing',
    description: 'Feature testing and validation',
    assignedTo: ['QA Team'],
  },
  {
    id: 4,
    name: 'Performance Issues',
    description: 'Speed and optimization problems',
    assignedTo: ['QA Team', 'Tech Team'],
  },
];

const Teams = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [buckets, setBuckets] = useState(initialBuckets);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [newBucket, setNewBucket] = useState({ name: '', description: '', assignedTo: [] });
  const [newMember, setNewMember] = useState({ name: '', designation: '', teamId: null });
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [showNewBucketDialog, setShowNewBucketDialog] = useState(false);
  const [showNewMemberDialog, setShowNewMemberDialog] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [editBucket, setEditBucket] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditBucketDialog, setShowEditBucketDialog] = useState(false);
  const [showEditMemberDialog, setShowEditMemberDialog] = useState(false);
  
  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
    toast({
      title: "Team deleted",
      description: "The team has been successfully removed",
    });
  };

  const handleDeleteBucket = (bucketId) => {
    setBuckets(buckets.filter(bucket => bucket.id !== bucketId));
    toast({
      title: "Bucket deleted",
      description: "The bucket has been successfully removed",
    });
  };

  const handleDeleteMember = (teamId, memberId) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(member => member.id !== memberId)
        };
      }
      return team;
    }));
    toast({
      title: "Member removed",
      description: "Team member has been successfully removed",
    });
  };

  const handleEditTeam = (team) => {
    setEditTeam(team);
    setShowEditDialog(true);
  };

  const handleEditBucket = (bucket) => {
    setEditBucket(bucket);
    setShowEditBucketDialog(true);
  };

  const handleEditMember = (teamId, member) => {
    setEditMember({...member, teamId});
    setShowEditMemberDialog(true);
  };

  const handleUpdateTeam = () => {
    if (editTeam && editTeam.name) {
      setTeams(teams.map(team => 
        team.id === editTeam.id ? editTeam : team
      ));
      setEditTeam(null);
      setShowEditDialog(false);
      toast({
        title: "Team updated",
        description: "The team has been successfully updated",
      });
    }
  };

  const handleUpdateBucket = () => {
    if (editBucket && editBucket.name && editBucket.assignedTo.length > 0) {
      setBuckets(buckets.map(bucket => 
        bucket.id === editBucket.id ? editBucket : bucket
      ));
      setEditBucket(null);
      setShowEditBucketDialog(false);
      toast({
        title: "Bucket updated",
        description: "The bucket has been successfully updated",
      });
    }
  };

  const handleUpdateMember = () => {
    if (editMember && editMember.name && editMember.designation) {
      const updatedTeams = teams.map(team => {
        if (team.id === editMember.teamId) {
          return {
            ...team,
            members: team.members.map(member => 
              member.id === editMember.id ? 
              {id: member.id, name: editMember.name, designation: editMember.designation} : 
              member
            )
          };
        }
        return team;
      });
      setTeams(updatedTeams);
      setEditMember(null);
      setShowEditMemberDialog(false);
      toast({
        title: "Member updated",
        description: "Team member has been successfully updated",
      });
    }
  };

  const handleNewTeamSubmit = () => {
    if (newTeam.name) {
      const team = {
        id: teams.length + 1,
        name: newTeam.name,
        description: newTeam.description,
        members: [],
      };
      setTeams([...teams, team]);
      setNewTeam({ name: '', description: '' });
      setShowNewTeamDialog(false);
      toast({
        title: "Team created",
        description: "New team has been successfully created",
      });
    }
  };

  const handleNewBucketSubmit = () => {
    if (newBucket.name && newBucket.assignedTo.length > 0) {
      const bucket = {
        id: buckets.length + 1,
        name: newBucket.name,
        description: newBucket.description,
        assignedTo: newBucket.assignedTo,
      };
      setBuckets([...buckets, bucket]);
      setNewBucket({ name: '', description: '', assignedTo: [] });
      setShowNewBucketDialog(false);
      toast({
        title: "Bucket created",
        description: "New bucket has been successfully created",
      });
    }
  };

  const handleNewMemberSubmit = () => {
    if (newMember.name && newMember.designation && newMember.teamId) {
      const updatedTeams = teams.map(team => {
        if (team.id === newMember.teamId) {
          return {
            ...team,
            members: [
              ...team.members,
              {
                id: Math.max(0, ...teams.flatMap(t => t.members.map(m => m.id))) + 1,
                name: newMember.name,
                designation: newMember.designation,
              }
            ]
          };
        }
        return team;
      });
      setTeams(updatedTeams);
      setNewMember({ name: '', designation: '', teamId: null });
      setShowNewMemberDialog(false);
      toast({
        title: "Member added",
        description: "New team member has been successfully added",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Teams & Buckets</h1>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 mb-4">
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="buckets">Buckets</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
              <DialogTrigger asChild>
                <Button className="bg-teal hover:bg-teal/80">
                  <Plus className="mr-2 h-4 w-4" /> Add Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                  <DialogDescription>
                    Add a new team to manage bug assignments.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      value={newTeam.name}
                      onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                      placeholder="Enter team name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="team-description">Description</Label>
                    <Input
                      id="team-description"
                      value={newTeam.description}
                      onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                      placeholder="Enter team description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>Cancel</Button>
                  <Button className="bg-teal hover:bg-teal/80" onClick={handleNewTeamSubmit}>Create Team</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Team</DialogTitle>
                  <DialogDescription>
                    Update team information.
                  </DialogDescription>
                </DialogHeader>
                {editTeam && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-team-name">Team Name</Label>
                      <Input
                        id="edit-team-name"
                        value={editTeam.name}
                        onChange={(e) => setEditTeam({ ...editTeam, name: e.target.value })}
                        placeholder="Enter team name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-team-description">Description</Label>
                      <Input
                        id="edit-team-description"
                        value={editTeam.description}
                        onChange={(e) => setEditTeam({ ...editTeam, description: e.target.value })}
                        placeholder="Enter team description"
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
                  <Button className="bg-teal hover:bg-teal/80" onClick={handleUpdateTeam}>Update Team</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showEditMemberDialog} onOpenChange={setShowEditMemberDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Team Member</DialogTitle>
                  <DialogDescription>
                    Update team member information.
                  </DialogDescription>
                </DialogHeader>
                {editMember && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-member-name">Name</Label>
                      <Input
                        id="edit-member-name"
                        value={editMember.name}
                        onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
                        placeholder="Enter member name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-member-designation">Designation</Label>
                      <Input
                        id="edit-member-designation"
                        value={editMember.designation}
                        onChange={(e) => setEditMember({ ...editMember, designation: e.target.value })}
                        placeholder="Enter designation"
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditMemberDialog(false)}>Cancel</Button>
                  <Button className="bg-teal hover:bg-teal/80" onClick={handleUpdateMember}>Update Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{team.name}</CardTitle>
                    <div className="flex">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditTeam(team)}
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteTeam(team.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{team.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-muted-foreground text-background">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.designation}</div>
                          </div>
                        </div>
                        <div className="flex">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditMember(team.id, member)}
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteMember(team.id, member.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {team.members.length === 0 && (
                      <div className="text-center text-muted-foreground py-4">
                        No members yet. Add some using the + button.
                      </div>
                    )}
                  </div>
                </CardContent>
                <div className="flex justify-center pb-4">
                  <Dialog open={showNewMemberDialog} onOpenChange={setShowNewMemberDialog}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setNewMember({ ...newMember, teamId: team.id })}
                        className="flex items-center gap-2"
                      >
                        <UserPlus className="h-4 w-4" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                        <DialogDescription>
                          Add a new member to {teams.find(t => t.id === newMember.teamId)?.name || 'the team'}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="member-name">Name</Label>
                          <Input
                            id="member-name"
                            value={newMember.name}
                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            placeholder="Enter member name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="member-designation">Designation</Label>
                          <Input
                            id="member-designation"
                            value={newMember.designation}
                            onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
                            placeholder="Enter designation"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewMemberDialog(false)}>Cancel</Button>
                        <Button className="bg-teal hover:bg-teal/80" onClick={handleNewMemberSubmit}>Add Member</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="buckets" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={showNewBucketDialog} onOpenChange={setShowNewBucketDialog}>
              <DialogTrigger asChild>
                <Button className="bg-coral hover:bg-coral/80 text-charcoal">
                  <Plus className="mr-2 h-4 w-4" /> Add Bucket
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Bucket</DialogTitle>
                  <DialogDescription>
                    Add a new bucket for organizing bugs.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bucket-name">Bucket Name</Label>
                    <Input
                      id="bucket-name"
                      value={newBucket.name}
                      onChange={(e) => setNewBucket({ ...newBucket, name: e.target.value })}
                      placeholder="Enter bucket name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bucket-description">Description</Label>
                    <Input
                      id="bucket-description"
                      value={newBucket.description}
                      onChange={(e) => setNewBucket({ ...newBucket, description: e.target.value })}
                      placeholder="Enter bucket description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Assigned Teams</Label>
                    {teams.map((team) => (
                      <div key={team.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`team-${team.id}`}
                          checked={newBucket.assignedTo.includes(team.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewBucket({
                                ...newBucket,
                                assignedTo: [...newBucket.assignedTo, team.name],
                              });
                            } else {
                              setNewBucket({
                                ...newBucket,
                                assignedTo: newBucket.assignedTo.filter((name) => name !== team.name),
                              });
                            }
                          }}
                          className="h-4 w-4"
                        />
                        <Label htmlFor={`team-${team.id}`}>{team.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewBucketDialog(false)}>Cancel</Button>
                  <Button className="bg-coral hover:bg-coral/80 text-charcoal" onClick={handleNewBucketSubmit}>Create Bucket</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showEditBucketDialog} onOpenChange={setShowEditBucketDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Bucket</DialogTitle>
                  <DialogDescription>
                    Update bucket information.
                  </DialogDescription>
                </DialogHeader>
                {editBucket && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-bucket-name">Bucket Name</Label>
                      <Input
                        id="edit-bucket-name"
                        value={editBucket.name}
                        onChange={(e) => setEditBucket({ ...editBucket, name: e.target.value })}
                        placeholder="Enter bucket name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-bucket-description">Description</Label>
                      <Input
                        id="edit-bucket-description"
                        value={editBucket.description}
                        onChange={(e) => setEditBucket({ ...editBucket, description: e.target.value })}
                        placeholder="Enter bucket description"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Assigned Teams</Label>
                      {teams.map((team) => (
                        <div key={team.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`edit-team-${team.id}`}
                            checked={editBucket.assignedTo.includes(team.name)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditBucket({
                                  ...editBucket,
                                  assignedTo: [...editBucket.assignedTo, team.name],
                                });
                              } else {
                                setEditBucket({
                                  ...editBucket,
                                  assignedTo: editBucket.assignedTo.filter((name) => name !== team.name),
                                });
                              }
                            }}
                            className="h-4 w-4"
                          />
                          <Label htmlFor={`edit-team-${team.id}`}>{team.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditBucketDialog(false)}>Cancel</Button>
                  <Button className="bg-coral hover:bg-coral/80 text-charcoal" onClick={handleUpdateBucket}>Update Bucket</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buckets.map((bucket) => (
              <Card key={bucket.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{bucket.name}</CardTitle>
                    <div className="flex">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditBucket(bucket)}
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteBucket(bucket.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{bucket.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Assigned Teams:</div>
                    <div className="flex flex-wrap gap-2">
                      {bucket.assignedTo.map((team, index) => (
                        <Badge key={index} className="bg-teal">{team}</Badge>
                      ))}
                    </div>
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

export default Teams;
