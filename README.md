# WebMIDI + WebRTC p2p Transport

The purpose of this web app is to connect several devices acros internet 
via MIDI in order to synchronize MIDI Transport Control (Mackie) signals 
so when a DAW goes into play mode, everyone connected can get the signal 
and automatically mute their communication microphones. Also, when DAW playback 
stops, everyone receives the MIDI stop signal so their communication microphones 
can automatically unmute.


Usage instructions for Windows:


Preparation: install [loopMIDI virtual MIDI cable by Tobias Erichsen](https://www.tobias-erichsen.de/software/loopmidi.html).
In loopMIDI, create two virtual MIDI cables and name them: "WebRTC-Outgoing" and "WebRTC-Incoming".
This web app will automatically search for those two MIDI ports and connect to them.



Send your MIDI signals to WebRTC-Outgoing cable to have them broadcast to the group.
Incoming MIDI signals from the group will be sent to WebRTC-Incoming MIDI cable.



To have your microphone automatically muted/unmuted, [check out this project](https://github.com/AtmanActive/MIDI-Transport2Keys). 
For real-time p2p audio/video communication, check out [MiroTalk](https://p2p.mirotalk.com). 
For real-time studio-quality audio transport from your DAW, check out [Sonobus](https://sonobus.net/).



Make sure you use this web app in a [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium_(web_browser)). 
Now you can bookmark and share this page link with your fellow musicians. 
Pay attention to the link part after the # sign in the address: that's your room ID.



As of 2024. WebMIDI on Windows locks all of the available MIDI ports when active. 
Thus, make sure to start this browser tab last, after you have your DAW and other 
MIDI utilities running.


Developed by [AtmanActive](https://github.com/AtmanActive/webmidi-rtc-transport) by expanding on the work by [dtinth](https://github.com/dtinth/midi-rtc). 



Powered by simple-peer, P2PT and Web MIDI API.

