import { NextResponse } from 'next/server'
import { supabase } from '@/app/utils/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('carteirinhas')
      .select('name, rgm, course, status')
      .order('rgm', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno ao listar carteirinhas' }, { status: 500 })
  }
}
