/**
 * Parses Gemini's JSON response from evaluation.
 * Handles markdown code blocks, raw JSON, and common formatting issues.
 */
function parseEvaluationResponse(rawText) {
  let cleaned = rawText.trim();

  // Log raw response for debugging
  console.log('[PARSER] Raw response (first 500 chars):', cleaned.substring(0, 500));

  // Strip markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  // Try to extract JSON if it's embedded in other text
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch && !cleaned.startsWith('{')) {
    console.log('[PARSER] Extracted JSON from response');
    cleaned = jsonMatch[0];
  }

  try {
    const parsed = JSON.parse(cleaned);
    
    // Validate structure
    if (!parsed.studentAnswers || !Array.isArray(parsed.studentAnswers)) {
      return {
        success: false,
        error: 'Invalid response structure: missing studentAnswers array',
      };
    }

    if (typeof parsed.totalMarksAwarded !== 'number') {
      return {
        success: false,
        error: 'Invalid response structure: totalMarksAwarded must be a number',
      };
    }

    if (typeof parsed.totalMaxMarks !== 'number') {
      return {
        success: false,
        error: 'Invalid response structure: totalMaxMarks must be a number',
      };
    }

    return { success: true, data: parsed };
  } catch (err) {
    return {
      success: false,
      error: `JSON Parse Error: ${err.message}. Response length: ${cleaned.length}`,
      raw: cleaned.substring(0, 500),
    };
  }
}

/**
 * Extracts student info from PDF text or filename.
 */
function extractStudentInfo(filename) {
  // Try to extract roll number / name from filename pattern: "RollNo_Name.pdf"
  const match = filename.replace(/\.pdf$/i, '').match(/^(\w+)_(.+)$/);

  if (match) {
    return { rollNumber: match[1], name: match[2].replace(/_/g, ' ') };
  }

  // Fallback: use filename as identifier
  return {
    rollNumber: filename.replace(/\.pdf$/i, ''),
    name: filename.replace(/\.pdf$/i, ''),
  };
}

module.exports = { parseEvaluationResponse, extractStudentInfo };
