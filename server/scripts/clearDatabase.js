#!/usr/bin/env node

/**
 * Clear all data from Supabase
 * WARNING: This will delete all users, exams, evaluations, students, and results
 * Run with: node scripts/clearDatabase.js
 */

const supabase = require('../src/config/supabase');
const logger = require('../src/utils/logger');

async function clearDatabase() {
  try {
    console.log('\n🗑️  WARNING: This will DELETE ALL data from Supabase');
    console.log('=========================================\n');
    
    logger.info('Starting database cleanup...');

    // Delete in order of dependencies (respect foreign keys)
    
    logger.info('Deleting results...');
    const { error: resultError } = await supabase
      .from('results')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (using impossible condition)
    
    if (resultError && !resultError.message.includes('no rows')) {
      throw new Error(`Failed to delete results: ${resultError.message}`);
    }
    logger.info('✓ Results cleared');

    logger.info('Deleting evaluations...');
    const { error: evalError } = await supabase
      .from('evaluations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (evalError && !evalError.message.includes('no rows')) {
      throw new Error(`Failed to delete evaluations: ${evalError.message}`);
    }
    logger.info('✓ Evaluations cleared');

    logger.info('Deleting students...');
    const { error: studentError } = await supabase
      .from('students')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (studentError && !studentError.message.includes('no rows')) {
      throw new Error(`Failed to delete students: ${studentError.message}`);
    }
    logger.info('✓ Students cleared');

    logger.info('Deleting exams...');
    const { error: examError } = await supabase
      .from('exams')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (examError && !examError.message.includes('no rows')) {
      throw new Error(`Failed to delete exams: ${examError.message}`);
    }
    logger.info('✓ Exams cleared');

    logger.info('Deleting users...');
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (userError && !userError.message.includes('no rows')) {
      throw new Error(`Failed to delete users: ${userError.message}`);
    }
    logger.info('✓ Users cleared');

    console.log('\n✅ Database cleanup complete!\n');
    process.exit(0);

  } catch (err) {
    console.error('\n❌ Error during cleanup:', err.message);
    process.exit(1);
  }
}

clearDatabase();
