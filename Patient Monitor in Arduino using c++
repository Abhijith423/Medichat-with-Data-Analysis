#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

int tempPin = A0;   
int heartPin = A1;  
int redPin = 9;     
int greenPin = 10;  
int bluePin = 11; 


void setup() {
  lcd.init();
  lcd.backlight();
  Serial.begin(9600);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  int tempValue = analogRead(tempPin);
  float voltage = tempValue * (5.0 / 1023.0);
  float temperature = (voltage - 0.5) * 100;

  int heartRate = analogRead(heartPin);
  heartRate = map(heartRate, 0, 1023, 60, 120);

  // Display on I2C LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temperature);
  lcd.print("C");

  lcd.setCursor(0, 1);
  lcd.print("HR: ");
  lcd.print(heartRate);
  lcd.print(" BPM");

  
  int redBrightness = map(heartRate, 60, 120, 50, 255);  // Increase Red brightness with BPM
  int greenBrightness = map(heartRate, 60, 120, 50, 255);  // Increase Green brightness with BPM
  int blueBrightness = map(heartRate, 60, 120, 50, 255);  // Increase Blue brightness with BPM

  
  analogWrite(redPin, redBrightness);    
  analogWrite(greenPin, greenBrightness); 
  analogWrite(bluePin, blueBrightness);   

  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println("C");

  Serial.print("Heart Rate: ");
  Serial.print(heartRate);
  Serial.println(" BPM");

  delay(1000); // Update every second
}
