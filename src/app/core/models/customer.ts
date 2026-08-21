export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  customerId: number;
}

export interface Customer {
  id: number;
  customerCode: string;
  fullName: string;
  email: string;
  phone: string;
  accounts: Account[];
}

