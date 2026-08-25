const TECH_SKILLS = [
  'React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS',
  'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'FastAPI', 'Go', 'PHP', 'Laravel',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Git',
  'REST API', 'GraphQL', 'ESP32', 'MQTT', 'Arduino', 'C/C++', 'Tableau', 'Power BI', 'Figma'
];

export function extractSkillsFromText(rawText: string): string[] {
  const matched = new Set<string>();
  const lowerText = rawText.toLowerCase();

  for (const skill of TECH_SKILLS) {
    const regex = new RegExp(`\\b${skill.toLowerCase()}\\b`, 'i');
    if (regex.test(lowerText)) {
      matched.add(skill);
    }
  }

  return Array.from(matched);
}