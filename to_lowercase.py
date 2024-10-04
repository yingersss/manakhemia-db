import os

def rename_files_to_lowercase(directory):
    for filename in os.listdir(directory):
        lowercase_filename = filename.lower()
        if filename != lowercase_filename:
            os.rename(
                os.path.join(directory, filename),
                os.path.join(directory, lowercase_filename)
            )
            print(f'Renamed: {filename} -> {lowercase_filename}')

if __name__ == "__main__":
    directory = input("Enter the directory path: ")
    rename_files_to_lowercase(directory)