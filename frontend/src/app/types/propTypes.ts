export interface InputFIeldProps {
    label: string;
    type?: string
}

export interface ButtonProps {
    title: string;
    type: 'submit' | 'button' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface FormProps {
    children: React.ReactNode;
}