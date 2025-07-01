import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      department,
      hireDate,
      birthDate,
      payStructure,
      employeeId,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !employeeId ||
      !payStructure ||
      !department ||
      !hireDate ||
      !birthDate
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if employee with this email already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { error: "Employee with this email already exists" },
        { status: 409 }
      );
    }

    // Create the employee
    const employee = await prisma.employee.create({
      data: {
        name: `${lastName}, ${firstName}`,
        email,
        employeeId: parseFloat(employeeId),
        payStructure: {
          connect: {
            id: payStructure,
          },
        },
        department: department.toUpperCase(),
        hireDate: new Date(hireDate),
        birthdate: new Date(birthDate),
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        payStructure: true,
      },
    });
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      firstName,
      lastName,
      email,
      employeeId,
      department,
      hireDate,
      birthDate,
      payStructure,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Employee id is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !employeeId ||
      !payStructure ||
      !department ||
      !hireDate ||
      !birthDate
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });
    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    // Check for email uniqueness if email is being changed
    if (email && email !== existingEmployee.email) {
      const emailExists = await prisma.employee.findUnique({
        where: { email },
      });
      if (emailExists) {
        return NextResponse.json(
          { error: "Employee with this email already exists" },
          { status: 409 }
        );
      }
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        name: `${lastName}, ${firstName}`,
        email,
        employeeId: parseFloat(employeeId),
        payStructure: {
          connect: {
            id: payStructure,
          },
        },
        department: department.toUpperCase(),
        hireDate: new Date(hireDate),
        birthdate: new Date(birthDate),
      },
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 500 }
    );
  }
}
