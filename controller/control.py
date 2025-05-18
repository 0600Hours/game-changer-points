import os
import random
import sqlite3
from tkinter import *
from tkinter import ttk

dirname = os.path.dirname(__file__)
DB_FILE = os.path.join(dirname, "../shared/points.db")

contestants = ["Dax", "Latte", "RelaxingDragon", "Rory", "Takula", "Zingy"]

def db_init():
    conn = sqlite3.connect(DB_FILE)
    db = conn.cursor()
    db.execute("CREATE TABLE IF NOT EXISTS points (contestant TEXT PRIMARY KEY, score INTEGER NOT NULL);")
    db.executemany("INSERT OR IGNORE INTO points (contestant, score) VALUES (?, ?)", list(zip(contestants, [0] * len(contestants))))

    # db.executemany("UPDATE points SET score = ? WHERE contestant = ?", list(zip(random.sample(range(-999, 9999), len(contestants)), contestants)))
    
    users = db.execute("SELECT * FROM points")
    print(users.fetchall())

    conn.commit()

def window_init():
    root = Tk()
    root.title("Game Changer - Points Controller")

    frame = ttk.Frame(root, padding="10", relief="raised", borderwidth=5)
    frame.grid(column=0, row=0, sticky=(N, E, S, W))
    root.columnconfigure(0, weight=1)
    root.rowconfigure(0, weight=1)

    score_frame = ttk.Frame(frame, padding="10", relief="raised", borderwidth=5)
    score_frame.grid(column=0, row=0, sticky=(N, E, S, W))
    score_frame.columnconfigure(0, weight=1)
    score_frame.rowconfigure(0, weight=1)
    control_frame = ttk.Frame(frame, padding="10", relief="raised", borderwidth=5)
    control_frame.grid(column=1, row=0, sticky=(N, E, S, W))
    control_frame.columnconfigure(0, weight=1)
    control_frame.rowconfigure(0, weight=1)

    ttk.Label(score_frame, text="scores here").grid(column=0, row=0)
    ttk.Label(control_frame, text="controls here").grid(column=0, row=0)

    return root


def main():
    root = window_init()
    root.mainloop()

if __name__ == "__main__":
    main()