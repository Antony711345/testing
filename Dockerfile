FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build the application first
RUN npm run build
EXPOSE 4170
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
