/**
 * UNIDAR – Storage Utility
 * Handles file saving for local development and provides a stub for cloud storage (Vercel Blob, etc.)
 */
import fs from 'fs';
import path from 'path';

export const storage = {
  /**
   * Saves a file to the local filesystem
   * @param {File} file - Formidable file object
   * @param {string} subfolder - 'listings', 'verifications', or 'contracts'
   * @returns {string} - The relative path to the saved file
   */
  async save(file, subfolder) {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder);
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `\${Date.now()}-\${file.originalFilename || 'upload'}`;
    const targetPath = path.join(uploadDir, filename);

    // Copy file from temp to target
    fs.copyFileSync(file.filepath, targetPath);
    // Optional: remove temp file
    // fs.unlinkSync(file.filepath);

    return `uploads/\${subfolder}/\${filename}`;
  },

  /**
   * Deletes a file from the local filesystem
   * @param {string} relativePath - The path stored in DB (e.g. 'uploads/...')
   */
  async delete(relativePath) {
    if (!relativePath) return;
    const fullPath = path.join(process.cwd(), 'public', relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};
