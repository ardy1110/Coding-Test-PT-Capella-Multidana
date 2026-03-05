import express from 'express';
import cors from 'cors';
import pengajuanRoutes from './routes/route';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use('/api/pengajuan', pengajuanRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});