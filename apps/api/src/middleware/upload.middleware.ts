import multer from 'multer';

// Simpan file di memory buffer agar langsung diteruskan ke pdf-parse tanpa simpan ke disk
const storage = multer.memoryStorage();

export const uploadPdf = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Format file tidak valid. Harap upload file PDF.'));
    }
  },
});