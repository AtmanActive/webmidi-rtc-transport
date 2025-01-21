# WebMIDI + WebRTC p2p Transport

Single port:
[https://atmanactive.github.io/webmidi-rtc-transport/](https://atmanactive.github.io/webmidi-rtc-transport/)

Multi port:
[https://atmanactive.github.io/webmidi-rtc-transport/multi](https://atmanactive.github.io/webmidi-rtc-transport/multi)


## Purpose
The purpose of this web app is to connect several devices acros internet 
via MIDI in order to synchronize MIDI Transport Control (Mackie) signals 
so when a DAW goes into play mode, everyone connected can get the signal 
and have their communication microphones automatically muted. Also, when DAW playback 
stops, everyone receives the MIDI stop signal so their communication microphones 
can automatically unmute.


## Usage instructions for Windows:


## Preparation: 

Install [loopMIDI virtual MIDI cable by Tobias Erichsen](https://www.tobias-erichsen.de/software/loopmidi.html).

For advanced MIDI routing, we recommend [Bome Network Pro](https://www.bome.com/products/bomenet) instead of loopMIDI. 
Just keep in mind that loopMIDI is creating MIDI cables, while Bome Network Pro is creating MIDI ports (which then need to be routed).

### For Single port:
In loopMIDI, create two virtual MIDI cables and name them: "WebRTC-Outgoing" and "WebRTC-Incoming".
### For Multi port:
In loopMIDI, create from two (min) to eighteen (max) virtual MIDI cables and name them: "WebRTC-1-Outgoing" and "WebRTC-1-Incoming". 

Next pair name "WebRTC-2-Outgoing" and "WebRTC-2-Incoming". 

Next pair name "WebRTC-3-Outgoing" and "WebRTC-3-Incoming". 

And so on, up to "WebRTC-9-Outgoing" and "WebRTC-9-Incoming", if desired. 

## Usage

This web app will automatically search for those MIDI ports and connect to them.

If you see other MIDI port names under MIDI input and MIDI output display on the page, 
that means your browser didn't find the ports "WebRTC-Outgoing"/"WebRTC-Incoming", or 
they are already locked by some other application.


Send your MIDI signals to WebRTC-Outgoing cable to have them broadcast to the group.
Incoming MIDI signals from the group will be sent to WebRTC-Incoming MIDI cable.

## Caveats
As of 2024. WebMIDI on Windows locks all the available MIDI ports when active. 
Thus, make sure to start the browser page last, after you have your DAW and other 
MIDI utilities running. For quick adjustments, you can use the app's PAUSE button. 

## Optional
To have your microphone automatically muted/unmuted, [check out this project](https://github.com/AtmanActive/MIDI-Transport2Keys). 
For real-time p2p audio/video communication, checkout [MiroTalk](https://p2p.mirotalk.com). 
For real-time studio-quality audio transport from your DAW, checkout [Sonobus](https://sonobus.net/).


## Requirements
Make sure you use this web app in a [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium_(web_browser)). 
Now you can bookmark and share this page link with your fellow musicians. 
Pay attention to the link part after the # sign in the address: that's your room ID.




## Troubleshooting
For lossy internet connections, DAW's Mackie MIDI packet stream might overwhelm 
WebRTC. This will manifest itself as play/stop signals having an ever increasing lag.
In [Reaper DAW](https://reaper.fm) this can be fixed by lowering Control Surface 
display update frequency in Settings->Control/OSC/Web. 
For other DAWs, one solution could be using [Bome Translator](https://www.bome.com/products/miditranslator) 
to filter out all Mackie MIDI events except for play and stop.
If all parties have zero-loss internet connections, none of this is needed, it will just work.

## Credits
Developed by [AtmanActive](https://github.com/AtmanActive/webmidi-rtc-transport) by expanding on the work by [dtinth](https://github.com/dtinth/midi-rtc). 



Powered by simple-peer, P2PT and Web MIDI API.

