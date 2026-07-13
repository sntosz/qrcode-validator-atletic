'use server'

import { supabase } from "@/app/utils/supabase";
import type { CarteirinhaInput, ActionResponse } from "@/types/carteirinha";

export async function CadastrarCarteirinha(data: CarteirinhaInput): Promise<ActionResponse>{
    try {
        if (!data.name || !data.rgm || !data.course) {
            return { sucesso: false, erro: 'Todos os campos são obrigatórios' };
        }
        const {error} = await supabase
        .from('carteirinhas')
        .insert([
            {
                rgm: data.rgm.trim(),
                name: data.name.trim(),
                course: data.course.trim(),
                status: 'ativo'
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



