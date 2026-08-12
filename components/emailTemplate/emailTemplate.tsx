import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';
import type EmailTemplateProps from '../../types/email';

export default function EmailTemplate({
                                  firstName,
                                  logoUrl = 'C:\\Users\\bi\\WebstormProjects\\qrcode-validator-atletic\\public\\logoAaaes.png',
                                  title = 'Engenharia de Software Unigran Capital - Recuperação de senha',
                                  ctaText = 'Clique Aqui',
                                  ctaUrl = 'https://validmalware.dev/recuperarSenha',
                              }: EmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Bem-vindo(a) à A.A.A.E.S.U.C - Lobo da Engenharia de Software</Preview>
            <Tailwind>
                <Body className="bg-[#0a0d0b] text-[#e0e0e0] my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#1f2a23] rounded-xl my-[40px] mx-auto p-[20px] max-w-[500px] bg-[#121614] shadow-2xl">

                        <Section className="text-center mt-[20px]">
                            {logoUrl && (
                                <Img
                                    src={logoUrl}
                                    width="110"
                                    height="110"
                                    alt="A.A.A.E.S.U.C Logo"
                                    className="rounded-full mx-auto border-2 border-solid border-[#22c55e] object-cover"
                                />
                            )}
                            <Heading className="text-white text-[20px] font-extrabold tracking-wider uppercase mt-[16px] mb-0">
                                A.A.A.E.S.U.C
                            </Heading>
                            <Text className="text-[#16a34a] text-[11px] font-bold tracking-widest uppercase mt-[4px] mb-0">
                                Engenharia de Software — Unigran Capital
                            </Text>
                        </Section>

                        <Section className="my-[23px] px-[10px]">
                            <Heading as="h2" className="text-[#4ade80] text-[20px] font-bold mb-[12px]">
                                Fala, {firstName}! 🐺
                            </Heading>

                            <Text className="text-[#cccccc] text-[14px] leading-[24px] mb-[16px]">
                                {title}
                            </Text>

                            <Text className="text-[#a1a1aa] text-[13px]">
                                Uma solicitação de recuperação de senha para este e-mail foi efetuada no validMalware.dev.
                            </Text>
                            <Text className="text-[#a1a1aa] text-[13px]">
                                Se não foi você que fez esta solicitação, favor desconsiderar este e-mail.
                            </Text>
                            <Text className="text-[#a1a1aa] text-[13px]">
                                Para continuar a recuperação de senha acesse o link abaixo:
                            </Text>

                            {ctaUrl && (
                                <Section className="text-center my-[28px]">
                                    <Link
                                        href={ctaUrl}
                                        className="bg-[#16a34a] text-white px-[24px] py-[12px] rounded-md text-[13px] font-bold no-underline inline-block border border-solid border-[#22c55e] shadow-lg"
                                    >
                                        {ctaText}
                                    </Link>
                                </Section>
                            )}

                            {/* Card de Slogan */}
                            <Section className="bg-[#0c100d]  p-[12px] rounded-r-md mt-[24px]">
                                <Text className="font-mono text-[12px] text-[#4ade80] m-0 text-center">
                                    &lt;/&gt; Código. Disciplina. Domínio.
                                </Text>
                            </Section>
                        </Section>

                        {/* Rodapé */}
                        <Section className="border-t border-solid border-[#1a241d] pt-[16px] mt-[24px] text-center">
                            <Text className="text-[#666666] text-[11px] m-0 leading-[16px]">
                                Associação Atlética Acadêmica de Engenharia de Software Unigran Capital
                            </Text>
                            <Text className="text-[#52525b] text-[10px] m-0 mt-[4px]">
                                Campo Grande - MS | Todos os direitos reservados.
                            </Text>
                        </Section>

                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}