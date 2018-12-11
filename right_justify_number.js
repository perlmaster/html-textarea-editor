////////////////////
// Function  : right_justify_number
//
// Purpose   : Right justify a number with leading characters
//
// Inputs    : number
//             num_places
//             leading_char (most likely a '0' or a ' ')
//
// Output    : (none)
//
// Returns   : formatted number
//
// Example   : <script src="right_justify_number.js" type="text/javascript"></script>
//             result = right_justify_number(number,4,'0');
//             result = right_justify_number(number,4,' ');
//
// Notes     : (none)
////////////////////

function right_justify_number(number,num_places,leading_char)
{
	var count;
	var result;
	var temp;

	temp = "";
	for ( count = 1 ; count < num_places ; ++count ) {
		temp += leading_char;
	}
	temp += number;
	result = temp.slice(-num_places);
	return result;
} // end of right_justify_number
