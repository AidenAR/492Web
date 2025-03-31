#!/bin/bash

echo "Starting deployment to GitHub Pages..."

# Switch to gh-pages branch
git checkout gh-pages || { echo " Failed to switch to gh-pages"; exit 1; }

# Copy updated static files from captchaP/public to root
echo "📁 Copying updated files..."
cp -r captchaP/public/. .

# Commit and push
git add .
git commit -m "Deploy update on $(date)"
git push origin gh-pages

# Switch back to main (or whatever your dev branch is)
git checkout main

echo "Deployment complete! Visit: https://aidenar.github.io/492Web/"
