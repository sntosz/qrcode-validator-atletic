'use server'

import { supabase } from "@/app/utils/supabase";
import type { CarteirinhaData, ActionResponse } from "@/types/carteirinha";

export async function CadastrarCarteirinha(data: CarteirinhaData): Promise<ActionResponse>{
    try {
        if (!data.name || !data.rgm || !data.course) {
            return { sucesso: false, erro: 'Todos os campos são obrigatórios' };
        }

        const statusValue = data.status === 'inativo' ? 'inativo' : 'ativo';

        const {error} = await supabase
        .from('carteirinhas')
        .insert([
            {
                rgm: data.rgm.trim(),
                name: data.name.trim(),
                course: data.course.trim(),
                status: statusValue
            }
        ])
        if (error){
            if (error.code === '23505') {
                return { sucesso: false, erro: 'Já existe uma carteirinha cadastrada com este RGM' };
            }
            return { sucesso: false, erro: 'Erro ao cadastrar a carteirinha' };
        }
        return { sucesso: true };
    }catch (error) {
        console.error('Erro ao cadastrar a carteirinha:', error);
        return { sucesso: false, erro: 'Erro ao cadastrar a carteirinha' };
    }
}



