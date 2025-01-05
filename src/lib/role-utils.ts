import { UserData } from '@/types/context';

export function hasAddRights(user: UserData) {
    return user.roles?.includes('admin') || user.roles?.includes('user');
}

export function hasRemoveRights(user: UserData) {
    return user.roles?.includes('admin');
}
