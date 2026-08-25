import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { uploadPdf } from './middleware/upload.middleware';
import { parseResumeHandler } from './controllers/parser.controller';
import { renderPdfHandler } from './controllers/render.controller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/parser/parse-pdf', uploadPdf.single('resume'), parseResumeHandler);
app.post('/api/render/generate-pdf', renderPdfHandler);

app.listen(PORT, () => {
  console.log(`Lokers API Server berjalan di http://localhost:${PORT}`);
});