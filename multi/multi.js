// ON PAGE READY
window.addEventListener
(
	'DOMContentLoaded', 
	function() 
	{
		handleURLParams();
		startThreads();
		initialize_listeners();
		initialize_dom_state();
	}
);




let number_of_channels = 1;

let roomId;

const my_base_url = location.href.replace( /[\?#].*/, '' );

let room_id_hash;
let room_id_dot;
let room_id_count;

function handleURLParams()
{
	
	const roomIdMatch = location.hash.match( /^\#?([a-zA-Z0-9-]+)?(\.)?(\d*)/ );
	
	if ( roomIdMatch ) 
	{
		
		room_id_hash  = roomIdMatch[1];
		room_id_dot   = roomIdMatch[2];
		room_id_count = roomIdMatch[3];
		
		console.log( "roomIdMatch" );
		console.log( "room_id_hash" ); console.log( room_id_hash );
		console.log( "room_id_dot" ); console.log( room_id_dot );
		console.log( "room_id_count" ); console.log( room_id_count );
		console.log( "location" ); console.log( location );
		
		if ( ( typeof room_id_hash !== 'undefined' ) && ( room_id_hash != null ) && ( room_id_hash.length > 0 ) )
		{
			
			roomId = room_id_hash;
			
			if 
			( 
				( typeof room_id_dot !== 'undefined' ) && ( room_id_dot != null ) && ( room_id_dot == "." )
				&&
				( typeof room_id_count !== 'undefined' ) && ( room_id_count != null ) && ( parseInt( room_id_count ) > 0 && parseInt( room_id_count ) < 10 )
			)
			{
				number_of_channels = parseInt( room_id_count );
			}
			else 
			{
				number_of_channels = 1;
			}
			
			const connection_info = document.getElementById( 'connection-info' );
			connection_info.innerHTML = location;
			
		}
		else
		{
			initialize_proper_url_params();
		}
		
	}
	else 
	{
		initialize_proper_url_params();
	}
	
} ////// END function handleURLParams()



function initialize_proper_url_params()
{
	
	roomId = crypto.randomUUID();
	location.replace( '#' + roomId );
	window.location.reload();
	
} ////// END function initialize_proper_url_params()



function startThreads()
{
	
	const wmwrtctr_threads_container = document.getElementById( 'wmwrtctr_threads_container' );
	
	for ( let i = 1; i < ( number_of_channels + 1 ); i++ )
	{
		
		const iframe = document.createElement( 'iframe' );
		iframe.src = my_base_url + "thread.html" + "#" + room_id_hash + "." + i;
		//iframe.width = '100%';
		//iframe.height = '200px';
		iframe.className = "wmwrtctr_thread_iframe";
		
		wmwrtctr_threads_container.appendChild( iframe );
		
	}
	
} //////// END function startThreads()




function initialize_listeners()
{
	
	document.addEventListener
	(
		'click', 
		function( event ) 
		{
			
			if ( event.target.classList.contains( 'wmwrtctr_btn_plus' ) ) 
			{
        if ( number_of_channels < 9 )
				{
					const jump_to = my_base_url + "#" + room_id_hash + "." + ( number_of_channels + 1 );
					window.location.href = jump_to;
					window.location.reload();
				}
			}
			
			if ( event.target.classList.contains( 'wmwrtctr_btn_minus' ) ) 
			{
				if ( number_of_channels > 1 )
				{
					const jump_to = my_base_url + "#" + room_id_hash + "." + ( number_of_channels - 1 );
					window.location.href = jump_to;
					window.location.reload();
				}
			}
			
		}
	);
	
} ///////// END function initialize_listeners()






function initialize_dom_state()
{
	
	if ( number_of_channels == 9 )
	{
		const elements = document.querySelectorAll( '.wmwrtctr_btn_plus' );
		elements.forEach
		( 
			element => 
			{ 
				element.classList.add( 'wmwrtctr_title_butt_disabled' );
				element.disabled = true;
			} 
		);
	}
	
	if ( number_of_channels == 1 )
	{
		const elements = document.querySelectorAll( '.wmwrtctr_btn_minus' );
		elements.forEach
		( 
			element => 
			{ 
				element.classList.add( 'wmwrtctr_title_butt_disabled' );
				element.disabled = true;
			} 
		);
	}
	
} /////////// END function initialize_dom_state()















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


