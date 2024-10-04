import os

# Get the current working directory
directory = os.getcwd()

# Loop through each file in the directory
for filename in os.listdir(directory):
    # Check if the filename contains "_A9"
    if "_A9" in filename:
        # Create the new filename by removing "_A9"
        new_filename = filename.replace("_A9", "")
        # Get the full path for the old and new filenames
        old_file = os.path.join(directory, filename)
        new_file = os.path.join(directory, new_filename)
        # Rename the file
        os.rename(old_file, new_file)
        print(f'Renamed: {old_file} to {new_file}')