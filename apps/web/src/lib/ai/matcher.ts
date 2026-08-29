import { dbPool } from "@/lib/db";

export async function calculateJobMatch(resumeId: string, requiredSkills: string[], jobEmbedding: number[]) {
  const query = `
    SELECT 
      r.id AS resume_id,
      (1 - (r.profile_embedding <=> $1::vector)) AS experience_score,
      (
        SELECT COUNT(DISTINCT rs.skill_name)::float / GREATEST(ARRAY_LENGTH($2::text[], 1), 1)
        FROM resume_skills rs 
        WHERE rs.resume_id = r.id AND LOWER(rs.skill_name) = ANY($2::text[])
      ) AS skill_score
    FROM resumes r
    WHERE r.id = $3;
  `;

  const result = await dbPool.query(query, [JSON.stringify(jobEmbedding), requiredSkills, resumeId]);
  const row = result.rows[0];

  if (!row) throw new Error("Resume tidak ditemukan");

  const skillScore = row.skill_score || 0;
  const expScore = row.experience_score || 0;
  
  // Scoring terbobot: 50% Skill, 50% Experience Vector
  const totalMatchScore = Math.round((0.50 * skillScore + 0.50 * expScore) * 100);

  return {
    matchScore: totalMatchScore,
    breakdown: { skillScore, expScore },
  };
}