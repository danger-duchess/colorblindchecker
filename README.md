# colorblindchecker
A colorblind compliance checker prototype designed for Photoshop Scripting. Simply add it to scripts and run the program to add a stroke layer to text that do not meet WCAG Guidelines for Colorblindness.
The code will check the color of the background first, then check the colors of each text layer against the background. If the contrast does not meet WCAG AA standards (3:1 for large text, 4.5:1 for small text), a stroke layer will be added to the text in black (though you may change the color to anything you wish.) 
Some code taken or adapted from stackoverflow.com and the Photoshop forums. 
