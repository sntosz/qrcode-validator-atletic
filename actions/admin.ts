"use server";

import { supabase } from "@/app/utils/supabase";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { AdminPayload } from "@/types/admin";
import type {CarteirinhaData} from "@/types/carteirinha";

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET não está definida");
}

const JWT_SECRET = new TextEncoder().encode(secretKey);

interface ActionResponse {
  sucesso: boolean;
  erro?: string;
}

export async function LoginAdmin(
  username: string,
  password: string,
): Promise<ActionResponse> {
  try {
    const { data: usuario, error } = await supabase
      .from("usuarios_admin")
      .select("*")
      .eq("username", username.toLowerCase().trim())
      .single();

    if (error || !usuario) {
      return { sucesso: false, erro: "Usuário ou senha inválidos" };
    }
    const validPassword = await bcrypt.compare(password, usuario.senha_hash);
    if (!validPassword) {
      return { sucesso: false, erro: "Usuário ou senha inválidos" };
    }
    const payload = {
      id: usuario.id,
      username: usuario.username,
      nome: usuario.nome,
    };

    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    return { sucesso: true };
  } catch (err) {
    return { sucesso: false, erro: "Erro interno no servidor" };
  }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}

export async function EditCarteirinha(
  rgm: string,
  data: { name: string; course: string; status?: "ativo" | "inativo" }
): Promise<ActionResponse> {
  try {
    if (!data.name || !data.course) {
      return { sucesso: false, erro: 'Nome e curso são obrigatórios' }
    }

    const statusValue = data.status === 'inativo' ? 'inativo' : 'ativo'

    const { error } = await supabase
      .from('carteirinhas')
      .update({
        name: data.name.trim(),
        course: data.course.trim(),
        status: statusValue
      })
      .eq('rgm', rgm.trim())

    if (error) {
      return { sucesso: false, erro: 'Erro ao atualizar carteirinha' }
    }

    return { sucesso: true }
  } catch (error) {
    return { sucesso: false, erro: 'Erro interno ao atualizar' }
  }
}

export async function DeleteCarteirinha(rgm: string): Promise<ActionResponse> {
    try{
        if(!rgm || !rgm.trim()) {
            return { sucesso: false, erro: "RGM inválido" };
        }
        const {error} = await supabase
        .from("carteirinhas")
        .delete()
        .eq("rgm", rgm.trim());
        
        if(error) {
            return { sucesso: false, erro: "Erro ao deletar carteirinha" };
        }
        return { sucesso: true };
    } catch (error){
        return { sucesso: false, erro: "Erro interno no servidor" };
    }
}
