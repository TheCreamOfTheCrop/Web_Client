import { IPartFormProps } from '../Profil/IPartForm';
// Will rename it later
export interface IPartFormPropsExtended extends IPartFormProps {
    readonly addOn?: string;
    readonly componentClass?: string;
}