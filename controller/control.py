import sqlite3
import os

dirname = os.path.dirname(__file__)
DB_FILE = os.path.join(dirname, "../shared/points.db")

contestants = ["Dax", "Latte", "RelaxingDragon", "Rory", "Takula", "Zingy"]

def main():
    print(list(zip(contestants, [0] * len(contestants))))
    con = sqlite3.connect(DB_FILE)
    db = con.cursor()
    db.execute("CREATE TABLE IF NOT EXISTS points (contestant TEXT PRIMARY KEY, score INTEGER NOT NULL);")
    db.executemany("INSERT OR IGNORE INTO points (contestant, score) VALUES (?, ?)", list(zip(contestants, [0] * len(contestants))))
    
    users = db.execute("SELECT * FROM points")
    print(users.fetchall())

if __name__ == "__main__":
    main()