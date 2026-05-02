from logging import root
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
    
    users = db.execute("SELECT * FROM points").fetchall()

    conn.commit()

    return [list(user) for user in users]

def add_point(userIndex, users, strings):
    users[userIndex][1] += 1
    strings[userIndex].set(users[userIndex][1])

def subtract_point(userIndex, users, strings):
    users[userIndex][1] -= 1
    strings[userIndex].set(users[userIndex][1])

def save(users):
    print("save")

def window_init(users):
    root = Tk()
    root.title("Game Changer - Points Controller")

    strings = [StringVar(value=str(user[1])) for user in users]

    mainframe = ttk.Frame(root, padding=(3, 3, 3, 3))
    mainframe.grid(column=0, row=0, sticky=(N, W, E, S))

    for i in range(0, len(users)):
        ttk.Label(mainframe, text=users[i][0]).grid(column=0, row=i)
        ttk.Label(mainframe, textvariable=strings[i]).grid(column=1, row=i)
        ttk.Button(mainframe, text="^", command=lambda i=i: add_point(i, users, strings)).grid(column=2, row=i)
        ttk.Button(mainframe, text="v", command=lambda i=i: subtract_point(i, users, strings)).grid(column=3, row=i)

    ttk.Button(mainframe, text="Save", command=lambda: save(users)).grid(column=0, row=len(users) + 1, columnspan=4)

    return root


def main():
    users = db_init()
    print(users)
    root = window_init(users)
    root.mainloop()

if __name__ == "__main__":
    main()