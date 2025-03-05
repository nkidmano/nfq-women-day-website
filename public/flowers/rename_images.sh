#!/bin/bash

# Change to the parent directory where all your flower folders are located
# cd /path/to/your/flower/folders

# Loop through each directory
for dir in */; do
  # Remove the trailing slash
  dir=${dir%/}

  # Extract the folder name without the number prefix
  folder_name=$(echo "$dir" | sed -E 's/^[0-9]+\.? *//')

  # Convert to lowercase, replace spaces with underscores, and remove special characters
  clean_name=$(echo "$folder_name" | tr '[:upper:]' '[:lower:]' | sed "s/'//g" | sed 's/[()]//g' | sed 's/ /_/g')

  # Count how many image files are in the directory
  count=1

  # Process each jpg file in the directory
  for img in "$dir"/*.jpg; do
    if [ -f "$img" ]; then
      # Create the new filename
      new_name="${clean_name}_${count}.jpg"

      # Rename the file
      mv "$img" "$dir/$new_name"

      echo "Renamed: $img -> $dir/$new_name"

      # Increment the counter
      ((count++))
    fi
  done
done

echo "All images have been renamed."