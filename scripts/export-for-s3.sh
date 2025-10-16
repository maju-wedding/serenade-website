#!/bin/bash

# Copy static build output to out directory for S3 deployment
echo "📦 Preparing static files for S3 deployment..."

# Remove existing out directory
rm -rf out

# Create out directory
mkdir -p out

# Copy all static files from .next/static to out/_next/static
if [ -d ".next/static" ]; then
  mkdir -p out/_next
  cp -r .next/static out/_next/
  echo "✅ Copied static assets"
fi

# Copy HTML files from .next/server/app to out
if [ -d ".next/server/app" ]; then
  # Copy static HTML files
  find .next/server/app -name "*.html" | while read file; do
    # Get relative path
    rel_path=${file#.next/server/app/}
    # Create directory structure
    mkdir -p "out/$(dirname "$rel_path")"
    # Copy file
    cp "$file" "out/$rel_path"
  done
  echo "✅ Copied HTML files"
fi

# Copy public assets
if [ -d "public" ]; then
  cp -r public/* out/
  echo "✅ Copied public assets"
fi

echo "🎉 Export completed! Files are ready in the 'out' directory."