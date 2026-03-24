# Getting Started

Welcome to Arduino Week! Before we dive into building circuits and coding, we need to ensure your development environment is fully set up.

## 1. Installing the Arduino IDE

The Arduino Integrated Development Environment (IDE) is where you will write your code and upload it to the board. 

1. Go to the [Official Arduino Software Page](https://www.arduino.cc/en/software).
2. Download the latest version of Arduino IDE 2.x for your operating system (Windows, macOS, or Linux).
3. Run the installer and follow the on-screen instructions.

## 2. Setting Up Your Board

For this workshop series, we will be using the.

1. Open the Arduino IDE.
2. Connect your Arduino board to your computer using the provided USB cable.
3. In the IDE, go to `Tools > Board > Arduino AVR Boards` and select `Arduino Uno`.
4. Next, select the port. Go to `Tools > Port` and choose the port that indicates your board (e.g., `COM3 (Arduino Uno)` on Windows or `/dev/cu.usbmodem...` on macOS).

## 3. Your First Upload Test

Let's verify that everything is working correctly by uploading an empty script.

1. Open a new sketch (`File > New Sketch`).
2. You will see a basic structure with `setup()` and `loop()` functions.
3. Click the **Verify** button (check mark icon) in the top left to compile the code.
4. If it compiles successfully, click the **Upload** button (right arrow icon) next to it.
5. If the bottom console says "Done uploading," your setup is complete!

## 4. Basic Troubleshooting Checklist

If you encounter issues during setup:
- **Board not recognized?** Try a different USB cable or a different USB port.
- **Port option greyed out?** You might need to install CH340 drivers if you are using a clone board.
- **Upload failed?** Ensure you have the correct Board and Port selected in the Tools menu.

For more detailed help, see our [Troubleshooting Guide](./troubleshooting.md).

Now that you're set up, proceed to [Day 1](./day-1.md) to build your first project!
