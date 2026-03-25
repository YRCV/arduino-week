const int buzzerPin = 11;
const int numKeys = 7;
const int buttonPins[] = {4, 5, 6, 7, 8, 9, 10};

// C4, D4, E4, F4, G4, A4, B4 Frequencies
const int noteFrequencies[] = {262, 294, 330, 349, 392, 440, 494};

void setup() {
  pinMode(buzzerPin, OUTPUT);
  for (int i = 0; i < numKeys; i++) {
    pinMode(buttonPins[i], INPUT);
  }
  Serial.begin(9600);
}

void loop() {
  bool anyButtonPressed = false;
  
  for (int i = 0; i < numKeys; i++) {
    if (digitalRead(buttonPins[i]) == HIGH) {
      tone(buzzerPin, noteFrequencies[i]);
      anyButtonPressed = true;
      Serial.print("Playing Key ");
      Serial.println(i + 1);
      break; 
    }
  }
  
  if (!anyButtonPressed) {
    noTone(buzzerPin);
  }
}
