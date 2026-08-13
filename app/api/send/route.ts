import {NextResponse} from 'next/server';
import crypto from 'crypto';
import {supabase} from '@/app/utils/supabase';
import {Resend} from 'resend';
import EmailTemplate from '@/components/emailTemplate/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequestBody {
    email: string;
}
interface UserRecord {
    name: string;
}


export async function POST( req: Request) {
    try {
        const body: EmailRequestBody = await req.json();
        const {email} = body;

        if (!email) {
            return NextResponse.json({error: "E-mail é obrigatório."}, {status: 400});
        }

        const {data: user, error: userError} = await supabase
            .from("usuarios_admin")
            .select("email, username")
            .eq("email", email)
            .single();

        if (userError) {
            console.error("❌ Erro ao buscar usuário:", userError);
            return NextResponse.json({error: "Erro interno."}, {status: 500});
        }
        if (!user) {
            return NextResponse.json({error: "Usuário não encontrado."}, {status: 404});
        }
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15min

        await supabase
            .from("password_reset_tokens")
            .delete()
            .eq("email", email);

        const {error: insertError} = await supabase
            .from("password_reset_tokens")
            .insert({email, token, expires_at: expiresAt.toISOString()});

        if (insertError) {
            console.error("❌ Erro ao inserir token:", insertError);
            return NextResponse.json({error: "Erro ao gerar token de recuperação."}, {status: 500});
        }

        const resetUrl = `https://validmalware.dev/recuperarSenha?token=${token}`;

        await resend.emails.send({
            from: "A.A.A.E.S.U.C <nao-responda@validmalware.dev>",
            to: [email],
            subject: "Recuperação de Senha - A.A.A.E.S.U.C",
            react: EmailTemplate({
                firstName: user.username,
                ctaUrl: resetUrl,
            }),
        });
        return NextResponse.json({message: "E-mail de recuperação enviado com sucesso."}, {status: 200});
    }
    catch (error) {
        console.error("❌ Erro ao processar a solicitação:", error);
        return NextResponse.json({error: "Erro interno."}, {status: 500});
    }
}
