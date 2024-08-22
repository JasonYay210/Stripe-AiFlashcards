import { NextResponse } from 'next/server'
import Groq from 'groq-sdk';

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or idea.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, explanations, applications, and examples.
6. Avoid overly complex or ambiguous phrasing in both the questions and answers.
7. When appropriate, use mnemonics, acronyms, or other memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information to create the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate up to 5 sets of 12 flashcards at a time to maintain focus and clarity.
12. Limit the length of each flashcard's content to at most 5-6 lines of text to ensure conciseness.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format: 
{
    "flashcards": [{
        "front": str,
        "back": str
    }]
}
`
// Use your own system prompt here
require('dotenv').config();

export async function POST(req) {
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY, // This is the default and can be omitted
      });
    const data = await req.text()
  
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'llama3-8b-8192',
      response_format: { type: 'json_object' },
    })
  
    // We'll process the API response in the next step
      // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }