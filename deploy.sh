#!/bin/bash

# Personal Blog Deployment Script
# Usage: ./deploy.sh "commit message"

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Check if commit message is provided
if [ -z "$1" ]; then
    COMMIT_MSG="Deploy: Update blog $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="Deploy: $1"
fi

echo "📦 Building React app..."
npm run build

echo "📁 Copying build files to root..."
cp -r build/* .
rm -rf build

echo "📝 Committing changes..."
git add .
git commit -m "$COMMIT_MSG"

echo "🌐 Pushing to GitHub..."
git push origin master

echo "✅ Deployment completed successfully!"
echo "🔗 Your site will be available at: https://ksungz.github.io"
echo "⏰ GitHub Pages may take a few minutes to update." 