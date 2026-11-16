# Build the Vite frontend first.
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Build the Go backend.
FROM golang:1.23-alpine AS backend-build
WORKDIR /app/backend

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/server .

# Runtime image containing the backend and the built frontend.
FROM alpine:3.20
WORKDIR /app

RUN addgroup -S app && adduser -S -G app app

COPY --from=backend-build /out/server ./server
COPY --from=frontend-build /app/frontend/dist ./dist

ENV STATIC_DIR=/app/dist
ENV PORT=10000
EXPOSE 10000
USER app

CMD ["./server"]
