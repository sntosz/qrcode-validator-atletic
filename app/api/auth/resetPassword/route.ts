import {NextResponse} from "next/server";
import {supabase} from "@/app/utils/supabase";
import bcrypt from "bcryptjs";


interface resetPasswordBody {
    token: string;
    newPassword: string;
}
interface resetTokenRecord{
    id: string;
    email: string;
    token: string;
    expires_at: string;
}

export async function POST(req: Request) {
    try {
        const body: resetPasswordBody = await req.json();
        const {token, newPassword} = body;

        if (!token || !newPassword) {
            return NextResponse.json({error: "Token e nova senha são obrigatórios."}, {status: 400});
        }
        if (newPassword.length < 6) {
            return NextResponse.json({error: "A nova senha deve ter pelo menos 6 caracteres."}, {status: 400});
        }

        const { data: resetRecord, error: fetchError} = await supabase
            .from('password_reset_tokens')
            .select('*')
            .eq('token', token)
            .maybeSingle<resetTokenRecord>();

        if (fetchError || !resetRecord) {
            return NextResponse.json({error: "Link de recuperação inválido ou expirado."}, {status: 400});
        }

        const now = new Date();
        const expiresAt = new Date(resetRecord.expires_at);

        if (now > expiresAt) {
            await supabase
                .from('password_reset_tokens')
                .delete()
                .eq('token', token);
            return NextResponse.json({error: "Link de recuperação expirado."}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const {error: updateError } = await supabase
            .from('users')
            .update({senha_hash: hashedPassword})
            .eq('email', resetRecord.email);

        if (updateError) {
            console.error('Erro ao atualizar a senha:', updateError);
            return NextResponse.json({error: "Erro ao atualizar a senha."}, {status: 500});
        }

        await supabase
            .from('password_reset_tokens')
            .delete()
            .eq('token', token);

        return NextResponse.json({message: "Senha atualizada com sucesso!"}, {status: 200});

    }
    catch(error){
        console.error('Erro ao redefinir a senha:', error);
        return NextResponse.json({error: "Erro interno ao redefinir a senha."}, {status: 500});
    }
}