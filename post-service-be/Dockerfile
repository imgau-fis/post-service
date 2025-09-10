# Dockerfile - BE
FROM oven/bun:1

# Tạo thư mục app
WORKDIR /app

# Copy package + lock file trước
COPY package*.json ./
RUN bun install

# Copy toàn bộ project vào container
COPY . .

# Mở port 8080 cho Express
EXPOSE 8081

# Chạy app ở dev mode
CMD ["bun", "dev"]
