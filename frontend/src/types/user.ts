export interface IUserOnboarding{
    fullName: string;
    bio: string;
    nativeLanguage: string;
    learningLanguage: string;
    location: string;
    profilePic: string;
}

export interface IUser extends IUserOnboarding {
    _id: string;
}