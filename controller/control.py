import os
import random
import sqlite3

dirname = os.path.dirname(__file__)
DB_FILE = os.path.join(dirname, "../shared/points.db")

contestants = ["Dax", "Latte", "RelaxingDragon", "Rory", "Takula", "Zingy"]

def main():
    conn = sqlite3.connect(DB_FILE)
    db = conn.cursor()
    db.execute("CREATE TABLE IF NOT EXISTS points (contestant TEXT PRIMARY KEY, score INTEGER NOT NULL);")
    db.executemany("INSERT OR IGNORE INTO points (contestant, score) VALUES (?, ?)", list(zip(contestants, [0] * len(contestants))))

    db.executemany("UPDATE points SET score = ? WHERE contestant = ?", list(zip(random.sample(range(-999, 9999), len(contestants)), contestants)))
    
    users = db.execute("SELECT * FROM points")
    print(users.fetchall())

    conn.commit()

if __name__ == "__main__":
    main()