import tkinter as tk
from tkinter import messagebox
import subprocess
import os

# File path
FILE_PATH = r"C:\Users\bovin\Documents\Web projects\leader_board\src\config\constants.ts"
REPO_DIR = os.path.dirname(os.path.dirname(FILE_PATH))  # Points to 'leader_board' repo

# Update constants.ts content
def update_constants():
    try:
        pool_price = entry_pool_price.get()
        price_per_hour = entry_price_per_hour.get()

        if not pool_price.isdigit() or not price_per_hour.isdigit():
            messagebox.showerror("Invalid Input", "Please enter valid numbers.")
            return

        new_content = f"""export const PRICE_CONFIG = {{
  POOL_PRICE: {pool_price},
  PRICE_PER_HOUR: {price_per_hour}
}} as const; 
"""

        with open(FILE_PATH, 'w') as file:
            file.write(new_content)

        messagebox.showinfo("Success", "Constants updated successfully.")
    except Exception as e:
        messagebox.showerror("Error", str(e))

# Open file in Notepad
def open_in_notepad():
    try:
        subprocess.Popen(['notepad.exe', FILE_PATH])
    except Exception as e:
        messagebox.showerror("Error", f"Failed to open file: {str(e)}")

# Commit and push using git
def git_commit_and_push():
    try:
        commit_msg = f"Update constants.ts"
        subprocess.run(['git', 'add', FILE_PATH], cwd=REPO_DIR, check=True)
        subprocess.run(['git', 'commit', '-m', commit_msg], cwd=REPO_DIR, check=True)
        subprocess.run(['git', 'push'], cwd=REPO_DIR, check=True)
        messagebox.showinfo("Success", "Changes pushed to GitHub.")
    except subprocess.CalledProcessError as e:
        messagebox.showerror("Git Error", f"Git command failed: {e}")
    except Exception as e:
        messagebox.showerror("Error", str(e))

# GUI setup
root = tk.Tk()
root.title("Update PRICE_CONFIG")

tk.Label(root, text="POOL_PRICE:").grid(row=0, column=0, padx=10, pady=5, sticky="e")
entry_pool_price = tk.Entry(root)
entry_pool_price.grid(row=0, column=1, padx=10, pady=5)

tk.Label(root, text="PRICE_PER_HOUR:").grid(row=1, column=0, padx=10, pady=5, sticky="e")
entry_price_per_hour = tk.Entry(root)
entry_price_per_hour.grid(row=1, column=1, padx=10, pady=5)

tk.Button(root, text="Submit", command=update_constants).grid(row=2, column=0, columnspan=2, pady=10)
tk.Button(root, text="Open in Notepad", command=open_in_notepad).grid(row=3, column=0, columnspan=2, pady=5)
tk.Button(root, text="Commit and Push", command=git_commit_and_push).grid(row=4, column=0, columnspan=2, pady=5)

root.mainloop()
