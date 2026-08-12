import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EmailTemplate from '@/components/emailTemplate/emailTemplate';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    if (!process.env.RESEND_API_KEY) {
        console.error("❌ ERRO: A variável RESEND_API_KEY não foi encontrada no .env.local");
        return NextResponse.json(
            { error: "Chave do Resend não configurada no servidor local." },
            { status: 500 }
        );
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'A.A.A.E.S.U.C <contato@validmalware.dev>',
            to: ['guguimaraes13@gmail.com'],
            subject: 'Validação de QR Code',
            react: EmailTemplate({ firstName: 'Gustavo' }),
        });

        if (error) {
            console.error("❌ Erro retornado pelo Resend:", error);
            return NextResponse.json({ error }, { status: 500 });
        }

        console.log("✅ E-mail disparado com sucesso! ID:", data?.id);
        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error("❌ Erro interno no disparo:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
