export type CarteirinhaStatus = 'ativo' | 'inativo';

export interface CarteirinhaData {
    name: string;
    rgm: string;
    course: string;
    status?: CarteirinhaStatus;
}

export interface ActionResponse {
    sucesso: boolean;
    erro?: string;
}