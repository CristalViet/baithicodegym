const express = require('express');
const cors = require('cors');
const app = express();

// Cấu hình CORS cho phép frontend từ một domain khác gọi API
app.use(cors({
  origin: 'http://localhost:5173',  // Đảm bảo sử dụng đúng URL của frontend React
}));

app.use(express.json());

const phongtroRoutes = require('./routes/phongtro');
app.use('/api/phongtro', phongtroRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
