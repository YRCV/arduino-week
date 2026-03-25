# Day 2: Ultrasonic Security System

## Introduction

Welcome to Day 2! Today we're tackling a real-world problem: **people stealing your food from the fridge**. Whether it's roommates or family members sneaking snacks in the middle of the night, we've all been there.

**The Solution:** Build an ultrasonic security system that detects when something is moved and sounds an alarm to scare off the culprit.

**What you'll learn:**
- Working with ultrasonic distance sensors
- Using buzzers for audio output
- Converting sensor readings to useful measurements
- Creating state-based logic (alarm modes)
- Storing data permanently with EEPROM
- Taking user input through Serial Monitor

**Project Goal:** Create a system that triggers an alarm when an object is moved beyond a set distance, with optional "evil mode" that keeps the alarm going even after the object is returned.

---

## Understanding the Components

### HC-SR04 Ultrasonic Sensor

The HC-SR04 measures distance using sound waves, similar to how bats navigate.

**How it works:**
1. The **Transmitter (Trig)** sends out ultrasonic sound pulses
2. The sound waves bounce off objects and return
3. The **Receiver (Echo)** detects the reflected signal
4. We measure the time it took for the round trip
5. Distance = (Time × Speed of Sound) ÷ 2

**Important:** The sensor measures the **round trip** time (to the object and back), so we divide by 2 to get the actual distance.

> *[Insert HC-SR04 Sensor Diagram here]*

**Pinout:**
- **VCC**: Connect to 5V
- **GND**: Connect to Ground
- **Trig**: Digital Pin 3 (sends the pulse)
- **Echo**: Digital Pin 4 (receives the pulse)

**Range:** Approximately 2cm to 400cm

---

### Buzzer (KY-006)

A simple piezo buzzer that produces sound when voltage is applied.

**Pinout:**
- **(-) Negative**: Connect to Ground
- **(+) Positive**: Connect to Digital Pin 7

By rapidly turning it on and off at different rates, we can create different tones and annoying sounds!

---

## Materials Needed

**Hardware:**
- Arduino Uno board
- Breadboard
- Jumper wires

**Components:**
- 1x HC-SR04 Ultrasonic Sensor
- 1x Buzzer (KY-006)
- 2x Push buttons (for advanced features)
- 2x 1K ohm resistors (for buttons)

---

## Circuit Assembly

### Step 1: Set Up Power Rails

Before adding components, let's prepare the breadboard:

1. Connect **GND** from Arduino to the **negative rail** (blue/black line) on breadboard
2. Connect **5V** from Arduino to the **positive rail** (red line) on breadboard

This gives us easy access to power throughout the circuit.

---

### Step 2: Testing the Buzzer

**Best practice:** Always test components individually before building the full circuit!

**Buzzer Wiring:**
1. Place buzzer on breadboard
2. Connect **(-) pin** to Ground rail
3. Connect **(+) pin** to **Digital Pin 7**

> *[Insert Buzzer Wiring Diagram here]*

**Safety Tip:** The buzzer can be LOUD. During testing, either:
- Keep it unplugged and use `Serial.println("Buzzer On");` as a placeholder
- Cover it with your hand
- Test with short delays

---

### Step 3: Basic Buzzer Code

Let's make sure the buzzer works:

```cpp
const int buzzerPin = 7;  // Buzzer connected to pin 7

void setup() {
  pinMode(buzzerPin, OUTPUT);  // Set buzzer pin as output
}

void loop() {
  digitalWrite(buzzerPin, HIGH);  // Turn buzzer on
  delay(500);                     // Wait 0.5 seconds
  digitalWrite(buzzerPin, LOW);   // Turn buzzer off
  delay(500);                     // Wait 0.5 seconds
}
```

**Upload and test!** You should hear a beeping sound every half second.

**Experiment:** Try different delay values to create different sound patterns. What sounds most annoying?

---

### Step 4: Adding the Ultrasonic Sensor

Now let's add the distance sensor.

**HC-SR04 Wiring:**
1. Place sensor on breadboard
2. Connect **VCC** to **5V rail**
3. Connect **GND** to **Ground rail**
4. Connect **Trig** to **Digital Pin 3**
5. Connect **Echo** to **Digital Pin 4**

> *[Insert HC-SR04 Wiring Diagram here]*

---

## Writing the Code

Let's build the security system step by step!

### Step 1: Testing the Ultrasonic Sensor

First, let's just read distance values:

```cpp
const int trigPin = 3;  // Trig pin
const int echoPin = 4;  // Echo pin

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  long duration, cm;
  
  // Send ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read the echo
  duration = pulseIn(echoPin, HIGH);
  
  // Convert to centimeters
  cm = microsecondsToCentimeters(duration);
  
  Serial.print("Distance: ");
  Serial.print(cm);
  Serial.println(" cm");
  
  delay(100);
}

long microsecondsToCentimeters(long microseconds) {
  // Speed of sound is 343 m/s or 29 microseconds per centimeter
  // Divide by 2 because sound travels to object and back
  return microseconds / 29 / 2;
}
```

**How this works:**
1. We send a 10-microsecond pulse from the Trig pin
2. The sensor sends out ultrasonic waves
3. `pulseIn()` waits for the Echo pin to go HIGH and measures how long
4. We convert the time to distance using the speed of sound

**Test it:** Open Serial Monitor and move your hand closer/farther from the sensor. You should see the distance change!

---

### Step 2: Understanding the Conversion

**Why divide by 29 and then by 2?**

- Sound travels at approximately **343 meters/second**
- That's **29 microseconds per centimeter**
- We divide by 2 because the sound travels **to the object AND back**

The `microsecondsToCentimeters()` function does this math for us:

```cpp
long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
```

You can also write this as: `return microseconds / 58;` (29 × 2 = 58)

---

### Step 3: Combining Sensor and Buzzer

Now let's trigger the buzzer when something moves too far away:

```cpp
const int trigPin = 3;
const int echoPin = 4;
const int buzzerPin = 7;

int thresholdDistance = 20;  // Alarm triggers if object moves beyond 20cm

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  long duration, cm;
  
  // Measure distance
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  cm = microsecondsToCentimeters(duration);
  
  Serial.print("Distance: ");
  Serial.print(cm);
  Serial.println(" cm");
  
  // Check if object moved beyond threshold
  if (cm > thresholdDistance) {
    digitalWrite(buzzerPin, HIGH);  // ALARM!
    Serial.println("ALARM: Object moved!");
  } else {
    digitalWrite(buzzerPin, LOW);   // All good
  }
  
  delay(100);
}

long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
```

**Test it:** Place an object (like a cup) in front of the sensor. Move it away. The buzzer should sound when it crosses the threshold!

---

### Step 4: Making It More Annoying

Let's create a pulsing alarm sound instead of constant noise:

```cpp
// Inside the if statement where alarm triggers:
if (cm > thresholdDistance) {
  digitalWrite(buzzerPin, HIGH);
  delay(100);
  digitalWrite(buzzerPin, LOW);
  delay(100);
  digitalWrite(buzzerPin, HIGH);
  delay(100);
  digitalWrite(buzzerPin, LOW);
  Serial.println("ALARM: Object moved!");
}
```

**Experiment:** Try different delay patterns to create the most annoying sound possible. Short rapid beeps? Long blares? Get creative!

---

### Full Basic Code

Here's the complete basic security system:

```cpp
const int trigPin = 3;
const int echoPin = 4;
const int buzzerPin = 7;

int thresholdDistance = 20;  // Alarm threshold in cm

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  long duration, cm;
  
  // Trigger ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Measure echo time
  duration = pulseIn(echoPin, HIGH);
  
  // Convert to distance
  cm = microsecondsToCentimeters(duration);
  
  // Display distance
  Serial.print("Distance: ");
  Serial.print(cm);
  Serial.println(" cm");
  
  // Security logic
  if (cm > thresholdDistance) {
    // ALARM!
    digitalWrite(buzzerPin, HIGH);
    delay(100);
    digitalWrite(buzzerPin, LOW);
    delay(100);
    Serial.println("ALARM TRIGGERED!");
  } else {
    digitalWrite(buzzerPin, LOW);
  }
  
  delay(100);
}

long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
```

📥 **[Download basic code: day2-basic.ino](../code/day2-basic.ino)**

---

## Challenge: Evil Mode

Right now, the alarm stops when you put the object back. But what if you want to **keep the alarm going** until you manually turn it off? This is "evil mode" - perfect for catching food thieves in the act!

### The Goal

Once the food is taken (distance exceeds threshold), the alarm should:
1. Keep buzzing even if the object is returned
2. Only stop when a button is pressed (reset)
3. Bonus: Make the sound as annoying as possible

### The Logic

You'll need to track **state** - has the alarm been triggered?

**Required variables:**
```cpp
bool alarmTriggered = false;  // Has the alarm gone off?
```

**Hint:** 
1. When `cm > thresholdDistance`, set `alarmTriggered = true`
2. The buzzer should sound whenever `alarmTriggered == true`
3. Add a button that resets `alarmTriggered = false`

**Button Setup:**
- Connect button to **Pin 6** (we'll call this "Evil Mode Button")
- Wire it the same way as Day 1 (one side to 5V with pull-down resistor, other side to pin)

<details>
<summary>Click to reveal solution</summary>

```cpp
const int trigPin = 3;
const int echoPin = 4;
const int buzzerPin = 7;
const int evilModeButton = 6;

int thresholdDistance = 20;
bool alarmTriggered = false;  // Track if alarm has gone off

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(evilModeButton, INPUT);
}

void loop() {
  long duration, cm;
  
  // Measure distance
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  cm = microsecondsToCentimeters(duration);
  
  Serial.print("Distance: ");
  Serial.print(cm);
  Serial.println(" cm");
  
  // Check if threshold breached
  if (cm > thresholdDistance && !alarmTriggered) {
    alarmTriggered = true;
    Serial.println("EVIL MODE ACTIVATED!");
  }
  
  // If alarm triggered, keep buzzing!
  if (alarmTriggered) {
    digitalWrite(buzzerPin, HIGH);
    delay(50);
    digitalWrite(buzzerPin, LOW);
    delay(50);
    digitalWrite(buzzerPin, HIGH);
    delay(50);
    digitalWrite(buzzerPin, LOW);
    delay(50);
  }
  
  // Check for reset button
  if (digitalRead(evilModeButton) == HIGH) {
    alarmTriggered = false;
    digitalWrite(buzzerPin, LOW);
    Serial.println("Alarm reset.");
    delay(500);  // Debounce
  }
  
  delay(100);
}

long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
```

**How it works:**
- The `alarmTriggered` variable acts as a "memory" - once set to true, it stays true
- The alarm keeps going even when the object returns
- Only pressing the reset button clears the state
- The rapid on/off pattern (50ms delays) creates an extra annoying sound

</details>

---

## Advanced Features: User Input & EEPROM

Want to make this project more accessible and customizable? Let's add features that let users set their own threshold distance and save it permanently!

### The Problem

Right now, the threshold distance is hardcoded (`int thresholdDistance = 20;`). What if:
- Different users want different sensitivity?
- You move the sensor and need to recalibrate?
- The Arduino loses power and forgets settings?

**Solution:** Let users input their preferred distance via Serial Monitor and save it to EEPROM (permanent storage).

---

### New Concepts

**Serial.available()**
- Checks if there's data waiting to be read from Serial Monitor
- Returns the number of bytes available

**Serial.parseInt()**
- Reads integer values from Serial Monitor input
- Example: User types "25" and presses enter → returns 25

**EEPROM Library**
- Stores data permanently on the Arduino chip
- Data survives power loss and resets
- Limited to 100,000 write cycles (plenty for this project)

---

### Step 1: Add User Input

Let's let users set their own threshold distance:

```cpp
#include <EEPROM.h>

const int trigPin = 3;
const int echoPin = 4;
const int buzzerPin = 7;

int thresholdDistance;  // Will be set by user or loaded from EEPROM

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  
  // Load saved threshold or ask for new one
  thresholdDistance = EEPROM.read(0);
  
  // Check if this is first time (EEPROM defaults to 255)
  if (thresholdDistance == 255) {
    Serial.println("First time setup!");
    Serial.println("Enter threshold distance (cm):");
    
    // Wait for user input
    while (Serial.available() == 0) {
      // Just wait...
    }
    
    thresholdDistance = Serial.parseInt();
    EEPROM.update(0, thresholdDistance);  // Save to EEPROM
    
    Serial.print("Threshold set to: ");
    Serial.print(thresholdDistance);
    Serial.println(" cm");
  } else {
    Serial.print("Loaded threshold: ");
    Serial.print(thresholdDistance);
    Serial.println(" cm");
  }
}

void loop() {
  // ... rest of the code stays the same
}
```

**How this works:**
1. On startup, we try to read saved threshold from EEPROM address 0
2. If it's 255 (default empty value), we know it's the first run
3. We ask the user to input a value via Serial Monitor
4. `while (Serial.available() == 0)` pauses the program until user types something
5. We save the value to EEPROM so it's remembered next time

**Test it:** 
1. Upload the code
2. Open Serial Monitor
3. Type a distance (e.g., "30") and press Enter
4. Reset the Arduino - it should remember your value!

---

### Step 2: Add a Reset Button

What if you want to change the threshold later? Let's add a button to clear the saved value:

**Wiring:**
- Connect reset button to **Pin 5**
- Wire like previous buttons (5V, pull-down resistor, pin)

```cpp
const int resetButton = 5;

void setup() {
  // ... previous setup code
  pinMode(resetButton, INPUT);
}

void loop() {
  // ... sensor and alarm code
  
  // Check for reset button press
  if (digitalRead(resetButton) == HIGH) {
    EEPROM.update(0, 255);  // Reset to "first time" value
    Serial.println("Settings reset! Restarting...");
    delay(1000);
    asm volatile ("  jmp 0");  // Software reset (restart Arduino)
  }
}
```

**How this works:**
- When reset button is pressed, we write 255 back to EEPROM
- This makes the Arduino think it's the first run again
- We perform a software reset to restart the setup process
- User will be prompted to enter a new threshold

---

### Understanding EEPROM

**EEPROM (Electrically Erasable Programmable Read-Only Memory):**
- Small permanent storage on Arduino (1KB on Uno)
- Organized as addresses (0, 1, 2, 3, ...)
- Each address stores one byte (0-255)

**Key Functions:**
```cpp
#include <EEPROM.h>

EEPROM.read(address);           // Read a value
EEPROM.update(address, value);  // Write only if changed (saves write cycles)
EEPROM.write(address, value);   // Always write (wears out faster)
```

**Important:** EEPROM has limited write cycles (~100,000). Always use `update()` instead of `write()` - it only writes if the value actually changed.

---

### Full Advanced Code

Here's the complete system with all features:

```cpp
#include <EEPROM.h>

const int trigPin = 3;
const int echoPin = 4;
const int buzzerPin = 7;
const int resetButton = 5;
const int evilModeButton = 6;

int thresholdDistance;
bool alarmTriggered = false;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(resetButton, INPUT);
  pinMode(evilModeButton, INPUT);
  
  // Load or request threshold distance
  thresholdDistance = EEPROM.read(0);
  
  if (thresholdDistance == 255) {
    Serial.println("=== ULTRASONIC SECURITY SYSTEM ===");
    Serial.println("Enter threshold distance (cm): ");
    
    while (Serial.available() == 0) {}
    
    thresholdDistance = Serial.parseInt();
    EEPROM.update(0, thresholdDistance);
    
    Serial.print("Threshold set to: ");
    Serial.print(thresholdDistance);
    Serial.println(" cm");
    Serial.println("System armed!");
  } else {
    Serial.println("=== ULTRASONIC SECURITY SYSTEM ===");
    Serial.print("Loaded threshold: ");
    Serial.print(thresholdDistance);
    Serial.println(" cm");
    Serial.println("System armed!");
  }
}

void loop() {
  long duration, cm;
  
  // Measure distance
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  cm = microsecondsToCentimeters(duration);
  
  // Check if threshold breached
  if (cm > thresholdDistance && !alarmTriggered) {
    alarmTriggered = true;
    Serial.println("!!! ALARM TRIGGERED !!!");
  }
  
  // Sound alarm if triggered
  if (alarmTriggered) {
    digitalWrite(buzzerPin, HIGH);
    delay(50);
    digitalWrite(buzzerPin, LOW);
    delay(50);
  }
  
  // Evil mode reset button
  if (digitalRead(evilModeButton) == HIGH) {
    alarmTriggered = false;
    digitalWrite(buzzerPin, LOW);
    Serial.println("Alarm disarmed.");
    delay(500);
  }
  
  // Settings reset button
  if (digitalRead(resetButton) == HIGH) {
    EEPROM.update(0, 255);
    Serial.println("Settings cleared. Restarting...");
    delay(1000);
    asm volatile ("  jmp 0");  // Software reset
  }
  
  delay(100);
}

long microsecondsToCentimeters(long microseconds) {
  return microseconds / 29 / 2;
}
```

**[Download complete code: day2-advanced.ino](../code/day2-advanced.ino)**

---

## Final Pin Configuration

**Summary of all connections:**

| Component | Pin | Notes |
|-----------|-----|-------|
| Buzzer (+) | 7 | Audio alarm output |
| HC-SR04 Trig | 3 | Ultrasonic transmitter |
| HC-SR04 Echo | 4 | Ultrasonic receiver |
| HC-SR04 VCC | 5V | Power |
| HC-SR04 GND | GND | Ground |
| Reset Button | 5 | Clear EEPROM settings |
| Evil Mode Button | 6 | Disarm alarm |

> *[Insert Complete Circuit Diagram here]*

---

## Next Steps

Congratulations! You've completed Day 2 and learned:
- Working with ultrasonic distance sensors
- Using buzzers for audio feedback
- Converting sensor data to meaningful measurements
- State management with boolean flags
- Taking user input via Serial Monitor
- Permanent data storage with EEPROM
- Software resets and system configuration

**Ready for Day 3?** We'll build a mini piano with multiple buttons and sound synthesis!