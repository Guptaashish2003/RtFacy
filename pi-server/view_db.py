import sqlite3
import os

def view_data():
    db_path = 'vista.db'
    if not os.path.exists(db_path):
        print(f"Database file '{db_path}' not found. Have you started the server yet?")
        return

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get the table name
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"Tables in database: {[t[0] for t in tables]}")

        if not tables:
            print("No tables found. Database might be empty.")
            return

        # Fetch latest ROI records
        print("\n--- Latest 10 Face Detections ---")
        print(f"{'ID':<5} | {'X':<5} | {'Y':<5} | {'Width':<7} | {'Height':<8} | {'Timestamp'}")
        print("-" * 65)
        
        cursor.execute("SELECT id, x_min, y_min, width, height, timestamp FROM rois ORDER BY timestamp DESC LIMIT 10")
        rows = cursor.fetchall()
        
        for row in rows:
            print(f"{row[0]:<5} | {row[1]:<5} | {row[2]:<5} | {row[3]:<7} | {row[4]:<8} | {row[5]}")
            
        conn.close()
    except Exception as e:
        print(f"Error reading database: {e}")

if __name__ == "__main__":
    view_data()
