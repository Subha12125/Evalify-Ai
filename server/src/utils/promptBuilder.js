function buildEvaluationPrompt(examData) {
  const { subject, totalMarks, rubric } = examData;
  const questions = examData.questions || [];

  let questionsSection;
  // Check if questions contains extracted full text from question paper PDF
  const extractedText = questions.find(q => q.type === 'extracted_text');
  if (extractedText && extractedText.text) {
    questionsSection = `## Question Paper (Extracted Text)\n${extractedText.text.trim()}`;
  } else if (questions.length > 0) {
    questionsSection = `## Questions & Marking Scheme\n${questions.map((q, i) => `Q${i + 1}. ${q.text} [${q.marks} marks]`).join('\n')}`;
  } else {
    questionsSection = `## Questions\nNo specific questions provided. Evaluate all answers found in the answer sheet based on the subject and total marks.`;
  }

  const rubricText = rubric ? rubric.trim() : 'Evaluate based on accuracy, completeness, and clarity of explanation.';

  return `You are an expert exam evaluator. Evaluate the student's answer sheet image(s) based on the following exam details.

## Exam Information
- Subject: ${subject}
- Total Marks: ${totalMarks}

${questionsSection}

## Rubric / Evaluation Criteria
${rubricText}

## Evaluation Instructions
1. Carefully read each answer from the student's answer sheet image(s)
2. Compare each answer against the question paper text and rubric above
3. Assess the accuracy, completeness, and quality of each response
4. Assign marks for each question based on the rubric
5. Provide specific, constructive feedback for each answer

## CRITICAL - Required JSON Output Format
You MUST return ONLY a valid JSON object with this EXACT structure (no markdown, no extra text before or after):
{
  "studentAnswers": [
    {
      "questionNumber": 1,
      "marksAwarded": 5,
      "maxMarks": 10,
      "feedback": "Good understanding shown but missing some details",
      "confidence": "high"
    },
    {
      "questionNumber": 2,
      "marksAwarded": 8,
      "maxMarks": 10,
      "feedback": "Excellent answer with comprehensive explanation",
      "confidence": "high"
    }
  ],
  "totalMarksAwarded": 13,
  "totalMaxMarks": ${totalMarks},
  "overallFeedback": "Overall good performance with some areas for improvement",
  "evaluationNotes": "Any issues reading the answer sheet or special observations"
}

IMPORTANT RULES:
- Return ONLY the JSON object
- Do NOT include markdown code fences (no \`\`\`json)
- Do NOT include any text before or after the JSON
- All numbers must be numeric (not strings)
- Use only "high", "medium", or "low" for confidence values
- questionNumber values must match the questions in the question paper
- Ensure totalMarksAwarded equals sum of all marksAwarded values`;
}

function buildQuestionExtractionPrompt() {
  return `Extract all questions from this question paper image. 

Return ONLY a valid JSON array with this structure (no markdown, no extra text):
[
  {
    "questionNumber": 1,
    "text": "<full question text>",
    "marks": 10,
    "subParts": [
      { "part": "a", "text": "<sub-question text>", "marks": 5 }
    ]
  }
]

IMPORTANT RULES:
- Return ONLY the JSON array
- Do NOT include markdown code fences
- Do NOT include any text before or after the JSON
- If marks are not visible for a question, estimate based on typical distribution
- All numbers must be numeric (not strings)`;
}

module.exports = { buildEvaluationPrompt, buildQuestionExtractionPrompt };
