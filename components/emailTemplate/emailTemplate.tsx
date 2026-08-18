import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';
import type EmailTemplateProps from '../../types/email';

export default function EmailTemplate({
                                          firstName,
                                          logoUrl = 'https://zb1yjdextz4sw2sh.public.blob.vercel-storage.com/logoAaaes.png',
                                          title = 'Engenharia de Software Unigran Capital - Recuperação de senha',
                                          ctaText = 'Redefinir Minha Senha',
                                          ctaUrl,
                                      }: EmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>A.A.A.E.S.U.C — Recuperação de Senha</Preview>
            <Tailwind>
                <Body className="bg-[#e9ebed] text-[#1e293b] my-auto mx-auto font-sans p-[20px]">
                    <Container className="my-[40px] mx-auto max-w-[500px]">

                        {/* Header com Logo e Nome */}
                        <Section className="text-center mb-[24px]">
                            {logoUrl && (
                                <Img
                                    src={logoUrl}
                                    width="80"
                                    height="80"
                                    alt="A.A.A.E.S.U.C Logo"
                                    className="rounded-full mx-auto shadow-md object-cover"
                                />
                            )}
                            <Heading className="text-[#0f172a] text-[20px] font-extrabold tracking-wider uppercase mt-[16px] mb-0">
                                A.A.A.E.S.U.C
                            </Heading>
                            <Text className="text-[#16a34a] text-[11px] font-bold tracking-widest uppercase mt-[4px] mb-0">
                                Engenharia de Software — Unigran Capital
                            </Text>
                        </Section>

                        {/* Cartão de Conteúdo Principal (Estilo Riot Games) */}
                        <Section className="bg-white rounded-2xl p-[32px] shadow-xl border border-solid border-[#e2e8f0] text-center">
                            <Heading as="h2" className="text-[#0f172a] text-[22px] font-bold mb-[16px] mt-0">
                                Fala, {firstName}! 🐺
                            </Heading>

                            <Text className="text-[#334155] text-[15px] font-medium leading-[22px] mb-[12px]">
                                {title}
                            </Text>

                            <Text className="text-[#64748b] text-[13px] leading-[20px] mb-[8px]">
                                Uma solicitação de recuperação de senha para este e-mail foi efetuada no <strong className="text-[#0f172a]">validMalware.dev</strong>.
                            </Text>

                            <Text className="text-[#64748b] text-[13px] leading-[20px] mb-[24px]">
                                Se você não fez esta solicitação, favor desconsiderar este e-mail. Para continuar a redefinição, acesse o botão abaixo:
                            </Text>

                            {/* Botão sem crash do Tailwind */}
                            {ctaUrl && (
                                <Section className="text-center my-[28px]">
                                    <a
                                        href={ctaUrl}
                                        style={{
                                            backgroundColor: '#16a34a',
                                            color: '#ffffff',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            padding: '14px 32px',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            display: 'inline-block',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        {ctaText}
                                    </a>
                                </Section>
                            )}

                            {/* Badge estilo Riot Games no rodapé do cartão */}
                            <Section className="bg-[#f8fafc] p-[12px] rounded-xl mt-[24px] border border-solid border-[#f1f5f9]">
                                <Text className="font-mono text-[12px] text-[#16a34a] font-bold m-0 text-center">
                                    &lt;/&gt; Código. Disciplina. Domínio.
                                </Text>
                            </Section>
                        </Section>

                        {/* Footer Externo */}
                        <Section className="pt-[24px] mt-[16px] text-center">
                            <Text className="text-[#64748b] text-[11px] m-0 leading-[16px]">
                                Associação Atlética Acadêmica de Engenharia de Software Unigran Capital
                            </Text>
                            <Text className="text-[#94a3b8] text-[10px] m-0 mt-[4px]">
                                Campo Grande - MS | Todos os direitos reservados.
                            </Text>
                        </Section>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}