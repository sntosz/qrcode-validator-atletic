export interface CarteirinhaData{
    name: string;
    rgm: string;
    course: string;
    status: string;
}

export interface ActionResponse{
    sucesso: boolean;
    erro?: string;
}