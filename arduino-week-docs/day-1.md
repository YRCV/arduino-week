# Day 1: Arduino Basics

## Introduction

Welcome to Arduino Week Day 1! Today, you'll learn the fundamentals of Arduino programming and build your first interactive circuit. By the end of this session, you'll understand how to control LEDs with buttons and write basic Arduino code.

**What you'll learn:**
- Understanding Arduino board pins and their functions
- Core Arduino programming concepts
- Building circuits with LEDs and buttons
- Reading digital inputs and controlling outputs

---

## Understanding Arduino Pins

The Arduino Uno board has several types of pins that serve different purposes:

> *[Insert Arduino Uno Pinout Diagram here]*

### Power Pins
- **IOREF**: Reference voltage for the board
- **RESET**: Reset the microcontroller
- **3.3V**: 3.3V power output
- **5V**: 5V power output
- **GND**: Ground pins (multiple available)
- **VIN**: Input voltage to Arduino board

### Analog Input Pins (A0-A5)
- Read analog sensors (0-1023 values)
- Can also be used as digital pins

### Digital Pins (0-13)
- Read digital inputs (HIGH/LOW)
- Write digital outputs (HIGH/LOW)
- Pins marked with **~** support PWM (Pulse Width Modulation)

### Communication Pins
- **TX/RX**: Serial communication
- **SDA/SCL**: I2C communication
- **MOSI/MISO/SCK**: SPI communication

---

## Coding Fundamentals

Arduino programming is based on C/C++ with some variations. Here are the core functions you'll use:

### Essential Functions

**Communication with Computer:**
```cpp
Serial.begin(9600);  // Initialize serial communication at 9600 baud rate
Serial.println();    // Print data to serial monitor (great for debugging!)
```

**Pin Configuration:**
```cpp
pinMode(pin#, OUTPUT);  // Set a pin as OUTPUT (to control something)
pinMode(pin#, INPUT);   // Set a pin as INPUT (to read from something)
```

**Digital Control:**
```cpp
digitalWrite(pin#, HIGH);  // Turn pin ON (5V)
digitalWrite(pin#, LOW);   // Turn pin OFF (0V)
digitalRead(pin#);         // Read the state of an input pin
```

**Timing:**
```cpp
delay(milliseconds);  // Pause program execution (1000ms = 1 second)
```

### Program Structure

Every Arduino sketch has two main functions:

```cpp
void setup() {
  // Runs ONCE when the Arduino starts
  // Use for initialization
}

void loop() {
  // Runs REPEATEDLY forever
  // Main program logic goes here
}
```

---

## Project: Button-Controlled LED

Time to build something! We'll create a simple circuit where pressing a button turns on an LED.

### Materials Needed

**Hardware:**
- Arduino Uno board
- Breadboard
- Jumper wires

**Components:**
- 1x LED (any color - red, green, or yellow)
- 1x Resistor (220-600 ohms) for LED
- 1x Resistor (1K ohm) for button
- 1x Push button

---

### Circuit Assembly

#### Step 1: Adding the LED

LEDs are **diodes**, which means they only allow current to flow in one direction. It's important to connect them correctly!

**LED Anatomy:**
- **Anode (+)**: Long leg - connects to the digital pin
- **Cathode (-)**: Short leg / flat edge - connects to ground through a resistor

**Wiring:**
1. Insert the LED into your breadboard
2. Connect the **long leg (anode)** to a digital pin (we'll use pin 5)
3. Connect the **short leg (cathode)** to a 220-600 ohm resistor
4. Connect the other end of the resistor to **GND**

> *[Insert LED Wiring Diagram here]*

**Troubleshooting Tip:** If your LED doesn't light up, try flipping it around - you might have the legs reversed!

---

#### Step 2: Adding the Button

Push buttons have four pins but work as two pairs. When you press the button, it connects the circuit.

**Wiring:**
1. Place the button across the **middle gap** of your breadboard
2. Connect one side of the button to **5V**
3. On the same side, connect a **1K ohm resistor** from the button pin to **GND** (this is a pull-down resistor)
4. Connect the opposite side of the button to a digital pin (we'll use pin 3)

> *[Insert Button Wiring Diagram here]*

The pull-down resistor ensures the pin reads LOW when the button isn't pressed, and HIGH when it is pressed.

---

### Writing the Code

Let's build the code step by step!

#### Step 1: Declare Your Pins

Use `const int` to declare pins as constants (values that won't change):

```cpp
const int LED = 5;      // LED connected to pin 5
const int Button = 3;   // Button connected to pin 3
```

#### Step 2: Setup Function

Initialize your pins and serial communication:

```cpp
void setup() {
  Serial.begin(9600);        // Start serial communication for debugging
  pinMode(LED, OUTPUT);      // Set LED pin as OUTPUT
  pinMode(Button, INPUT);    // Set Button pin as INPUT
}
```

**Question:** Why is the button pin set to INPUT?
- **A.** Because we want to send signals to it
- **B.** Because we want to read signals from it ✓

We use `digitalRead()` to read data from input pins!

#### Step 3: Basic LED Blink (Test)

Before adding the button, let's make sure the LED works:

```cpp
void loop() {
  digitalWrite(LED, HIGH);  // Turn LED on
  delay(1000);              // Wait 1 second
  digitalWrite(LED, LOW);   // Turn LED off
  delay(1000);              // Wait 1 second
}
```

Upload this code and verify your LED blinks!

#### Step 4: Reading the Button

Now let's read the button state:

```cpp
void loop() {
  int buttonState = digitalRead(Button);  // Read button (HIGH or LOW)
  Serial.println(buttonState);            // Print to serial monitor
  delay(100);                             // Small delay for stability
}
```

Open the Serial Monitor (Tools → Serial Monitor) and watch the values change when you press the button!

#### Step 5: Button-Controlled LED

Finally, let's combine everything:

```cpp
void loop() {
  int buttonState = digitalRead(Button);  // Read the button
  
  if (buttonState == HIGH) {              // If button is pressed
    digitalWrite(LED, HIGH);              // Turn LED on
  } else {                                // If button is not pressed
    digitalWrite(LED, LOW);               // Turn LED off
  }
}
```

**How it works:**
- `digitalRead(Button)` returns HIGH when pressed, LOW when not pressed
- The `if` statement checks the button state
- The LED turns on/off based on whether you're holding the button

---

### Full Code

Here's the complete working code for the button-controlled LED:

```cpp
const int LED = 5;
const int Button = 3;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  pinMode(Button, INPUT);
}

void loop() {
  int buttonState = digitalRead(Button);
  
  if (buttonState == HIGH) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
  
  delay(10);  // Small delay for stability
}
```

<!-- **[Download complete code: day1.ino](/code/day1.ino)** -->

---

## Challenge: Maintained Push Button

Right now, the LED only stays on while you **hold** the button. Can you make it **toggle** instead?

**Goal:** One press turns the LED on, the next press turns it off (like a light switch).

### The Logic

To accomplish this, you need to track two things:
1. **The current state of the LED** (on or off?)
2. **The previous state of the button** (was it pressed last time we checked?)

### Required Variables

```cpp
int LEDState = 0;      // Is the LED currently on (1) or off (0)?
int ButtonOld = 0;     // What was the button state last time?
int ButtonNew;         // What is the button state right now?
```

### Hint: The Logic Flow

Inside your `loop()`:

1. Read the current button state: `ButtonNew = digitalRead(Button);`
2. Check if the button **just changed** from not pressed to pressed:
   - Compare `ButtonOld` and `ButtonNew`
   - Only toggle when button goes from LOW to HIGH (this prevents multiple triggers)
3. If a button press was detected:
   - Flip the `LEDState` (if it was 0, make it 1; if it was 1, make it 0)
   - Update the LED based on the new `LEDState`
4. Save the current button state: `ButtonOld = ButtonNew;`

### Setup Code Template

```cpp
const int LED = 5;
const int Button = 3;
int ButtonOld = 0;
int LEDState = 0;
int ButtonNew;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  pinMode(Button, INPUT);
}

void loop() {
  // Your challenge code goes here!
}
```

**Think about it:** How do you detect when the button **just got pressed** versus when it's **being held down**?

<details>
<summary>Click to reveal solution</summary>

```cpp
void loop() {
  ButtonNew = digitalRead(Button);  // Read current button state
  
  // Check if button was just pressed (transition from LOW to HIGH)
  if (ButtonOld == LOW && ButtonNew == HIGH) {
    // Toggle the LED state
    if (LEDState == 0) {
      LEDState = 1;
    } else {
      LEDState = 0;
    }
    
    // Update the LED
    digitalWrite(LED, LEDState);
  }
  
  // Save the current state for next loop
  ButtonOld = ButtonNew;
  
  delay(10);  // Small delay for debouncing
}
```

**How it works:**
- We only toggle when `ButtonOld` was LOW and `ButtonNew` is HIGH (button just pressed)
- This prevents triggering multiple times while holding the button
- The `LEDState` variable remembers whether the LED should be on or off
- The `delay(10)` helps with button "debouncing" (preventing electrical noise from false triggers)

</details>

---

## Next Steps

Congratulations! You've completed Day 1 and learned:
- Arduino pin functions and types
- Basic Arduino programming syntax
- Digital input and output
- Building circuits with LEDs and buttons
- State management for toggle behavior

**Ready for Day 2?** We'll explore sensors, analog inputs, and more complex circuits!