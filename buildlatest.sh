echo "Bygger flex-vedtak-mock latest for docker compose utvikling"

npm i
npm run build

docker build . -t flex-vedtak-mock:latest
