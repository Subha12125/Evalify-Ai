/**
 * Builds structured prompts for Claude Vision API evaluation.
 */

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

  return `You are an expert exam evaluator. Evaluate the student's answer sheet image(s) based on the following exam details.

## Exam Information
- Subject: ${subject}
- Total Marks: ${totalMarks}

${questionsSection}

## Rubric / Evaluation Criteria
${rubric || 'Evaluate based on accuracy, completeness, and clarity of explanation.'}

## Instructions
1. Read each answer from the student's handwritten/typed answer sheet.
2. Compare each answer against the question paper text and rubric above.
3. Assign marks for each question.
4. Provide specific, constructive feedback for each answer.

## Required JSON Output Format
Return ONLY a valid JSON object with this exact structure:
{
  "studentAnswers": [
    {
      "questionNumber": 1,
      "marksAwarded": <number>,
      "maxMarks": <number>,
      "feedback": "<specific feedback for this answer>",
      "confidence": "<high|medium|low>"
    }
  ],
  "totalMarksAwarded": <number>,
  "totalMaxMarks": ${totalMarks},
  "overallFeedback": "<summary feedback>",
  "evaluationNotes": "<any issues reading the answer sheet>"
}`;
}

function buildQuestionExtractionPrompt() {
  return `Extract all questions from this question paper image. 

Return ONLY a valid JSON array with this structure:
[
  {
    "questionNumber": 1,
    "text": "<full question text>",
    "marks": <marks allocated>,
    "subParts": [
      { "part": "a", "text": "<sub-question text>", "marks": <marks> }
    ]
  }
]

If marks are not visible for a question, set marks to null.`;
}

module.exports = { buildEvaluationPrompt, buildQuestionExtractionPrompt };
