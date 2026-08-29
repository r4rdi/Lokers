import { NextRequest, NextResponse } from "next/server";
import { calculateJobMatch } from "@/lib/ai/matcher";

export async function POST(req: NextRequest) {
  try {
    const { resumeId, requiredSkills, jobEmbedding } = await req.json();
    const result = await calculateJobMatch(resumeId, requiredSkills, jobEmbedding);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}