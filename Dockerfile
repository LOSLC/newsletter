FROM oven/bun:latest

RUN apt update && apt install -y nodejs

WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

CMD ["bun", "run", "db:migrate", "&&", "bun", "run", "start"]
