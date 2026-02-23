#!/bin/bash



MAX_SIZE=1920



# Recursively find all .jpg and .jpeg files from current directory

find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do

    echo "Processing: $file"

    tmp="${file}.tmp"

    # Resize, strip metadata, make progressive, set quality

    convert "$file" -resize "${MAX_SIZE}x${MAX_SIZE}>" -strip -interlace Plane -quality 85 "$tmp"

    if [ -f "$tmp" ]; then

        mv "$tmp" "$file"

        echo "Updated: $file"

    else

        echo "Failed: $file"

    fi

done



echo "All images processed!"
