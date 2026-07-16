export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  salary: number;
  joiningDate: string;
  departmentId: number;
  profileImage: string | null;
}