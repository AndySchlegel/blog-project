#!/bin/bash

# Git Deploy Script - Merge developer to main and push
# Usage: ./git-deploy.sh "Your commit message"

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Git Deploy Script${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check if commit message is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Commit message required${NC}"
    echo -e "${YELLOW}Usage: ./git-deploy.sh \"Your commit message\"${NC}"
    exit 1
fi

COMMIT_MESSAGE="$1"

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not a git repository${NC}"
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}Current branch:${NC} $CURRENT_BRANCH"

# Ensure we're on developer branch
if [ "$CURRENT_BRANCH" != "developer" ]; then
    echo -e "${YELLOW}Switching to developer branch...${NC}"
    git checkout developer
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}Uncommitted changes detected${NC}"
    echo ""
    git status --short
    echo ""

    # Add all changes
    echo -e "${YELLOW}Adding all changes...${NC}"
    git add .

    # Create commit
    echo -e "${YELLOW}Creating commit...${NC}"
    git commit -m "$COMMIT_MESSAGE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

    echo -e "${GREEN}✓ Changes committed${NC}"
else
    echo -e "${GREEN}✓ No uncommitted changes${NC}"
fi

# Push to developer
echo ""
echo -e "${YELLOW}Pushing to origin/developer...${NC}"
git push origin developer
echo -e "${GREEN}✓ Pushed to developer${NC}"

# Switch to main
echo ""
echo -e "${YELLOW}Switching to main branch...${NC}"
git checkout main

# Pull latest main
echo -e "${YELLOW}Pulling latest main...${NC}"
git pull origin main

# Merge developer into main
echo -e "${YELLOW}Merging developer into main...${NC}"
git merge developer

# Push to main
echo -e "${YELLOW}Pushing to origin/main...${NC}"
git push origin main
echo -e "${GREEN}✓ Pushed to main${NC}"

# Switch back to developer
echo ""
echo -e "${YELLOW}Switching back to developer...${NC}"
git checkout developer

# Summary
echo ""
echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo -e "${BLUE}================================${NC}"
echo ""
echo -e "${GREEN}Changes have been:${NC}"
echo -e "  • Committed to developer"
echo -e "  • Pushed to origin/developer"
echo -e "  • Merged to main"
echo -e "  • Pushed to origin/main"
echo ""
echo -e "${YELLOW}GitHub Actions should now be deploying to your NAS${NC}"
echo ""
