@echo off
echo Docker build started...
docker build -t prafaelmsantos/auto-moreira-admin-app:latest -f Dockerfile .
echo Docker build ended...
echo Docker push started...
docker push prafaelmsantos/auto-moreira-admin-app:latest
echo Docker push ended...