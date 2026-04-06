# Day 3: Mini Piano

![Complete Circuit Diagram](/images/day3.png)

## Introduction

Welcome to Day 3! Today we're building something musical - a **mini piano** using push buttons and a buzzer. Each button will play a different musical note, letting you create your own melodies.

**What you'll learn:**
- Generating tones and frequencies with Arduino
- Working with multiple button inputs
- Understanding musical notes as frequencies
- Building a multi-input system
- Creating interactive sound projects

**Project Goal:** Build a 7-key piano that plays the notes C, D, E, F, G, A, and B using push buttons and a buzzer.

---

## Understanding the Mechanics

### How It Works

The mini piano is beautifully simple:

1. **Input:** Each push button acts as a piano key
2. **Processing:** Arduino detects which button is pressed
3. **Output:** Buzzer plays the corresponding musical note

**The Magic:** Different musical notes are just different **frequencies**. When we make the buzzer vibrate at specific rates, we get different pitches:
- Low notes = slower vibrations (lower frequency)
- High notes = faster vibrations (higher frequency)

> *[Insert Piano Key Diagram here]*

### Musical Notes as Frequencies

Here are the frequencies for our 7 notes:

| Note | Frequency (Hz) | Piano Key |
|------|----------------|-----------|
| C    | 262 Hz        | Do        |
| D    | 294 Hz        | Re        |
| E    | 330 Hz        | Mi        |
| F    | 349 Hz        | Fa        |
| G    | 392 Hz        | Sol       |
| A    | 440 Hz        | La        |
| B    | 494 Hz        | Ti        |

**Fun fact:** The note A (440 Hz) is the standard tuning note used by orchestras worldwide!

---

## Materials Needed

**Hardware:**
- Arduino Uno board
- Breadboard
- Jumper wires

**Components:**
- 7x Push buttons (one for each note)
- 1x Buzzer
- 7x 1K ohm resistors (for button pull-downs)

---

## Circuit Assembly

### Step 1: Set Up Power Rails

Let's prepare the breadboard:

1. Connect **GND** from Arduino to the **negative rail** (ground) on breadboard
2. Connect **5V** from Arduino to the **positive rail** on breadboard

---

### Step 2: Place the Buttons

Now let's add all seven buttons in a row:

1. Place the **7 buttons** across the breadboard, leaving space between each
2. Make sure each button straddles the middle gap of the breadboard
3. Arrange them in order (this will be your piano keyboard!)


**Tip:** Place them in a line to make it feel like a real piano keyboard.

---

### Step 3: Connect Button Grounds

Each button needs to be grounded with a pull-down resistor:

For **each button:**
1. Connect one side of the button to **5V** (positive rail)
2. On the same side, add a **1K resistor** connecting to **GND** (negative rail)
3. The opposite side of the button will connect to Arduino digital pins

This creates a pull-down resistor configuration, just like in Day 1!


---

### Step 4: Connect Buttons to Arduino

Now let's connect each button to its own digital pin:

**Pin assignments (from left to right on your breadboard):**
- Button 1 (Note C) → **Pin 4**
- Button 2 (Note D) → **Pin 5**
- Button 3 (Note E) → **Pin 6**
- Button 4 (Note F) → **Pin 7**
- Button 5 (Note G) → **Pin 8**
- Button 6 (Note A) → **Pin 9**
- Button 7 (Note B) → **Pin 10**

Connect a wire from the **opposite side** of each button to its corresponding pin.

**Why these pins?** They're sequential and easy to remember. Plus, we're saving pins 0-1 (used for Serial) and keeping higher pins available for other components.

---

### Step 5: Connect the Buzzer

Finally, let's add the buzzer:

1. Place buzzer on breadboard
2. Connect **(-) negative pin** to **GND** rail
3. Connect **(+) positive pin** to **Pin 11**


**Complete Circuit Overview:**
- 7 buttons on pins 4-10
- 1 buzzer on pin 11
- All buttons grounded through pull-down resistors
- Power and ground rails distributed

![Complete Circuit Diagram](/images/day3.png)

---

## Writing the Code

Let's build the piano code step by step!

### Step 1: Define the Pins

First, let's set up our pin assignments and note frequencies:

```cpp
// Button pins (C, D, E, F, G, A, B)
const int buttonC = 4;
const int buttonD = 5;
const int buttonE = 6;
const int buttonF = 7;
const int buttonG = 8;
const int buttonA = 9;
const int buttonB = 10;

// Buzzer pin
const int buzzer = 11;

// Note frequencies in Hz
const int noteC = 262;
const int noteD = 294;
const int noteE = 330;
const int noteF = 349;
const int noteG = 392;
const int noteA = 440;
const int noteB = 494;
```

**Note:** Using descriptive variable names makes the code much easier to read and maintain!

---

### Step 2: Setup Function

Initialize all the pins:

```cpp
void setup() {
  // Set all button pins as inputs
  pinMode(buttonC, INPUT);
  pinMode(buttonD, INPUT);
  pinMode(buttonE, INPUT);
  pinMode(buttonF, INPUT);
  pinMode(buttonG, INPUT);
  pinMode(buttonA, INPUT);
  pinMode(buttonB, INPUT);
  
  // Set buzzer pin as output
  pinMode(buzzer, OUTPUT);
  
  Serial.begin(9600);
  Serial.println("Mini Piano Ready!");
}
```

---

### Step 3: Understanding tone()

Arduino has a built-in function for generating tones: `tone()`

**Syntax:**
```cpp
tone(pin, frequency);           // Play tone continuously
tone(pin, frequency, duration); // Play tone for specific time
noTone(pin);                    // Stop the tone
```

**Example:**
```cpp
tone(buzzer, 440);    // Play note A (440 Hz)
delay(1000);          // Keep playing for 1 second
noTone(buzzer);       // Stop the sound
```

This is much easier than manually turning the buzzer on/off at specific intervals!

---

### Step 4: Basic Single Note Test

Let's test with one button first:

```cpp
void loop() {
  // Check if C button is pressed
  if (digitalRead(buttonC) == HIGH) {
    tone(buzzer, noteC);  // Play note C
    Serial.println("Playing C");
  } else {
    noTone(buzzer);       // Stop sound when button released
  }
}
```

**Test it:** Upload this code and press the first button. You should hear note C!

---

### Step 5: Adding All Notes

Now let's add all seven buttons:

```cpp
void loop() {
  // Check each button and play corresponding note
  if (digitalRead(buttonC) == HIGH) {
    tone(buzzer, noteC);
    Serial.println("Playing C");
  }
  else if (digitalRead(buttonD) == HIGH) {
    tone(buzzer, noteD);
    Serial.println("Playing D");
  }
  else if (digitalRead(buttonE) == HIGH) {
    tone(buzzer, noteE);
    Serial.println("Playing E");
  }
  else if (digitalRead(buttonF) == HIGH) {
    tone(buzzer, noteF);
    Serial.println("Playing F");
  }
  else if (digitalRead(buttonG) == HIGH) {
    tone(buzzer, noteG);
    Serial.println("Playing G");
  }
  else if (digitalRead(buttonA) == HIGH) {
    tone(buzzer, noteA);
    Serial.println("Playing A");
  }
  else if (digitalRead(buttonB) == HIGH) {
    tone(buzzer, noteB);
    Serial.println("Playing B");
  }
  else {
    noTone(buzzer);  // No button pressed, silence
  }
}
```

**How it works:**
- We use `else if` statements to check each button in order
- When a button is pressed, we play its note
- If no buttons are pressed, we stop the sound
- Serial output helps us debug and see which notes are playing

---

### Full Basic Code

Here's the complete mini piano:

```cpp
/*
  Mini Piano - 7 Keys
  Plays musical notes C, D, E, F, G, A, B
*/

// Button pins
const int buttonC = 4;
const int buttonD = 5;
const int buttonE = 6;
const int buttonF = 7;
const int buttonG = 8;
const int buttonA = 9;
const int buttonB = 10;

// Buzzer pin
const int buzzer = 11;

// Note frequencies (in Hz)
const int noteC = 262;
const int noteD = 294;
const int noteE = 330;
const int noteF = 349;
const int noteG = 392;
const int noteA = 440;
const int noteB = 494;

void setup() {
  // Initialize button pins
  pinMode(buttonC, INPUT);
  pinMode(buttonD, INPUT);
  pinMode(buttonE, INPUT);
  pinMode(buttonF, INPUT);
  pinMode(buttonG, INPUT);
  pinMode(buttonA, INPUT);
  pinMode(buttonB, INPUT);
  
  // Initialize buzzer
  pinMode(buzzer, OUTPUT);
  
  Serial.begin(9600);
  Serial.println("=== MINI PIANO ===");
  Serial.println("Press buttons to play notes!");
}

void loop() {
  // Check which button is pressed and play corresponding note
  if (digitalRead(buttonC) == HIGH) {
    tone(buzzer, noteC);
    Serial.println("C");
  }
  else if (digitalRead(buttonD) == HIGH) {
    tone(buzzer, noteD);
    Serial.println("D");
  }
  else if (digitalRead(buttonE) == HIGH) {
    tone(buzzer, noteE);
    Serial.println("E");
  }
  else if (digitalRead(buttonF) == HIGH) {
    tone(buzzer, noteF);
    Serial.println("F");
  }
  else if (digitalRead(buttonG) == HIGH) {
    tone(buzzer, noteG);
    Serial.println("G");
  }
  else if (digitalRead(buttonA) == HIGH) {
    tone(buzzer, noteA);
    Serial.println("A");
  }
  else if (digitalRead(buttonB) == HIGH) {
    tone(buzzer, noteB);
    Serial.println("B");
  }
  else {
    noTone(buzzer);  // Stop sound when no button pressed
  }
}
```

<!-- 📥 **[Download complete code: day3.ino](/code/day3.ino)** -->

**Congratulations, you're now Beethoven!**

---

## Challenge: Play a Song

Now that you have a working piano, can you program it to play a song automatically?

### The Goal

Make the Arduino play "Twinkle Twinkle Little Star" (or any song of your choice) when you press a special trigger button.

### Song Structure

"Twinkle Twinkle Little Star" uses these notes:
```
C C G G A A G
F F E E D D C
G G F F E E D
G G F F E E D
C C G G A A G
F F E E D D C
```

### Hints

1. Create a new button for "Play Song" mode (add another button on pin 3)
2. Create arrays to store the melody and note durations:
```cpp
int melody[] = {noteC, noteC, noteG, noteG, noteA, noteA, noteG, ...};
int noteDurations[] = {4, 4, 4, 4, 4, 4, 2, ...};  // 4 = quarter note, 2 = half note
```

3. Use a `for` loop to play through the arrays:
```cpp
for (int i = 0; i < numberOfNotes; i++) {
  int duration = 1000 / noteDurations[i];
  tone(buzzer, melody[i], duration);
  delay(duration * 1.3);  // Pause between notes
}
```

4. Keep the manual play mode working too!

<details>
<summary>Click to reveal solution</summary>

```cpp
// Add to global variables
const int playSongButton = 3;

// Twinkle Twinkle Little Star melody
int melody[] = {
  noteC, noteC, noteG, noteG, noteA, noteA, noteG,
  noteF, noteF, noteE, noteE, noteD, noteD, noteC
};

int noteDurations[] = {
  4, 4, 4, 4, 4, 4, 2,  // Twinkle twinkle little star
  4, 4, 4, 4, 4, 4, 2   // How I wonder what you are
};

void setup() {
  // ... existing setup code ...
  pinMode(playSongButton, INPUT);
}

void loop() {
  // Check for song button first
  if (digitalRead(playSongButton) == HIGH) {
    playSong();
    delay(500);  // Debounce
    return;      // Skip manual mode while song plays
  }
  
  // ... existing manual piano code ...
}

void playSong() {
  Serial.println("Playing: Twinkle Twinkle Little Star");
  
  int numberOfNotes = sizeof(melody) / sizeof(melody[0]);
  
  for (int i = 0; i < numberOfNotes; i++) {
    int duration = 1000 / noteDurations[i];
    tone(buzzer, melody[i], duration);
    
    // Pause between notes (slight overlap for smooth sound)
    int pauseBetweenNotes = duration * 1.3;
    delay(pauseBetweenNotes);
    
    noTone(buzzer);
  }
  
  Serial.println("Song finished!");
}
```

**How it works:**
- The `melody[]` array stores the sequence of notes
- The `noteDurations[]` array stores how long each note plays (4 = quarter note, 2 = half note)
- The `playSong()` function loops through both arrays using a `for` loop
- `sizeof(melody) / sizeof(melody[0])` calculates the number of notes automatically
- We add a small pause between notes for a more natural sound

**Challenge extension:** Add more songs! Create different trigger buttons for different melodies.

</details>

---

## Advanced: Cleaner Code with Arrays

Our current code works, but it's repetitive. Can we make it cleaner using arrays and loops?

### The Problem

We're checking 7 buttons individually with nearly identical code. This is hard to maintain and doesn't scale well.

### The Solution: Arrays

Instead of 7 separate variables, we can use arrays:

```cpp
// Arrays for pins and frequencies
const int buttonPins[] = {4, 5, 6, 7, 8, 9, 10};
const int notes[] = {262, 294, 330, 349, 392, 440, 494};
const int numKeys = 7;

void setup() {
  pinMode(buzzer, OUTPUT);
  
  // Initialize all button pins in a loop
  for (int i = 0; i < numKeys; i++) {
    pinMode(buttonPins[i], INPUT);
  }
  
  Serial.begin(9600);
  Serial.println("Mini Piano Ready!");
}

void loop() {
  bool buttonPressed = false;
  
  // Check all buttons in a loop
  for (int i = 0; i < numKeys; i++) {
    if (digitalRead(buttonPins[i]) == HIGH) {
      tone(buzzer, notes[i]);
      buttonPressed = true;
      break;  // Stop checking once we find a pressed button
    }
  }
  
  // If no buttons pressed, stop sound
  if (!buttonPressed) {
    noTone(buzzer);
  }
}
```

**Benefits:**
- Much shorter code
- Easy to add more keys (just expand the arrays)
- Easier to maintain and debug
- Professional programming practice

**Trade-off:** Slightly harder to understand for beginners, but worth learning!

---

## Understanding Musical Frequencies

Want to expand your piano? Here are more note frequencies:

### Extended Scale (Two Octaves)

| Note | Frequency (Hz) | Octave |
|------|----------------|--------|
| C    | 131 Hz        | Low C  |
| D    | 147 Hz        | Low D  |
| E    | 165 Hz        | Low E  |
| F    | 175 Hz        | Low F  |
| G    | 196 Hz        | Low G  |
| A    | 220 Hz        | Low A  |
| B    | 247 Hz        | Low B  |
| C    | 262 Hz        | Middle C |
| D    | 294 Hz        | Middle D |
| E    | 330 Hz        | Middle E |
| F    | 349 Hz        | Middle F |
| G    | 392 Hz        | Middle G |
| A    | 440 Hz        | Middle A |
| B    | 494 Hz        | Middle B |
| C    | 523 Hz        | High C |

**Pattern:** Each octave up doubles the frequency. Middle C (262 Hz) → High C (524 Hz).

You can add these to create a 2-octave piano with more buttons!

---

## Final Pin Configuration

**Summary of all connections:**

| Component | Pin | Function |
|-----------|-----|----------|
| Button C  | 4   | Play note C (262 Hz) |
| Button D  | 5   | Play note D (294 Hz) |
| Button E  | 6   | Play note E (330 Hz) |
| Button F  | 7   | Play note F (349 Hz) |
| Button G  | 8   | Play note G (392 Hz) |
| Button A  | 9   | Play note A (440 Hz) |
| Button B  | 10  | Play note B (494 Hz) |
| Buzzer    | 11  | Audio output |

All buttons also connect to 5V and GND through pull-down resistors.

> *[Insert Complete Wiring Reference here]*

---

## Next Steps

Congratulations! You've completed Day 3 and learned:
- Generating tones with `tone()` and `noTone()`
- Working with multiple button inputs
- Understanding musical notes as frequencies
- Building multi-input interactive systems
- Using arrays to clean up repetitive code
- Creating melody sequences with arrays

**Possible Extensions:**
- Add more octaves (higher and lower notes)
- Create a recording mode (save and replay melodies)
- Add LEDs that light up when notes play
- Build a drum machine with different percussion sounds
- Connect a potentiometer to adjust the octave

You've completed our core introductory Arduino week curriculum! 

**Ready for Day 4?** We'll explore RF foundations and build an Arduino antenna!