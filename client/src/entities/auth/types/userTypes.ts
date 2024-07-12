

export type User = {
    id: number;
    name: string;
    email: string;
}

export type UserId = User['id']

export type UserWithoutId = Omit<User, 'id'>

export type UserWithoutIdWithPassword = Omit<User, 'id'> & {password: string}

export type UserWithoutName = Omit<UserWithoutIdWithPassword, 'name'>