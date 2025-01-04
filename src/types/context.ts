export declare interface AppContextType {
    user: UserData;
    setUser: React.Dispatch<React.SetStateAction<UserData>>;
}

export declare interface UserData {
    username?: string;
    roles?: string[];
}
