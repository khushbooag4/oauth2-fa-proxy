#!/bin/bash

cp sample.env .env

# Starting all the services together is leading to some issues with fusion auth
# Fusion auth is not able to acquire the lock and a restart is required for the system
docker-compose -f "docker-compose.yml" -f "docker-compose-nginx.yml" up -d --build


