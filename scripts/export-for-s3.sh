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

# Copy HTML files from .next/server/app to out with proper S3 structure
if [ -d ".next/server/app" ]; then
  # Copy static HTML files
  find .next/server/app -name "*.html" | while read file; do
    # Get relative path
    rel_path=${file#.next/server/app/}
    
    # Handle root index.html
    if [ "$rel_path" = "index.html" ]; then
      cp "$file" "out/index.html"
    else
      # Remove .html extension and create directory structure
      dir_name=${rel_path%.html}
      mkdir -p "out/$dir_name"
      cp "$file" "out/$dir_name/index.html"
    fi
  done
  echo "✅ Copied HTML files with S3 directory structure"
fi

# Copy public assets
if [ -d "public" ]; then
  cp -r public/* out/
  echo "✅ Copied public assets"
fi

echo "🎉 Export completed! Files are ready in the 'out' directory."
echo "📁 Directory structure:"
find out -type f -name "index.html" | head -10