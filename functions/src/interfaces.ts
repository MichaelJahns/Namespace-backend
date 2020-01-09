export interface User {
    // Required
    email: string;
    displayName: string;
    password: string;
    confirmPassword: string;
    // Optional
}

// There can be all or none of these expected NewUserErrors
export interface NewUserErrors {
    email?: string;
    displayName?: string;
    password?: string;
    confirmPassword?: string;
}