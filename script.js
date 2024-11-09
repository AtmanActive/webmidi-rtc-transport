/* global p2pkit, Vue */

function wmwrtctr_copy_url_to_clipboard_on_click()
{
	
	const dom_element = document.getElementById( 'connection-info' );
	
	const url = dom_element.innerHTML;
	
	navigator.clipboard.writeText( url );
	
	dom_element.setAttribute( "title", "copied to clipboard" );
	dom_element.style.color = 'green';
	
	//console.log( 'URL copied to clipboard:', url );
}

function wmwrtctr_open_close_instructions()
{
	
	const dom_element = document.getElementById( 'wmwrtctr_instructions' );
	
	if ( dom_element.style.display === 'none' )
	{
		dom_element.style.display = 'block';
	}
	else
	{
    dom_element.style.display = 'none';
  }
	
}







Vue.component('port-selector', {
  template: '#port-selector',
  props: ['available', 'selected'],
  computed: {
    options() {
      return [
        { key: null, text: 'None selected', selected: this.selected === null },
        ...this.available.map(item => ({
          key: item.key,
          text: item.name,
          selected: this.selected === item.key
        }))
      ]
    }
  },
  methods: {
    select(option) {
      this.$emit('select', option.key)
    }
  }
})

const trackersAnnounceURLs = [
  //'wss://tracker.btorrent.xyz',
  'wss://tracker.openwebtorrent.com',
  //'wss://tracker.fastcast.nz',
  //'wss://tracker.sloppyta.co:443/',
  'wss://tracker.novage.com.ua:443/',
  //'wss://spacetradersapi-chatbox.herokuapp.com:443/announce',
  //'wss://tracker.files.fm:7073/announce',
]
const peers = new Set()

let roomId
const roomIdMatch = location.hash.match(/^\#?([a-zA-Z0-9-]+)/)
if (roomIdMatch) {
  roomId = roomIdMatch[1]
} else {
  roomId = crypto.randomUUID()
  location.replace('#' + roomId)
}

const p2pt = new p2pkit.P2PT(trackersAnnounceURLs, roomId)

const app = new Vue({
  el: '#app',
  data: {
    baseUrl: location.href.replace(/[\?#].*/, ''),
    error: null,
    selectedInput: null,
    selectedOutput: null,
    availableInputs: [],
    availableOutputs: [],
    currentInputPort: null,
    currentOutputPort: null,
		hardCodedNameInput:  "WebRTC-Outgoing", // A MIDI PORT THAT IS CONSIDERED OUTGOING FROM THIS DEVICE PERSPECTIVE
		hardCodedNameOutput: "WebRTC-Incoming", // A MIDI PORT THAT IS CONSIDERED INCOMING FROM THIS DEVICE PERSPECTIVE
		midiInputPortName: "",
		midiOutputPortName: "",
    received: 0,
    sent: 0,
    activeConnections: 0,
  },
	methods: 
	{
		pauseMIDIEngine: function() 
		{
			window.location.href = "./paused.html";
		}
	},
  computed: {
    url() {
      return this.baseUrl + '#' + roomId
    },
    currentInput() {
      return this.selectedInput
    },
    currentOutput() {
      return this.selectedOutput
    },
  },
  watch: {
    selectedInput: {
      handler(nextValue, currentValue) {
        this.currentInputPort = nextValue != null ? this.midiAccess.inputs.get(nextValue) : null
        console.log('currentInputPort =>', this.currentInputPort);
				if ( this.currentInputPort ) 
				{
					this.currentInputPort.open(); console.log( 'currentInputPort open' );
				}
      },
      immediate: true
    },
    selectedOutput: {
      handler(nextValue, currentValue) {
        this.currentOutputPort = nextValue != null ? this.midiAccess.outputs.get(nextValue) : null
        console.log('currentOutputPort =>', this.currentOutputPort)
      },
      immediate: true
    },
    currentInputPort: {
      handler(nextValue, currentValue) {
        if (currentValue) {
          currentValue.onmidimessage = () => {}
        }
        if (nextValue) {
          nextValue.onmidimessage = (e) => {
            this.sent ++
            peers.forEach(peer => {
              p2pt.send(peer, { data: [...e.data] })
            })
          }
        }
      },
      immediate: true
    },
  },
  async mounted() {
    const updateStats = () => {
      this.activeConnections = peers.size
    }
    p2pt.on('trackerwarning', (error, stats) => {
      console.warn('trackerwarning =>', error, stats)
    })
    p2pt.on('trackerconnect', (tracker, stats) => {
      //console.log('trackerconnect =>', tracker, stats)
    })
    p2pt.on('peerconnect', (peer) => {
      console.log('peerconnect =>', peer)
      peers.add(peer)
      updateStats()
    })
    p2pt.on('peerclose', (peer) => {
      console.log('peerclose =>', peer)
      peers.delete(peer)
      updateStats()
    })
		
    p2pt.on
		(
			'msg', ( peer, message ) => 
			{
				
				// console.log( 'received from p2p <= ' + JSON.stringify( peer ) + ", data: " + message.data );
				
				this.received++;
				
				if ( this.currentOutputPort ) 
				{
					this.currentOutputPort.send( message.data );
				}
			}
		);
		
    p2pt.start()
    window.p2pt = this.p2pt = p2pt
    
		try 
		{
			
      const access = this.midiAccess = await navigator.requestMIDIAccess( { sysex: false, software: true } );
      
			const refreshPorts = () => 
			{
        this.availableInputs = getKeys( access.inputs ).map(key => ({
          key,
          name: access.inputs.get(key).name
        }))
        this.availableOutputs = getKeys( access.outputs ).map(key => ({
          key,
          name: access.outputs.get(key).name
        }))
      };
			
      access.onstatechange = refreshPorts;
			
      refreshPorts();
			
			const bindToPorts = () => 
			{
				
				this.currentInputPort  = matchName( access.inputs, this.hardCodedNameInput );
				this.currentOutputPort = matchName( access.outputs, this.hardCodedNameOutput );
				
				console.log( 'bindToPorts(): currentInputPort =>', this.currentInputPort );
				console.log( 'bindToPorts(): currentOutputPort =>', this.currentOutputPort );
				
				this.midiInputPortName  = this.currentInputPort.name;
				this.midiOutputPortName = this.currentOutputPort.name;
				
			};
			
			bindToPorts();
			
    }
		catch (e) 
		{
      console.log( 'Failed to request MIDI access! ' + e )
      this.error = ( 'Failed to request MIDI access! ' + e )
    }
		
  }
})

function getKeys( portMap ) 
{
  const keys = [];
  const iterator = portMap.keys();
  
	for (;;) 
	{
    const { done, value: key } = iterator.next();
    if ( done ) break;
    keys.push( key );
  }
	
  return keys;
	
}



function matchName( portMap, toMatch )  
{
	
  var port_key = null;
	var port = null;
  const iterator = portMap.keys();
  
	for (;;) 
	{
    const { done, value: key } = iterator.next();
    if ( done ) break;
		
		port = portMap.get( key );
		
		//console.log( "matchName(): port: " + port.name );
		
		if ( port.name === toMatch )
		{
			port_key = key;
			break;
		}
  }
	
  return port;
	
}
