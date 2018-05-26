export interface IPartFormProps {
    readonly name: string;
    readonly type: string;
    readonly value: string;
    setValue(e: any): void;
    validation(): "success" | "warning" | "error" | null;
  }