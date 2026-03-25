#include <EEPROM.h>

const int trigPin = 3;
const int echoPin = 4;
const int buzzerPin = 7;
const int buttonResetPin = 5;
const int buttonEvilPin = 6;

long duration;
int distance;
int thresholdDistance;
bool isAlarmTriggered = false;
bool evilModeActive = false;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonResetPin, INPUT);
  pinMode(buttonEvilPin, INPUT);
  Serial.begin(9600);
  
  thresholdDistance = EEPROM.read(0);
  if (thresholdDistance <= 0 || thresholdDistance > 100) {
    thresholdDistance = 50; // default 50cm
  }
}

void loop() {
  // Ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  
  if (digitalRead(buttonResetPin) == HIGH) {
    isAlarmTriggered = false;
    Serial.println("Alarm Reset!");
    delay(500);
  }
  
  if (digitalRead(buttonEvilPin) == HIGH) {
    evilModeActive = !evilModeActive;
    Serial.println(evilModeActive ? "Evil Mode ON" : "Evil Mode OFF");
    delay(500);
  }
  
  if (distance > 0 && distance < thresholdDistance) {
    isAlarmTriggered = true;
  }
  
  if (isAlarmTriggered) {
    tone(buzzerPin, evilModeActive ? 4000 : 1000);
    delay(evilModeActive ? 50 : 200);
    noTone(buzzerPin);
    delay(evilModeActive ? 50 : 200);
  } else {
    noTone(buzzerPin);
  }
}
