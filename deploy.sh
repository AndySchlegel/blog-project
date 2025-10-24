#!/bin/bash

# Automated Deployment Script for Blog App on NAS
# This script pulls latest changes from main branch and rebuilds Docker containers

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Blog App Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "\n${YELLOW}[1/6]${NC} Current directory: $(pwd)"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not a git repository!${NC}"
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${YELLOW}[2/6]${NC} Current branch: $CURRENT_BRANCH"

# Switch to main if not already on it
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}Switching to main branch...${NC}"
    git checkout main
fi

# Stash any local changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}Stashing local changes...${NC}"
    git stash
fi

# Pull latest changes
echo -e "${YELLOW}[3/6]${NC} Pulling latest changes from origin/main..."
git pull origin main

# Show latest commit
LATEST_COMMIT=$(git log -1 --oneline)
echo -e "${GREEN}Latest commit: $LATEST_COMMIT${NC}"

# Navigate to blog-app directory
cd blog-app
echo -e "\n${YELLOW}[4/6]${NC} Navigating to blog-app directory..."

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}Error: docker-compose.yml not found!${NC}"
    exit 1
fi

# Stop containers
echo -e "${YELLOW}[5/6]${NC} Stopping Docker containers..."
docker compose down

# Build without cache
echo -e "${YELLOW}[6/6]${NC} Building Docker containers (this may take a few minutes)..."
docker compose build --no-cache

# Start containers in detached mode
echo -e "${YELLOW}Starting Docker containers...${NC}"
docker compose up -d

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"

# Show running containers
echo -e "\n${YELLOW}Running containers:${NC}"
docker compose ps

echo -e "\n${YELLOW}To view logs, run:${NC}"
echo -e "  cd $SCRIPT_DIR/blog-app && docker compose logs -f"

echo -e "\n${GREEN}Blog app should now be available at blog-app.his4irness23.de${NC}"
