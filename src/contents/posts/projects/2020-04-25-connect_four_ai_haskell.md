---
title: Connect Four AI in Haskell
subtitle: A terminal-based Connect Four game with AI strategies using random, greedy, and minimax algorithms.
description: A Haskell implementation of Connect Four, featuring multiple AI strategies—including minimax with heuristics—for an interactive terminal-based game.
published: 2020-04-25
tags: [Haskell, AI, Minimax, Game]
category: Projects
licenseName: "Apache License 2.0"
cover: /posts/2020-04-25-connect_four_ai_haskell/cover.webp
coverPosition: top
author: Marc Monfort
sourceLink: "https://github.com/marcmonfort/ConnectFour"
draft: false
---

# Connect Four in Haskell 🎲

This project is a **Haskell implementation of the Connect Four game**. The game runs entirely in the terminal and supports both **human players** and an **AI opponent** with three different strategies:

- Random
- Greedy
- Smart (Minimax with heuristic evaluation)

<!-- <div style="display:flex;justify-content:center;">
  <img src="/posts/connectfour/screenshot_board.webp" alt="Gameplay screenshot of Connect Four in Haskell" style="width:100%;max-width:700px;border-radius:8px;" />
</div> -->

---

## Getting Started

### Prerequisites
- Haskell GHC compiler
- `random` package for AI moves

```bash
# Install compiler
sudo apt install ghc

# Install Cabal and random package
sudo apt install cabal-install
cabal update
cabal install random
````

### Compilation & Execution

```bash
ghc joc.hs
./joc
```

---

## Gameplay

When launching, the game prompts for **board size** (default: 6 rows × 7 columns) and **AI strategy**:

```bash
¡New Game!
————————————
 Board size:
   Rows    = 6
   Columns = 7

AI Strategies:
   1. random
   2. greedy
   3. smart
Choose strategy: 3
Difficulty (recommended 4 or 5) = 5
```

The board is drawn directly in the terminal, and turns alternate between player and AI.

---

## AI Strategies 🤖

### Greedy

The AI chooses the column that immediately maximizes its own connections or blocks the opponent from winning on the next move.

### Smart (Minimax + Heuristic)

The **minimax algorithm** builds a game tree of possible future board states up to a given depth.
At each layer:

* **AI’s turn** → maximize score
* **Opponent’s turn** → minimize score

The **heuristic function** evaluates non-terminal states (incomplete boards) to make the search practical.

---

## Heuristic Design 🧠

The heuristic measures **potential winning opportunities** for both players and assigns scores.

Key rules:

* +1000 if AI has already won (4 in a row)
* –1000 if opponent has already won
* +500 for a guaranteed two-turn win (open-ended three-in-a-row)
* +3 / +2 / +1 for three/two/one AI tokens in a potential four-slot window
* Mirror the same values as **negative** for the opponent

### Example 1: Immediate Win (must block)

```
    1   2   3   4   5   
  │   │   │   │   │   │
  ├───┼───┼───┼───┼───┤
  │   │   │ ○ │ ○ │   │
  ├───┼───┼───┼───┼───┤
  │   │ ● │ ● │ ● │   │
  ╰───┴───┴───┴───┴───╯
```

Opponent (●) threatens an immediate connect-four at column **5** → large negative score unless we block.

### Example 2: Open-Ended Three (forced win in 2)

```
    1   2   3   4   5   
  │   │   │   │   │   │
  ├───┼───┼───┼───┼───┤
  │   │   │ ○ │ ○ │   │
  ├───┼───┼───┼───┼───┤
  │   │ ● │ ● │ ● │   │
  ╰───┴───┴───┴───┴───╯
```

AI (○) has a “three with two open ends” → **+500** (second only to an immediate win).

### Example 3: Balanced Position

```
    1   2   3   4   5
  │   │   │   │   │   │
  ├───┼───┼───┼───┼───┤
  │   │ ○ │   │   │   │
  ├───┼───┼───┼───┼───┤
  │   │ ● │   │ ○ │   │
  ├───┼───┼───┼───┼───┤
  │   │ ● │ ○ │ ● │   │
  ╰───┴───┴───┴───┴───╯
```

Both sides have small threats → total close to **0**.

### Example 4: Forced Defense (vertical threat)

```
    1   2   3   4   5
  │   │   │   │   │   │
  ├───┼───┼───┼───┼───┤
  │   │   │   │ ● │   │
  ├───┼───┼───┼───┼───┤
  │   │   │ ● │ ○ │   │
  ├───┼───┼───┼───┼───┤
  │   │   │ ● │ ○ │   │
  ╰───┴───┴───┴───┴───╯
```

Opponent threatens a **vertical four** in column **3** → the heuristic strongly favors blocking moves.

---

## Minimax Tree 🌳

The highlighted path shows MIN (opponent) choosing the **worst for us** at each of its turns, and MAX (AI) then picking the **best of those**.

```
                [ MAX ]
                 /   \
         Move A /     \ Move B
               v       v
            [ MIN ]  [ MIN ]
             /   \    /   \
           +3   +500 -1000 +2

MIN under A → min(+3, +500)   = +3
MIN under B → min(-1000, +2)  = -1000
MAX at root → max(+3, -1000)  = +3  ⇒ choose Move A
```

<figcaption><strong>Figure.</strong> MAX root splits into Move A and Move B. MIN under Move A picks <em>min</em>(+3, +500) → +3. MIN under Move B picks <em>min</em>(-1000, +2) → -1000. Then MAX chooses <em>max</em>(+3, -1000) → Move A.</figcaption>
</figure>

---

## Technical Notes on Haskell ⚙️

* **Pure Functions & Immutability:** Board states are recreated functionally, not mutated.
* **Pattern Matching:** Cleanly encodes rules (valid moves, line checks, win detection).
* **Recursion & Higher-Order Functions:** Power the minimax traversal and window scans.
* **Randomness:** `System.Random` used for the `random` strategy with state threaded safely.

---

## Endgame Conditions

* **Win:** Four consecutive tokens aligned horizontally, vertically, or diagonally.
* **Loss:** AI wins with its alignment.
* **Draw:** The board fills with no winner.

<!-- <div style="display:flex;justify-content:center;">
  <img src="/posts/connectfour/screenshot_win.webp" alt="Player winning a Connect Four game" style="width:100%;max-width:700px;border-radius:8px;" />
</div> -->

---


GitHub Repository: [ConnectFour](https://github.com/marcmonfort/ConnectFour)

