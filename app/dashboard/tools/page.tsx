"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const mockTools = [
  {
    id: 1,
    name: "Inventory Manager",
    description: "Track and manage inventory levels.",
    owner: "John Doe",
    status: "Active",
  },
  {
    id: 2,
    name: "Employee Scheduler",
    description: "Schedule employee shifts and manage time off.",
    owner: "Jane Smith",
    status: "Active",
  },
  {
    id: 3,
    name: "Expense Tracker",
    description: "Monitor and approve company expenses.",
    owner: "Mike Johnson",
    status: "Inactive",
  },
];

export default function ToolsManagement() {
  const [tools, setTools] = useState(mockTools);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTool, setNewTool] = useState({
    name: "",
    description: "",
    owner: "",
  });

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTool = () => {
    const tool = {
      id: tools.length + 1,
      ...newTool,
      status: "Active",
    };
    setTools([...tools, tool]);
    setNewTool({
      name: "",
      description: "",
      owner: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTool = (id: number) => {
    setTools(tools.filter((tool) => tool.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tools Management</h1>
        <p className="text-muted-foreground">
          Manage internal tools and add new tools to the portal.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tools</CardTitle>
              <CardDescription>
                A list of all internal tools available in the portal.
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Tool</DialogTitle>
                  <DialogDescription>
                    Fill in the tool information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tool Name</Label>
                    <Input
                      id="name"
                      value={newTool.name}
                      onChange={(e) =>
                        setNewTool({ ...newTool, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newTool.description}
                      onChange={(e) =>
                        setNewTool({ ...newTool, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Owner</Label>
                    <Input
                      id="owner"
                      value={newTool.owner}
                      onChange={(e) =>
                        setNewTool({ ...newTool, owner: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleAddTool}>Add Tool</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>{tool.name}</TableCell>
                  <TableCell>{tool.description}</TableCell>
                  <TableCell>{tool.owner}</TableCell>
                  <TableCell>{tool.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteTool(tool.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
