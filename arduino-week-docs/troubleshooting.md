# Troubleshooting

Working with hardware can sometimes be tricky. If something isn't working right, don't panic! Review this checklist of common issues encountered during our workshops.

## Board Not Detected
If you plug in your Arduino and it doesn't appear in the `Tools > Port` menu:
* **The Cable:** Ensure you are using a data-sync USB cable, not a power-only charging cable. Try swapping the cable.
* **The Port:** Try plugging into a different USB port on your laptop, or remove any USB hubs and plug indirectly.
* **Drivers (For Clones):** If you are using a non-official Arduino (a clone), it may use a CH340 serial chip. You need to manually download and install the CH340 driver for your operating system.

## Upload Failures
If the IDE says "avrdude: stk500_getsync(): not in sync" or simply "Upload Failed":
* **Wrong Board Selection:** Make sure `Tools > Board` is set precisely to `Arduino Uno` (or Nano/Mega if you are using those).
* **Wrong Port:** Double-check your `Tools > Port` selection.
* **Pin 0/1 Conflict:** Pins `0 (RX)` and `1 (TX)` are used for USB communication. If you have any wires plugged into these pins during upload, it will fail. Unplug them, upload the code, and plug them back in.

## Code Doesn't Compile
* **Semicolons:** Every statement in C++ must end with a semicolon `;`. Did you miss one?
* **Braces:** Every open `{` must have a matching closed `}`. Let the IDE highlight them to check.
* **Case Sensitivity:** Arduino code is case sensitive. `digitalwrite()` is incorrect; it must be `digitalWrite()`.

## Wiring Mistakes
* **Polarity:** Components like LEDs and some capacitors have strict polarity (positive vs negative). If an LED doesn't light up, try flipping it around.
* **Breadboard Basics:** Remember that the middle rows of a breadboard are connected horizontally (A-E and F-J), while the outer power rails are connected vertically down the entire board.
* **Loose Wires:** Gently tap or wiggle your jumper wires. A loose connection in the breadboard is one of the most common causes of inconsistent sensor readings.
* **Common Ground:** If you are using multiple power sources or integrating separate circuits, they *must* share a common Ground (GND) connection.
