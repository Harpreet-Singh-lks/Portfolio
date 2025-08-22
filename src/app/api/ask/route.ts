import { NextResponse } from 'next/server';

// Optional: import your resume data to inject as context
// import resume from '@/app/data/resume';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const system = `You are an assistant that answers strictly about Harpreet's resume and projects.
If unknown, say you don't know and suggest relevant commands (/projects, /skills, /experience).`;

    // Minimal prompt. You can add resume summary or key bullets here.
    const payload = {
      model: 'grok-2-latest', // Adjust to the exact model you use
      messages: [
        { role: 'system', content: system },
        // { role: 'system', content: JSON.stringify(resume).slice(0, 12000) }, // optional structured context
        { role: 'user', content: question }
      ],
      temperature: 0.2,
    };

    const r = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.XAI_API_KEY!}`,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const t = await r.text();
      return NextResponse.json({ error: 'provider_error', detail: t }, { status: 500 });
    }
    const data = await r.json();
    const answer = data.choices?.[0]?.message?.content ?? '';

    return NextResponse.json({ answer });
  } catch (e: any) {
    return NextResponse.json({ error: 'internal_error', detail: e?.message }, { status: 500 });
  }
}