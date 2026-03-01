# --- Base Stage ---
FROM node:22 AS base
WORKDIR /app
COPY package*.json ./

# --- Development Stage ---
# This installs all dependencies (including devDependencies like Vite/tsx)
FROM base AS development
RUN npm install
COPY . .
# This command runs your dev server with live reload
CMD ["npm", "run", "dev"]

# --- Build Stage ---
FROM development AS build
RUN npm run build

# --- Production Stage ---
# A clean stage that only contains the final code and production modules
FROM base AS production
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# If you have other folders needed in prod (like 'views' for EJS), copy them here:
COPY --from=build /app/views ./views
COPY --from=build /app/public ./public 

EXPOSE 1337
CMD ["npm", "start"]
