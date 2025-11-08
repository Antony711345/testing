FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9000
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "9090"]
