export type User = {
    id: number;
    name: string;
    lastName:string
    email: string;
  };
  
  export type UserId = User['id'];
  