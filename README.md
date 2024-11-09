# WebMIDI + WebRTC p2p Transport

[https://atmanactive.github.io/webmidi-rtc-transport/](https://atmanactive.github.io/webmidi-rtc-transport/)

The purpose of this web app is to connect several devices acros internet 
via MIDI in order to synchronize MIDI Transport Control (Mackie) signals 
so when a DAW goes into play mode, everyone connected can get the signal 
and have their communication microphones automatically muted. Also, when DAW playback 
stops, everyone receives the MIDI stop signal so their communication microphones 
can automatically unmute.


Usage instructions for Windows:


Preparation: install [loopMIDI virtual MIDI cable by Tobias Erichsen](https://www.tobias-erichsen.de/software/loopmidi.html).
In loopMIDI, create two virtual MIDI cables and name them: "WebRTC-Outgoing" and "WebRTC-Incoming".
This web app will automatically search for those two MIDI ports and connect to them.
If you see other MIDI port names under MIDI input and MIDI output display on this page 
that means your browser didn't find the ports "WebRTC-Outgoing"/"WebRTC-Incoming", or 
they are already locked by some other application.


Send your MIDI signals to WebRTC-Outgoing cable to have them broadcast to the group.
Incoming MIDI signals from the group will be sent to WebRTC-Incoming MIDI cable.



To have your microphone automatically muted/unmuted, [check out this project](https://github.com/AtmanActive/MIDI-Transport2Keys). 
For real-time p2p audio/video communication, checkout [MiroTalk](https://p2p.mirotalk.com). 
For real-time studio-quality audio transport from your DAW, checkout [Sonobus](https://sonobus.net/).



Make sure you use this web app in a [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium_(web_browser)). 
Now you can bookmark and share this page link with your fellow musicians. 
Pay attention to the link part after the # sign in the address: that's your room ID.



As of 2024. WebMIDI on Windows locks all the available MIDI ports when active. 
Thus, make sure to start this browser tab last, after you have your DAW and other 
MIDI utilities running. For quick adjustments, you can use the app's PAUSE button. 


Developed by [AtmanActive](https://github.com/AtmanActive/webmidi-rtc-transport) by expanding on the work by [dtinth](https://github.com/dtinth/midi-rtc). 



Powered by simple-peer, P2PT and Web MIDI API.

