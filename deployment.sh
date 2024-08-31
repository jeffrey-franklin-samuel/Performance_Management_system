#!/bin/bash

# Exit script on error
set -e

# Command 1: Pull the latest changes from the repository
echo "Pulling latest changes from Git repository..."
git pull origin main

# Command 2: Install dependencies
echo "Installing dependencies..."
npm install

# Command 3: Build the project
echo "Building the project..."
npm run build

echo "Deployment complete!"
