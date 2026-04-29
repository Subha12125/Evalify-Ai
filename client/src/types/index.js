/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} Exam
 * @property {string} id
 * @property {string} title
 * @property {string} batch
 * @property {string} date
 * @property {string} status
 * @property {number} totalStudents
 * @property {number} completedStudents
 */

/**
 * @typedef {Object} Result
 * @property {string} id
 * @property {string} examId
 * @property {string} studentName
 * @property {string} rollNo
 * @property {number} score
 * @property {number} totalMarks
 * @property {number} accuracy
 * @property {string} status
 * @property {string} [feedback]
 */
