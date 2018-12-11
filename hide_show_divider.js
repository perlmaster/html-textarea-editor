//
// Function  : hide_divider , show_divider , toggle_dividers
//
// Purpose   : Hide or show a divider
//
// Inputs    : the_form - the input form
//
// Output    : appropriate alerts
//
// Returns   : (nothing)
//
// Example   : <script src="hide_show_divider.js" type="text/javascript"></script>
//
// Notes     : (none)
//

function hide_divider(divider_id) {
var div_obj = document.getElementById(divider_id);
div_obj.style.display = 'none'; 
}

function show_divider(divider_id) {
var div_obj = document.getElementById(divider_id);
div_obj.style.display = 'block';
}

function toggle_dividers(first_divider,second_divider) {
var div_obj;

div_obj = document.getElementById(first_divider);
div_obj.style.display = 'none'; 

div_obj = document.getElementById(second_divider);
div_obj.style.display = 'block';
}
