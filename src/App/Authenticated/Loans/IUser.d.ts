interface IUser {
    created_at?: string;
    deleted_at?: string;
    updated_at?: string;
    password?: string;
    uid?: string;

    lastname?: string;
    firstname?: string;
    description?: string;
    isAccountValidate?: boolean;
}

export default IUser;