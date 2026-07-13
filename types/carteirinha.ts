export interface CarteirinhaInput{
    name: string;
    rgm: string;
    course: string;
}

export interface ActionResponse{
    sucesso: boolean;
    erro?: string;
}