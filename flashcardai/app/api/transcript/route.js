import { NextResponse } from 'next/server';
import { exec } from 'child_process';

async function getYouTubeTranscript(videoId) {
  return new Promise((resolve, reject) => {
    exec(`youtube_transcript_api ${videoId}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

export async function POST(req){
  //console.log(req)
  const jsonReq = await req.json();
  const { youtube_url } = jsonReq;
  if (!youtube_url) {
    return new Response(JSON.stringify({ error: 'Missing youtube_url parameter' }), { status: 400 });
  }
  const { searchParams } = new URL(youtube_url);
  const videoId = searchParams.get('v');
  console.log(videoId)

  if (!videoId) {
    return new Response(JSON.stringify({ error: 'Missing videoId parameter' }), { status: 400 });
  }

  try {
    const transcript = await getYouTubeTranscript(videoId);
    const text = transcript.slice(2,-3);
    return new Response(JSON.stringify({ transcript:  text }, ), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.toString() }), { status: 500 });
  }
}
