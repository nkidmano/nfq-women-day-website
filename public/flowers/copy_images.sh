#!/bin/bash

# Change to the parent directory where all your flower folders are located
# cd /path/to/your/flower/folders

# Create a directory to store all images at the same level as the folders
# Uncomment if you want to put the images in a separate directory
# mkdir -p all_images

# Loop through each directory and copy all image files to parent directory
for dir in */; do
  if [ -d "$dir" ]; then
    # Process each jpg file in the directory
    for img in "$dir"*.jpg; do
      if [ -f "$img" ]; then
        # Get the base filename
        base_name=$(basename "$img")

        # Copy the file to the parent directory
        # If you want to use the all_images directory, change to: cp "$img" "all_images/$base_name"
        cp "$img" "./$base_name"

        echo "Copied: $img -> ./$base_name"
      fi
    done
  fi
done

# Check for potential filename conflicts
duplicate_check=$(find . -maxdepth 1 -type f -name "*.jpg" | awk -F/ '{print $NF}' | sort | uniq -d)
if [ ! -z "$duplicate_check" ]; then
  echo "Warning: Possible duplicate filenames detected. You might want to run the rename script first."
  echo "Duplicates: $duplicate_check"
fi

echo "All images have been copied to the parent directory."