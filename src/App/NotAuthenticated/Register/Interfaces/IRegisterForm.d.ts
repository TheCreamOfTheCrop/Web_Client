export interface IRegisterFormState {
    email: string;
    password: string;
    confirmPassword: string;
    lastName: string;
    firstName: string;
    disableSubmit: boolean;

    getEmailValidation?(): 'success' | 'warning' | 'error';
    getPasswordValidation?(): 'success' | 'warning' | 'error';
    getValidationState?(): 'success' | 'warning' | 'error';
    getConfirmPasswordValidation?(): 'success' | 'warning' | 'error';
}