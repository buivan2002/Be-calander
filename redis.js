const Redis = require('ioredis');

let redis = null;

try {
  redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    // password: 'nếu có'
  });

  // Gắn sự kiện lỗi để không bị crash
  redis.on('error', (err) => {
    console.error('❌ Không thể kết nối Redis:', err.message);
    redis = null;
  });
} catch (err) {
  console.error('❌ Redis bị lỗi khi khởi tạo:', err.message);
  redis = null;
}

// Export ra dùng chỗ khác
module.exports = redis;
