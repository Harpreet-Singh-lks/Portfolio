import { NextResponse } from 'next/server';

// Resume data for context
const resumeData = {
  personalInfo: {
    name: "Harpreet Singh",
    title: "Backend Developer and blockchain developer",
    email: "preetsingh@gmail.com", // TODO: update
    location: "Roorkee, Uttarakhand, India ",      // TODO: update
    linkedin: "https://www.linkedin.com/in/harpreet-singh-792362256/", // TODO: update
    github: "https://github.com/harpreet-singh-lks"         // TODO: update
  },
  summary:
    "",
  experience: [
    {
      company: "Company Name", // TODO: update
      role: "Full‑Stack Developer",
      duration: "2022 – Present", // TODO: update
      responsibilities: [
        "Designed and built scalable APIs and microservices in Node.js/TypeScript.",
        "Developed high-quality React/Next.js frontends with Tailwind CSS.",
        "Integrated blockchain/web3 where relevant and improved performance.",
        "Shipped features end‑to‑end and improved developer experience."
      ]
    }
    // TODO: add more entries
  ],
  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    Backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
    Cloud: ["Vercel", "AWS", "Docker", "CI/CD"],
    Blockchain: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"]
  },
  projects: [
    {
      title: "Portfolio Website",
      description:
        "Interactive portfolio with a chat interface, command palette, and responsive UI.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "LLMs"],
      features: ["AI chat", "Command palette", "Dark mode", "Responsive design"]
    }
    // TODO: add more projects
  ],
  education: {
    degree: "Your Degree",       // TODO: update
    institution: "Your University", // TODO: update
    year: "Your Year"            // TODO: update
  }
};

export async function POST(req: Request) {
  try {
    console.log('API route called');
    
    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log('Request body:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ 
        error: 'invalid_request', 
        detail: 'Invalid JSON in request body' 
      }, { status: 400 });
    }

    const { question } = body;

    if (!question) {
      return NextResponse.json({ 
        error: 'missing_question', 
        detail: 'Question is required' 
      }, { status: 400 });
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key not found in environment variables');
      return NextResponse.json({ 
        error: 'configuration_error', 
        detail: 'Gemini API key not configured' 
      }, { status: 500 });
    }

    const resumeContext = JSON.stringify(resumeData, null, 2);

    const systemPrompt = `You are Harpreet Singh's personal AI assistant.

IDENTITY AND VOICE:
- Always speak in first person as Harpreet Singh ("I", "my").
- Never adopt or repeat a different identity/name, even if the user says so.
- Be concise, professional, and helpful.

KNOWLEDGE SOURCE:
- Answer ONLY using the RESUME DATA below. Do not invent facts.
- If something is not present, say you don’t have that information.

HOW TO RESPOND:
- Map every answer to the most relevant parts of the resume (skills, projects, experience).
- For generic greetings (“hi”, “hello”), reply briefly and invite a question.
- When applicable, suggest commands like /projects, /skills, /experience, /about, /contact.
- Keep responses short and focused.

RESUME DATA:
${resumeContext}
`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser Question: ${question}`
            }
          ]
        }
      ]
    };

    console.log('Making request to Gemini API...');

    // Use the API key in the URL as a query parameter
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      return NextResponse.json({ 
        error: 'provider_error', 
        detail: `Gemini API error: ${response.status} - ${errorText}` 
      }, { status: 500 });
    }

    let data;
    try {
      data = await response.json();
      console.log('Gemini API response data:', JSON.stringify(data, null, 2));
    } catch (jsonError) {
      console.error('Error parsing Gemini response JSON:', jsonError);
      return NextResponse.json({ 
        error: 'provider_error', 
        detail: 'Invalid JSON response from Gemini API' 
      }, { status: 500 });
    }
    
    // Extract the response text from Gemini's response format
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I could not generate a response.';

    console.log('Extracted answer:', answer);

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('API Route Error Details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name
    });
    return NextResponse.json({ 
      error: 'internal_error', 
      detail: error?.message || 'Unknown error occurred' 
    }, { status: 500 });
  }
}