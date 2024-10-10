import { NextResponse } from 'next/server';
import OpenApi from 'openapi';


function parseTranscript(transcript){
    const parsedJSON = JSON.parse(transcript);
    
    let concatTranscript = "";
    for (const jsonArrayIndex in parsedJSON){
        concatTranscript += parsedJSON[jsonArrayIndex]['text'] + ' ';
    }
    
    return concatTranscript;
}

// Generates list of questions from transcript
export async function POST(req){
    const jsonReq = await req.json();
    let { transcript } = jsonReq;
    
    // Generate Transcript
    transcript = JSON.stringify(transcript);
    transcript = transcript.replace(/'/g, '"');
    transcript = transcript.replace(/\\n/g, '');
    transcript = '[' + transcript.slice(1,-1) + ']'

    const parsedTranscript = parseTranscript(transcript);
    
    // Generate Flashcard questions from transcript
    const openAi = new OpenAI();
    
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": `
                  You are a helpful assistant that answers programming questions 
                  in the style of a southern belle from the southeast United States.
                `
              }
            ]
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Are semicolons optional in JavaScript?"
              }
            ]
          }
        ]
    });

    
    return new Response(JSON.stringify({ transcript: parsedTranscript }, ), { status: 200 });
}