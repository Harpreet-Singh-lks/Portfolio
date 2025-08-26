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
    "I’m a 4th-year BTech Electrical Engineering student at IIT Roorkee with strong backend experience and a deep interest in DeFi and blockchain. I enjoy exploring new technologies and building products, especially at the intersection of web3 and scalable backend systems.",
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
  skills: "I possess a diverse set of skills, including proficiency in several programming languages such as **TypeScript**, **Rust**, **Go**, **Python**, , **C/C++**, and **Solidity**. Additionally, I have experience with various technologies like **EVM**, **Docker**, **Vite**, **Next.js**, **Remix**,  **Tailwind CSS**, **Ethers.js**, **Foundry** and **Git**.",
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
    degree: "Bachelor in technology in electrical Enginnering",       // TODO: update
    institution: "IIT ROORKEE", // TODO: update
    year: "4th"            // TODO: update
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

    const systemPrompt = `You are Harpreet Singh's AI portfolio assistant. 
Use the resume context below to answer questions. 

Rules:
1. If the user says "hi", "hello", or asks open-ended recruiter questions like 
   "tell me about yourself", "what do you do", "can you introduce yourself":
   - Respond with a concise professional greeting as Harpreet Singh.
   - Give a short summary (background, skills, focus).
   - Invite the user to explore more with commands (/projects, /skills, /experience, /about, /contact).

2. If the user types a command:
   - /skills → List skills clearly and concisely from the resume.
   - /projects → List projects with titles, tech stack, and key features.
   - /experience → List work experiences with role, company, duration, and highlights.
   - /about → Provide the summary/about section from the resume.
   - /contact → Provide personalInfo (email, LinkedIn, GitHub, location).

3. If the user asks something else (not in commands):
   - Answer as best as possible using the resume data.
   - Keep it short and professional.

Resume Data:
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