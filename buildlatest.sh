echo "Bygger vedtak-generator latest for docker compose utvikling"

npm i
npm run build

docker build . -t vedtak-generator:latest
