export interface ILoginResponse {
  status: boolean;
  message: string;
  token: string;
  expiresIn: number;

  data: {
    id: number;
    userName: string;
    fullName: string;
    role: string;
  };
}