export type AlertType = 'internal' | 'unauthorized' | 'none' | 'unexpected';

export interface LoginData {
    username?: string;
    password?: string;
}
