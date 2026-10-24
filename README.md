# MarbleShift 🔮

> A kinetic 4×4 two-player strategic marble alignment game built with vanilla JavaScript, featuring dynamic perimeter-ring counter-clockwise board rotation after every turn.

[![Live Demo](https://img.shields.io/badge/Play%20Now-Live%20on%20GitHub%20Pages-success?style=for-the-badge&logo=github)](https://deekshi07.github.io/marble-Game/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Style-Glassmorphism%20CSS3-1572B6?logo=css3)](https://www.w3.org/Style/CSS/)

---

## 🎮 Game Concept & Rules

Unlike traditional Connect-4 or Tic-Tac-Toe, **MarbleShift** introduces a shifting topology mechanic:

1. **Grid Setup:** A 4×4 grid of 16 slots.
2. **Turn Placement:** Two players alternate placing their marble on any empty slot:
   - **Player 1:** Cyan Glowing Marble
   - **Player 2:** Rose Glowing Marble
3. **The Kinetic Twist (Outer Perimeter Shift):**
   - After each valid move, the **12 cells on the outer perimeter automatically shift 1 step counter-clockwise**.
   - The 4 center inner cells remain anchored in place.
   - Any marbles residing on the perimeter rotate to adjacent perimeter slots.
4. **Victory Condition:**
   - The first player to align **4 marbles in a continuous line** (horizontally, vertically, or diagonally) wins.
   - A line can be formed either directly upon placement OR triggered by the perimeter rotation!

---

## 🧠 Strategic Rotation Mechanics

The 12 perimeter cells are tracked through index mapping:

```
[0,0] → [0,1] → [0,2] → [0,3]
  ↑                       ↓
[1,0]   [1,1]   [1,2]   [1,3]
  ↑                       ↓
[2,0]   [2,1]   [2,2]   [2,3]
  ↑                       ↓
[3,0] ← [3,1] ← [3,2] ← [3,3]
```

Every turn, cell $(r, c)$ transfers its marble to the counter-clockwise neighbor, creating mind-bending tactical foresight where defensive plays can rotate into offensive winning strikes.

---

## 🚀 How to Play

### Online or Local Preview

1. **Clone the repository:**
   ```bash
   git clone https://github.com/deekshi07/marble-Game.git
   cd marble-Game
   ```
2. **Open directly in browser:**
   ```bash
   # On macOS
   open index.html
   # On Windows
   start index.html
   # Or serve with Python
   python -m http.server 3000
   ```

---

## 🛠️ Architecture & Implementation

| File | Role |
| :--- | :--- |
| `index.html` | Semantic markup with scoreboard pills, turn indicator, and responsive grid frame. |
| `index.css` | Glassmorphic dark styling, radial marble textures, pop-in keyframe animations, and rotation indicator. |
| `style.js` | 2D matrix state management, circular array shifting algorithm, win-condition matrix checks, and scorekeeping. |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
