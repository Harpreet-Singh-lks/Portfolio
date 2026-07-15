import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const answer = generateAnswer(question);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}

function generateAnswer(question: string): string {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
    return 'Hey! 👋 Welcome to my portfolio. You can ask me about my projects, experience, skills, or get my contact info. Try commands like /projects, /experience, /skills, or /about!';
  }

  if (lowerQuestion.includes('what') || lowerQuestion.includes('who')) {
    return 'I\'m Harpreet, a full-stack engineer passionate about building scalable systems and exploring Web3. Feel free to check out my projects and experience using the commands in the search bar!';
  }

  if (lowerQuestion.includes('help')) {
    return 'You can use the following commands:\n• /about - Learn about me\n• /experience - View my work experience\n• /projects - Explore my projects\n• /skills - See my technical skills\n• /contact - Get my contact information\n\nOr just type any question and I\'ll try to help!';
  }

  return 'Thanks for the question! You can explore my portfolio using the commands (type / in the search bar), or feel free to ask about my background, projects, or skills. What would you like to know?';
}
