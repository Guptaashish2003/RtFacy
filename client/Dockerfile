FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Vite defaults to 5173
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
