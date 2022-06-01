#!/bin/bash

# Starting all the services together is leading to some issues with fusion auth
# Fusion auth is not able to acquire the lock and a restart is required for the system
docker-compose up -d fa-db
sleep 10
docker-compose up -d fa-search
sleep 10
docker-compose up -d fusionauth
