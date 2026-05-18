import dotenv from 'dotenv';

dotenv.config();

import app from '@/index';

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
