/**
 * Parses Claude's JSON response from evaluation.
 * Handles markdown code blocks and raw JSON.
 */
function parseEvaluationResponse(rawText) {
  let cleaned = rawText.trim();

  // Strip markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  try {
    const parsed = JSON.parse(cleaned);
    return { success: true, data: parsed };
  } catch (err) {
    return {
      success: false,
      error: `Failed to parse AI response: ${err.message}`,
      raw: rawText,
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
