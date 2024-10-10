import { NextResponse } from 'next/server';
import OpenAI from 'openai';


function parseTranscript(transcript){
    const parsedJSON = JSON.parse( transcript );
    
    let concatTranscript = "";
    for ( const jsonArrayIndex in parsedJSON ){
        concatTranscript += parsedJSON[ jsonArrayIndex ][ 'text' ] + ' ';
    }
    
    return concatTranscript;
}

// Generates list of questions from transcript
export async function POST(req){
    const jsonReq = await req.json();
    let { transcript } = jsonReq;
    
    // Generate and clean up Transcript
    transcript = JSON.stringify( transcript );
    transcript = transcript.replace( /'/g, '"' );
    transcript = transcript.replace( /\\n/g, '' );
    transcript = transcript.replace( /(\w)"(\w)/g, '$1\'$2');
    transcript = transcript.replace( /\\"/g, '"' )
    transcript = '[' + transcript.slice( 1, -1 ) + ']';

    const parsedTranscript = parseTranscript( transcript );
    
    // Generate Flashcard questions from transcript
    const openAi = new OpenAI();
    
    const response = await openAi.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": `
                You are a teacher teaching several different courses. The user is a student who is 
                coming to you for help to generate flashcards from transcripts. You help the user generate 
                exactly 10 flashcards each with the question and answer to the question. You ensure that 
                the questions are related to the content, are equally spaced among the content, and are helpful 
                for learning.
                `
              }
            ]
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": `Please generate 10 questions from the following transcript : \n${ parsedTranscript }`
              }
            ]
          }
        ]
    });

    
    return new Response(JSON.stringify({ response: response.choices[0].message }, ), { status: 200 });
}