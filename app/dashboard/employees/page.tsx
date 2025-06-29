"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Department, Employee, PayStructure } from "@prisma/client";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [payStructures, setPayStructures] = useState<PayStructure[]>([]);

  useEffect(() => {
    async function queryPayStructures() {
      const res = await fetch("/api/paystructure");
      const data = await res.json();
      setPayStructures(data);
    }
    queryPayStructures();

    async function queryEmployees() {
      const res = await fetch("/api/employee");
      const data = await res.json();
      setEmployees(data);
    }
    queryEmployees();
  }, []);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    department: "",
    position: "",
    hireDate: "",
    birthDate: "",
    payStructure: "",
  });

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = async () => {
    try {
      const req = await fetch("/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });
      window.location.reload();
      if (req.status != 201) {
        alert("An error occured creating the employee. Please try again.");
      }
    } catch {
      alert("An error occured creating the employee. Please try again.");
    }

    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
      hireDate: "",
      birthDate: "",
      payStructure: "",
      employeeId: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Employee Management
        </h1>
        <p className="text-muted-foreground">
          Manage employee records and add new employees to the system.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Employees</CardTitle>
              <CardDescription>
                A list of all employees in the company.
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>
                    Fill in the employee information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={newEmployee.firstName}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={newEmployee.lastName}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={newEmployee.department}
                        onValueChange={(value) =>
                          setNewEmployee({ ...newEmployee, department: value })
                        }
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(Department).map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={newEmployee.employeeId}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            employeeId: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payStructure">Pay Structure</Label>
                    <Select
                      value={newEmployee.payStructure}
                      onValueChange={(value) =>
                        setNewEmployee({ ...newEmployee, payStructure: value })
                      }
                    >
                      <SelectTrigger id="payStructure" className="w-full">
                        <SelectValue placeholder="Select Pay Structure" />
                      </SelectTrigger>
                      <SelectContent>
                        {payStructures.map((struct) => (
                          <SelectItem key={struct.id} value={struct.id!}>
                            {struct.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hireDate">Hire Date</Label>
                    <Input
                      id="hireDate"
                      type="date"
                      value={newEmployee.hireDate}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          hireDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={newEmployee.birthDate}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          birthDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleAddEmployee}>Add Employee</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
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
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.hireDate.toString()}</TableCell>
                  {/*  <TableCell>{emp.status}</TableCell> */}
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteEmployee(emp.id)}
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
