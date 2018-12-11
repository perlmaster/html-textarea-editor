////////////////////
//
// File      : editor.js
//
// Purpose   : Collection of functions for javascript textarea editor.
//
////////////////////

////////////////////
// Function  : debug_print
//
// Purpose   : Conditionally disply a debugging message
//
// Inputs    : message - the message to be displayed
//
// Output    : an alert with the requested message
//
// Returns   :
//
// Example   : debug_print("Number of lines is " + count + "\n");
//
// Notes     : (none)
////////////////////

function debug_print(message)
{
	if ( editor_debug_mode > 0 ) {
		alert(message);
	}
	return;
}

////////////////////
// Function  : init_editor
//
// Purpose   : Do init for editing session.
//
// Inputs    : curr_field - id of TEXTAREA containing text to be edited
//             hidden_div_id - id of hidden divider
//             marker_id - create hidden divider after this element
//             divider_width - width of editor divider
//             background_color - optional background color for editing area
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <button onclick="init_editor('current_text','hidden_div_1','marker','60%',''">
//             <button onclick="init_editor('current_text','hidden_div_1','marker','60%','orange')">
//
// Notes     : (none)
////////////////////

function init_editor(curr_text,hidden_div_id,marker_id,divider_width,background_color)
{
	var buffer;
	var workspace_text;
	var index;
	editor_current_text = curr_text;

	var editor_div2_lines = new Array(
"<BR>" ,
"<TABLE border='0' cellspacing='0' ellpadding='3'>" ,
"<THEAD>" ,
"</THEAD>" ,
"<TBODY>" ,
"<TR style='vertical-align: top;'>" ,
"<TD>" ,
"<TEXTAREA name='editor_workspace_area' id='editor_workspace_area'" ,
"style='background-color: tan; color: black; font-family: Courier New;" ,
"font-size: 16px; font-weight: bold;" ,
"scrollbar-base-color: saddlebrown; scrollbar-arrow-color: black; scrollbar-track-color: lightsteelblue;" ,
"border-style: solid; border-width: 1px; padding: 5px;'" ,
"title='Template Contents Preview'" ,
"rows='20' COLS='80'>" ,
"</TEXTAREA>" ,
"</TD>" ,
"<TD width='20px'>&nbsp;</TD>" ,
"<TD>" ,

"<TABLE border='0' cellspacing='0' cellpadding='3'>" ,
"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('Old Text Pattern','New Text','Change Text','Change Text')\"; value='Change Text' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('Search Pattern','-----','Delete Lines','Delete Lines')\"; value='Delete Lines' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('Search Pattern','-----','Find Text','Find Text')\"; value='Find Text' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick='set_labels_and_cmd('---','---','Reset Workspace Text'); value='Reset Workspace Text' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick='set_labels_and_cmd('---','---','Save Workspace Text'); value='Save Workspace Text' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('New Background Color','-----','Change Background Color')\"; value='Change Background Color' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('New Text Color','-----','Change Text Color')\"; value='Change Text Color' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('New Font Size','-----','Change Font Size')\"; value='Change Font Size' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('New Rows Count','-----','Change Number of Rows')\"; value='Change Number of Rows' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('New Columns Count','-----','Change Number of Cols')\"; value='Change Number of Cols' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick='cmd_invert_search_mode();' value='Invert search Mode' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick='cmd_show_history();' value='Show Commands History' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick='cmd_undo_changes();' value='Undo Changes' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick='cmd_close_editor();' value='Close Editor' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('New Line Text','-----','Add Line')\"; value='Add Line' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('First Line To Be Copied','Last Line To Be Copied','Copy To Clipboard')\"; value='Copy To Clipboard' />" ,
"</TD></TR>" ,

"<TR><TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('---','---','Show Clipboard Data')\"; value='Show Clipboard Data' />" ,
"</TD>" ,
"<TD>" ,
"<INPUT class='button1' type='button' onclick=\"set_labels_and_cmd('Line Number','-----','Paste From Clipboard')\"; value='Paste From Clipboard' />" ,
"</TD></TR>" ,

"<TR><TD style='text-align: center;' colspan='2'>" ,
"<INPUT class='button2' id='execute_button' type='button' onclick='cmd_execute();' value='Execute Command' />" ,
"</TD>" ,
"</TR>" ,

"<TR><TD colspan='2'>&nbsp;</TD></TR>" ,

"<TR><TD>" ,
"<span id='label1' name='label1'>Parameter 1</span>" ,
"</TD>" ,
"<TD><input type='text' title='1st parameter' id='input1' name='input1' size='27' />" ,
"</TD></TR>" ,
"<TR><TD>" ,
"<span id='label2' name='label2'>Parameter 2</span>" ,
"</TD>" ,
"<TD><input type='text' title='2nd parameter' id='input2' name='input2' size='27' />" ,
"</TD></TR>" ,

"</TABLE>" ,
"</TD>" ,
"</TR>" ,
"</TBODY>" ,
"</TABLE>"
);
	var num_editor_div2_lines = editor_div2_lines.length;

	editor_divider_id = hidden_div_id;

	var editor_div = document.createElement("div");
	editor_div.id = editor_divider_id;
	editor_div.style.display = "block";
	editor_div.style.border = "2px solid green";
	//  editor_div.style.paddingTop = "0";
	//  editor_div.style.paddingBottom = "0";
	//  editor_div.style.padding = "0px 0 0 0";

	var marker = document.getElementById(marker_id);
	marker.parentNode.insertBefore(editor_div,marker);

	editor_datalines = document.getElementById(curr_text).value.split("\n");
	editor_num_datalines = editor_datalines.length;
	debug_print( editor_num_datalines + " lines were found in source area\n");

	buffer = "";
	for ( index = 0 ; index < num_editor_div2_lines ; ++index ) {
		buffer += editor_div2_lines[index];
	}
	buffer += "<BR><BR>";
	editor_div.innerHTML = buffer;

	var br1 = document.createElement("BR");
	document.getElementById(editor_divider_id).appendChild(br1);

	workspace_text = "";
	var num_workspace_bytes = 0;
	for ( var row_index = 1 ; row_index <= editor_num_datalines ; row_index++ ) {
		buffer = right_justify_number(row_index,editor_line_number_width," ");
		buffer += ". " + editor_datalines[row_index-1];
		console.log("Line (" + row_index + ") is : " + buffer + "\n");
		num_workspace_bytes += buffer.length;
		workspace_text += buffer;
		if ( row_index < editor_num_datalines ) {
			workspace_text += "\n";
		}
	}  // FOR loop creating table rows
	document.getElementById(editor_workspace_area_id).value = workspace_text;
	if ( background_color != "" ) {
		document.getElementById(editor_workspace_area_id).style.background = background_color;
	}
	editor_prevlines = "";
	editor_commands_history = new Array();

	document.getElementById(editor_workspace_area_id).readOnly = true;
	return;
} // end of init_editor

////////////////////
// Function  : reset_parameter_labels
//
// Purpose   : Execute a chaneg text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : reset_parameter_labels();
//
// Notes     : (none)
////////////////////

function reset_parameter_labels()
{

	document.getElementById('label1').innerHTML = "Parameter 1";
	document.getElementById('label2').innerHTML = "Parameter 2";
	return;
} // end of reset_parameter_labels

////////////////////
// Function  : set_labels
//
// Purpose   : Close editing session.
//
// Inputs    : $_[0] - text for 1st label
//             $_[1] - text for 2nd label
//
// Output    : (none)
//
// Returns   : nothing
//
// Example   : set_labels('label1 text','label2 text');
//
// Notes     : (none)
////////////////////

function set_labels(label1_text,label2_text)
{
	document.getElementById('label1').innerHTML = label1_text;
	document.getElementById('label2').innerHTML = label2_text;

	return;
} // end of set_labels

////////////////////
// Function  : set_labels_and_cmd
//
// Purpose   : Set the command parameter labels and the command choice
//
// Inputs    : $_[0] - text for 1st label
//             $_[1] - text for 2nd label
//             $_[2] - command choice
//
// Output    : (none)
//
// Returns   : nothing
//
// Example   : set_labels_and_cmd('label1 text','label2 text','Change Text');
//
// Notes     : (none)
////////////////////

function set_labels_and_cmd(label1_text,label2_text,cmd)
{
	document.getElementById('label1').innerHTML = label1_text;
	document.getElementById('label2').innerHTML = label2_text;
	editor_command = cmd;
	document.getElementById('execute_button').value = 'Execute ' + cmd;

	return;
} // end of set_labels_and_cmd

////////////////////
// Function  : cmd_change_text
//
// Purpose   : Execute a change text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_change_text()">
//
// Notes     : (none)
////////////////////
//
function cmd_change_text()
{
	var param1 = document.getElementById('input1');
	var param2 = document.getElementById('input2');

	if ( param1.value == "" ) {
		alert("No value specified for 'old text'");
		return;
	}

	if ( param2.value == "" ) {
		alert("No value specified for 2nd parameter");
		return;
	}

	var old_text = param1.value;

	var new_text = param2.value;

	editor_commands_history.push("Change text : '" + old_text + "' to '" + new_text);
	change_table_text(old_text,new_text,editor_workspace_area_id);

	return;
} // end of cmd_change_text

////////////////////
// Function  : cmd_delete_lines
//
// Purpose   : Execute a delete text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_delete_lines()">
//
// Notes     : (none)
////////////////////
//
function cmd_delete_lines()
{
	var param1 = document.getElementById('input1');

	if ( param1.value == "" ) {
		alert("No value specified for 'old text'");
		return;
	}

	var old_text = param1.value;

	editor_commands_history.push("Delete text matching : '" + old_text + "'");
	delete_table_text(old_text,editor_workspace_area_id);

	return;
} // end of cmd_delete_lines

////////////////////
// Function  : cmd_find_text
//
// Purpose   : Execute a find text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_find_text()">
//
// Notes     : (none)
////////////////////

function cmd_find_text()
{
	var line_number;
	var text_buffer;
	var num_matches;
	var message;
	var lines_index;
	var regex1;
	var old_text = document.getElementById('input1').value;

	if ( old_text == "" ) {
		alert("No value specified for 'old text'");
		return;
	}
	if ( search_mode == 'i' ) {
		regex1 = new RegExp(old_text,'gi');
	}
	else {
		regex1 = new RegExp(old_text,'g');
	}
	editor_commands_history.push("Find text matching : '" + old_text +
				"' , search_mode is '" + search_mode + "'");

	var text_lines = document.getElementById(editor_workspace_area_id).value.split("\r\n");
	var num_text_lines = text_lines.length;
	num_matches = 0;
	message = "";

	for ( lines_index = 1 ; lines_index <= num_text_lines ; ++lines_index ) {
		line_number = right_justify_number(lines_index,editor_line_number_width," ");
		line_number += ". ";
		text_buffer = text_lines[lines_index-1];
		// text_buffer = text_buffer.substr(editor_line_number_width+2);
		if ( text_buffer.search(regex1) >= 0 ) {
			num_matches += 1;
			message += "\n" + text_buffer;
		}
		else {
		}
	} // FOR loop over all lines

	if ( num_matches > 0 ) {
		alert("Found matches on " + num_matches + " line(s) for '" + old_text + "'" + "\n" + message);
	}
	else {
		alert("No matches found for '" + old_text + "'");
	}

	return;
} // end of cmd_find_text

////////////////////
// Function  : cmd_reset_workspace_text
//
// Purpose   : Execute a reset workspace text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_reset_workspace_text()">
//
// Notes     : (none)
////////////////////

function cmd_reset_workspace_text()
{
	editor_commands_history.push("Reset workspace from original text");
	reset_workspace_text(editor_workspace_area_id);

	return;
} // end of cmd_reset_workspace_text

////////////////////
// Function  : cmd_save_workspace_text
//
// Purpose   : Execute a save workspace text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_save_workspace_text()">
//
// Notes     : (none)
////////////////////

function cmd_save_workspace_text()
{
	editor_commands_history.push("Save workspace text bac to original textarea");
	save_workspace_text(editor_workspace_area_id);

	return;
} // end of cmd_save_workspace_text

////////////////////
// Function  : cmd_close_editor
//
// Purpose   : Execute a save workspace text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_close_editor()">
//
// Notes     : (none)
////////////////////

function cmd_close_editor()
{
	var reply = confirm("Confirm your close request");
	editor_commands_history.push("Close Editor");
	if ( reply == true ) {
		close_editor();
	}

	return;
} // end of cmd_close_editor

////////////////////
// Function  : cmd_add_line
//
// Purpose   : Execute a save workspace text command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_add_line()">
//
// Notes     : (none)
////////////////////

function cmd_add_line()
{
	var line_number;
	var count;
	var after_line_number;
	var text_buffer;
	var line_index;
	var line_index_2;
	var num_new_lines;
	var new_lines = new Array();
	var new_line_text = document.getElementById('input1').value;
	if ( new_line_text == "" ) {
		alert("No value specified for 'new line text'");
		return;
	}

	var after_line_number = document.getElementById('input2').value;
	if ( after_line_number == "" ) {
		alert("No value specified for 'line number'");
		return;
	}

    if ( after_line_number.search(/^[0-9][0-9]*$/) >= 0 ) {
		alert("Add new line after line " + after_line_number);
    }
    else {
        alert("Invalid row number '" + after_line_number + "'");
		return;
    }

	var text_lines = document.getElementById(editor_workspace_area_id).value.split("\r\n");
	var num_text_lines = text_lines.length;

	var textarea = "";
	num_new_lines = 0;
	line_index_2 = 0;
	if ( after_line_number == 0 ) {
		line_number = right_justify_number(1,editor_line_number_width," ");
		line_number += ". ";
		num_new_lines += 1;
		new_lines.push(new_line_text);
		line_index_2 = 1;
	}
	for ( line_index = 0 ; line_index < num_text_lines ; ++line_index , ++line_index_2 ) {
		line_number = right_justify_number(line_index_2+1,editor_line_number_width," ");
		line_number += ". ";
		text_buffer = text_lines[line_index];
		text_buffer = text_buffer.substr(editor_line_number_width+2);
		bufflen = text_buffer.length;
		num_new_lines += 1;
		new_lines.push(text_buffer);
		if ( after_line_number == 1+line_index ) {
			line_number = right_justify_number(1+line_index_2,editor_line_number_width," ");
			line_number += ". ";
			num_new_lines += 1;
			new_lines.push(new_line_text);
			line_index_2 += 1;
		}
	} // FOR loop over all lines

	textarea = "";
	var num_workspace_bytes = 0;
	count = new_lines.length;
	for ( index = 1 ; index <= count ; ++index ) {
		line_number = right_justify_number(index,editor_line_number_width," ");
		line_number += ". ";
		text_buffer = new_lines[index-1];
		textarea += line_number + text_buffer;
		if ( index < count ) {
			textarea += "\n";
		}
		num_workspace_bytes = textarea.length;
	} // FOR loop over all lines
	debug_print("New text area contents\n\n" + textarea);

	editor_prevlines = document.getElementById(editor_workspace_area_id).value;
	document.getElementById(editor_workspace_area_id).value = textarea;

	return;
} // end of cmd_add_line

////////////////////
// Function  : cmd_change_bg_color
//
// Purpose   : Execute a change bg color command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_change_bg_color()">
//
// Notes     : (none)
////////////////////

function cmd_change_bg_color()
{
	var param1 = document.getElementById('input1');

	if ( param1.value == "" ) {
		alert("No value specified for 'background color'");
		return;
	}

	var new_color = param1.value;
	editor_commands_history.push("Change background color to '" + new_color + "'");
	change_background_color(new_color,editor_workspace_area_id);

	return;
} // end of cmd_change_bg_color

////////////////////
// Function  : cmd_change_text_color
//
// Purpose   : Execute a change text color command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_change_text_color()">
//
// Notes     : (none)
////////////////////

function cmd_change_text_color()
{
	var param1 = document.getElementById('input1');

	if ( param1.value == "" ) {
		alert("No value specified for 'text color'");
		return;
	}

	var new_color = param1.value;
	editor_commands_history.push("Change text color to '" + new_color + "'");
	change_text_color(new_color,editor_workspace_area_id);

	return;
} // end of cmd_change_text_color

////////////////////
// Function  : cmd_change_font_size
//
// Purpose   : Execute a change font size command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_change_font_size()">
//
// Notes     : (none)
////////////////////

function cmd_change_font_size()
{
	var param1 = document.getElementById('input1');

	if ( param1.value == "" ) {
		alert("No value specified for 'font size'");
		return;
	}

	var font_size = param1.value;
	editor_commands_history.push("Change text font size to '" + font_size + "'");
	change_font_size(font_size,editor_workspace_area_id);

	return;
} // end of cmd_change_font_size

////////////////////
// Function  : cmd_change_num_rows
//
// Purpose   : Execute a change number of rows command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_change_num_rows()">
//
// Notes     : (none)
////////////////////

function cmd_change_num_rows()
{
	var param1 = document.getElementById('input1');

	if ( param1.value == "" ) {
		alert("No value specified for 'rows count'");
		return;
	}

	var rows_count = param1.value;
	editor_commands_history.push("Change workspace number of rows to '" + rows_count + "'");
	change_rows_count(rows_count,editor_workspace_area_id);

	return;
} // end of cmd_change_num_rows

////////////////////
// Function  : cmd_change_num_cols
//
// Purpose   : Execute a change number of cols command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_change_num_cols()">
//
// Notes     : (none)
////////////////////

function cmd_change_num_cols()
{
	var cols_count = document.getElementById('input1').value;

	if ( cols_count == "" ) {
		alert("No value specified for 'cols count'");
		return;
	}

	editor_commands_history.push("Change workspace number of columns to '" + cols_count + "'");
	change_cols_count(cols_count,editor_workspace_area_id);

	return;
} // end of cmd_change_num_cols

////////////////////
// Function  : cmd_invert_search_mode
//
// Purpose   : Execute a invert serch mode command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : cmd_invert_search_mode();
//
// Notes     : (none)
////////////////////

function cmd_invert_search_mode()
{
	if ( search_mode == 'i' ) {
		search_mode = 's';
		alert("Search mode is now case sensitive");
	}
	else {
		search_mode = 'i';
		alert("Search mode is now case insensitive");
	}
	editor_commands_history.push("Search mode changed to '" + search_mode + "'");

	return;
} // end of cmd_invert_search_mode

////////////////////
// Function  : cmd_undo_changes
//
// Purpose   : Execute a invert serch mode command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : cmd_undo_changes();
//
// Notes     : (none)
////////////////////

function cmd_undo_changes()
{
	editor_commands_history.push("Undo Changes");
	undo_modification(editor_workspace_area_id);

	return;
} // end of cmd_undo_changes

////////////////////
// Function  : cmd_show_history
//
// Purpose   : Execute a invert serch mode command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : cmd_show_history();
//
// Notes     : (none)
////////////////////

function cmd_show_history()
{
	show_commands_history();
	return;
} // end of cmd_show_history

////////////////////
// Function  : cmd_show_clipboard
//
// Purpose   : Execute a show cliupboard command
//
// Inputs    : (none)
//
// Output    : clipboard contents
//
// Returns   : ??
//
// Example   : cmd_show_clipboard();
//
// Notes     : (none)
////////////////////

function cmd_show_clipboard()
{
	var buffer;
	var line_index;

	if ( editor_clipboard_size < 1 ) {
		alert("Clipboard is currently empty");
	}
	else {
		buffer = "";
		for ( line_index = 0 ; line_index < editor_clipboard_size ; ++line_index ) {
			buffer += "\n" + editor_clipboard[line_index];
		}
		alert("There are " + editor_clipboard_size + " lines in the clipboard\n\n" + buffer);
	}
	return;
} // end of cmd_show_clipboard

////////////////////
// Function  : cmd_paste_clipboard
//
// Purpose   : Execute a show cliupboard command
//
// Inputs    : (none)
//
// Output    : clipboard contents
//
// Returns   : ??
//
// Example   : cmd_paste_clipboard();
//
// Notes     : (none)
////////////////////

function cmd_paste_clipboard()
{
	var buffer;
	var line_index;
	var paste_line = document.getElementById('input1').value;
	var t_a = document.getElementById(editor_workspace_area_id).value;
	var text_lines = t_a.split("\r\n");
	var num_text_lines = text_lines.length;
	var new_content = new Array();
	var paste_index;
	var new_count;
	var new_data;

	if ( editor_clipboard_size < 1 ) {
		alert("Clipboard is currently empty");
		return 0;
	}

	if ( paste_line == "" ) {
		alert("No value specified for 'paste line'");
		return;
	}
    if ( paste_line.search(/^[0-9][0-9]*$/) < 0 ) {
		alert("Non numeric character detected in 'paste line' value");
		return -1;
	}
	paste_line = parseInt(paste_line,10);

	// alert("There are currently " + num_text_lines + " lines in the workspace\n\n" + t_a);
	if ( paste_line == 0 ) {
		for ( paste_index = 0 ; paste_index < editor_clipboard_size ; ++paste_index ) {
			new_content.push(editor_clipboard[paste_index]);
		}
	}
	for ( line_index = 1 ; line_index <= num_text_lines ; ++line_index ) {
		text_buffer = text_lines[line_index-1];
		text_buffer = text_buffer.substr(editor_line_number_width+2);
		new_content.push(text_buffer);
		if ( line_index == paste_line ) {
			for ( paste_index = 0 ; paste_index < editor_clipboard_size ; ++paste_index ) {
				new_content.push(editor_clipboard[paste_index]);
			}
		}
	}
	new_count = new_content.length;
	new_data = "";
	debug_print("The new content has " + new_count + " lines");

	for ( line_index = 0 ; line_index < new_count ; ++line_index ) {
		text_buffer = right_justify_number(line_index+1,editor_line_number_width," ");
		text_buffer += ". ";
		new_data += text_buffer + new_content[line_index];
		if ( line_index+1 < new_count ) {
			new_data += "\n";
		}
	}
	debug_print("The new content is :\n" + new_data);
	editor_prevlines = document.getElementById(editor_workspace_area_id).value;
	document.getElementById(editor_workspace_area_id).value = new_data;

	return;
} // end of cmd_paste_clipboard

////////////////////
// Function  : cmd_copy_to_clipboard
//
// Purpose   : Execute a copy to clipboard command
//
// Inputs    : (none)
//
// Output    : (none)
//
// Returns   : ??
//
// Example   : cmd_copy_to_clipboard();
//
// Notes     : (none)
////////////////////

function cmd_copy_to_clipboard()
{
	var first_line = document.getElementById('input1').value;
	var last_line = document.getElementById('input2').value;
	var text_lines = document.getElementById(editor_workspace_area_id).value.split("\r\n");
	var num_text_lines = text_lines.length;
	var line_index;
	var text_buffer;

	if ( first_line == "" ) {
		alert("No value specified for '1st line'");
		return;
	}
    if ( first_line.search(/^[0-9][0-9]*$/) < 0 ) {
		alert("Non numeric character detected in 'first line' value");
		return -1;
	}
	first_line = parseInt(first_line,10);
	if ( first_line < 1 || first_line > num_text_lines ) {
		alert("1st line number is out of range");
		return -1;
	}

	if ( last_line == "" ) {
		alert("No value specified for last line");
		return;
	}
    if ( last_line.search(/^[0-9][0-9]*$/) < 0 ) {
		alert("Non numeric character detected in 'last line' value");
		return -1;
	}
	last_line = parseInt(last_line,10);
	if ( last_line < 1 || last_line > num_text_lines || last_line < first_line ) {
		alert("Last line number is out of range");
		return -1;
	}

	debug_print("Copy lines " + first_line + " - " + last_line + " to the clipboard");
	editor_clipboard.length = 0;  // empty out current contents
	editor_clipboard_size = (last_line - first_line) + 1;
	for ( line_index = first_line - 1 ; line_index < last_line ; ++line_index ) {
		text_buffer = text_lines[line_index];
		text_buffer = text_buffer.substr(editor_line_number_width+2);
		editor_clipboard.push(text_buffer);
	}

	return;
} // end of cmd_copy_to_clipboard

////////////////////
// Function  : close_editor
//
// Purpose   : Close editing session.
//
// Inputs    : (none)
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <button onclick="close_editor()">
//
// Notes     : (none)
////////////////////

function close_editor()
{
	var div = document.getElementById(editor_divider_id);
	div.parentNode.removeChild(div);
	// hide_divider(editor_divider_id);
} // end of close_editor

////////////////////
// Function  : revert_text
//
// Purpose   : Revert TEXTAREA back to original value.
//
// Inputs    : source_text - id of source text
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : revert_text('source');
//
// Notes     : (none)
////////////////////

function revert_text(source_text)
{
	document.getElementById(editor_current_text).value = document.getElementById(source_text).value;
	alert("TEXTAREA has been restored to its original value.");
} // end of revert_text

////////////////////
// Function  : change_table_text
//
// Purpose   : Change the text in a TEXTAREA.
//
// Inputs    : old_text_pattern - id of old text pattern
//             new_text - id of new text
//             textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <button onclick="change_table_text('old_text','new_text',editor_workspace_area_id)">Change Text</button>
//
// Notes     : (none)
////////////////////

function change_table_text(old_text,new_text,textarea_id)
{
	var index;
	var num_matches;
	var regex1;
	var message;
	var text_lines;
	var num_text_lines;
	var text_buffer;
	var new_buffer;
	var textarea;
	var changed_lines;
	var line_number;

	num_matches = 0;
	message = "line(s) : ";
	sep = "";
	if ( search_mode == 'i' ) {
		regex1 = new RegExp(old_text,'gi');
	}
	else {
		regex1 = new RegExp(old_text,'g');
	}

	// text_lines = document.getElementById(textarea_id).value.split("\r\n");
	text_lines = document.getElementById(textarea_id).value.split("\n");
	num_text_lines = text_lines.length;
	debug_print("change text requested\nold text is '" + old_text + "'\nnew text is '" +
			new_text + "'\nnum_text_lines = " + num_text_lines + "\n" +
			"textarea_id is '" + textarea_id + "'\n");

	textarea = "";
	changed_lines = "";
	var num_workspace_bytes = 0;
	for ( index = 1 ; index <= num_text_lines ; ++index ) {
		line_number = right_justify_number(index,editor_line_number_width," ");
		line_number += ". ";
		text_buffer = text_lines[index-1];
		text_buffer = text_buffer.substr(editor_line_number_width+2);
		bufflen = text_buffer.length;
		if ( text_buffer.search(regex1) >= 0 ) {
			message += sep + index;
			sep = " , ";
			num_matches += 1;
			new_buffer = text_buffer.replace(regex1,new_text);
			new_buffer = line_number + new_buffer;
			textarea += new_buffer + "\n";
			// textarea += new_buffer + "\n";
			changed_lines += new_buffer + "\n";
		}
		else {
			// not found in row
			new_buffer = line_number + text_buffer;
			num_workspace_bytes += new_buffer.length;

			textarea += new_buffer;
				textarea += "\n";
			}
		num_workspace_bytes = textarea.length;
	} // FOR loop over all lines

	if ( num_matches > 0 ) {
		// found it
		message += "\n\n" + changed_lines;
		alert("Found matches on " + num_matches + " line(s) for '" + old_text + "'" + "\n\n" + message );
		editor_prevlines = document.getElementById(textarea_id).value;
		document.getElementById(textarea_id).value = textarea;
	}
	else {
		alert("Found matches on " + num_matches + " line(s) for '" + old_text + "'" + "\n\n" + message );
	}
} // end of change_table_text

////////////////////
// Function  : delete_table_text
//
// Purpose   : Delete lines matching a pattern.
//
// Inputs    : old_text_pattern - id of old text pattern
//             textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <button onclick="delete_table_text('old_text',editor_workspace_area_id)">Delete Text</button>
//
// Notes     : (none)
////////////////////

function delete_table_text(old_text,textarea_id)
{
	var index;
	var count;
	var num_matches;
	var message;
	var text_lines;
	var num_text_lines;
	var text_buffer;
	var textarea;
	var num_new_lines;
	var new_lines = new Array();
	var line_number;
	var regex1;

	if ( search_mode == 'i' ) {
		regex1 = new RegExp(old_text,'gi');
	}
	else {
		regex1 = new RegExp(old_text,'g');
	}

	num_matches = 0;
	message = "line(s) : ";
	sep = "";

	text_lines = document.getElementById(textarea_id).value.split("\r\n");
	num_text_lines = text_lines.length;

	textarea = "";
	changed_lines = "";
	num_new_lines = 0;
	for ( index = 1 ; index <= num_text_lines ; ++index ) {
		line_number = right_justify_number(index,editor_line_number_width," ");
		line_number += ". ";
		text_buffer = text_lines[index-1];
		text_buffer = text_buffer.substr(editor_line_number_width+2);
		bufflen = text_buffer.length;
		if ( text_buffer.search(regex1) >= 0 ) {
			num_matches += 1;
		}
		else {
			num_new_lines += 1;
			new_lines.push(text_buffer);
		}
	} // FOR loop over all lines

	if ( num_matches > 0 ) {
		// found it
		count = new_lines.length;
		alert("Found matches on " + num_matches + " line(s) for '" + old_text + "'" + "\n" +
						count + " lines remain");
		if ( count < 1 ) {
			alert("All lines were deleted.");
		}
		else {
			textarea = "";
			var num_workspace_bytes = 0;
			for ( index = 1 ; index <= count ; ++index ) {
				line_number = right_justify_number(index,editor_line_number_width," ");
				line_number += ". ";
				text_buffer = new_lines[index-1];
				textarea += line_number + text_buffer;
				if ( index < count ) {
					textarea += "\n";
				}
				num_workspace_bytes = textarea.length;
			} // FOR loop over all lines
			editor_prevlines = document.getElementById(textarea_id).value;
			document.getElementById(textarea_id).value = textarea;
		}
	}
	else {
		alert("No matches found.");
	}
	return;
} // end of delete_table_text

////////////////////
// Function  : change_background_color
//
// Purpose   : Change the background color of the workspace area.
//
// Inputs    : new_color - new background color
//             textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : change_background_color(new_color,textarea_id);
//
// Notes     : (none)
////////////////////

function change_background_color(new_color,textarea_id)
{
	document.getElementById(textarea_id).style.background = new_color;
	return;
} // end of change_background_color

////////////////////
// Function  : change_text_color
//
// Purpose   : Change the text color of the workspace area.
//
// Inputs    : new_color - new text color
//             textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : change_text_color(new_color,textarea_id);
//
// Notes     : (none)
////////////////////

function change_text_color(new_color,textarea_id)
{
	document.getElementById(textarea_id).style.color = new_color;
	return;
} // end of change_text_color

////////////////////
// Function  : undo_modification
//
// Purpose   : Undo the previous modification.
//
// Inputs    : textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : undo_modification(editor_workspace_area_id);
//
// Notes     : (none)
////////////////////

function undo_modification(textarea_id)
{
	if ( editor_prevlines == "" ) {
		alert("There is nothing to undo");
	}
	else {
		//  editor_commands_history.push("Undo");
		alert("Undo previous modification");
		document.getElementById(textarea_id).value = editor_prevlines;
		editor_prevlines = "";
	}
} // end of undo_modification

////////////////////
// Function  : reset_workspace_text
//
// Purpose   : Reset the workspace text from the original source.
//
// Inputs    : textarea_id - id of empty table within hidden divider
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <button onclick="reset_workspace_text(editor_workspace_area_id)">
//
// Notes     : This function is very similar to init_editor()
////////////////////

function reset_workspace_text(textarea_id)
{
	var workspace_text;
	var buffer;

	workspace_text = "";
	for ( var row_index = 1 ; row_index <= editor_num_datalines ; row_index++ ) {
		buffer = right_justify_number(row_index,editor_line_number_width," ");
		buffer += ". ";
		workspace_text += buffer + editor_datalines[row_index-1];
		if ( row_index < editor_num_datalines ) {
			workspace_text += "\n";
		} // IF
	}  // FOR loop creating table rows
	document.getElementById(textarea_id).value = workspace_text;
	alert("Workspace Text has been reset");

} // end of reset_workspace_text

////////////////////
// Function  : save_workspace_text
//
// Purpose   : Save the workspace text back to the original source.
//
// Inputs    : textarea_id - id of table containing workspace data
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <button onclick="save_workspace_text('workspace')">
//
// Notes     : This function is very similar to init_editor()
////////////////////

function save_workspace_text(textarea_id)
{
	var data;
	var rows;
	var num_rows;
	var text_buffer;
	var text_area;

	text_area = document.getElementById(textarea_id).value;

	rows = text_area.split("\r\n");
	num_rows = rows.length;

	data = "";
	for ( var row_index = 1 ; row_index <= num_rows ; row_index++ ) {
		if ( row_index < num_rows || rows[num_rows-1].length > 0 ) {
			text_buffer = rows[row_index-1];
			text_buffer = text_buffer.substr(editor_line_number_width+2);
			data += text_buffer + "\n";
		}
	}  // FOR loop deleting table rows

	document.getElementById(editor_current_text).value = data;
	alert("Workspace Text has been copied back to source area.");
} // end of save_workspace_text

////////////////////
// Function  : change_font_size
//
// Purpose   : Change font size for workspace textarea.
//
// Inputs    : font_size - new font size
//             textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : change_font_size(font_size,editor_workspace_area_id)">
//
// Notes     : (none)
////////////////////

function change_font_size(font_size,textarea_id)
{
	document.getElementById(textarea_id).style.fontSize = font_size;
} // end of change_font_size

////////////////////
// Function  : change_rows_count
//
// Purpose   : Change rows count for workspace textarea.
//
// Inputs    : rows_count_id - id of font size field
//             textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : change_rows_count(number_of_rows,editor_workspace_area_id);
//
// Notes     : (none)
////////////////////

function change_rows_count(rows_count,textarea_id)
{
    if ( rows_count.search(/^[0-9][0-9]*$/) >= 0 ) {
		document.getElementById(textarea_id).rows = rows_count;
		alert("Rows count has been changed to " + rows_count);
    }
    else {
        alert("Invalid rows count '" + rows_count + "'");
    }
} // end of change_rows_count

////////////////////
// Function  : change_cols_count
//
// Purpose   : Change cols count for workspace textarea.
//
// Inputs    : cols_count - new columns count
//             textarea_id - field id of TEXTAREA containing text lines
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : change_cols_count(num_cols,editor_workspace_area_id);
//
// Notes     : (none)
////////////////////

function change_cols_count(cols_count,textarea_id)
{
    if ( cols_count.search(/^[0-9][0-9]*$/) >= 0 ) {
		document.getElementById(textarea_id).cols = cols_count;
		alert("Cols count has been changed to " + cols_count);
    }
    else {
        alert("Invalid cols count '" + cols_count + "'");
    }
} // end of change_cols_count

////////////////////
// Function  : show_commands_history
//
// Purpose   : Show command history.
//
// Inputs    : (none)
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <button onclick="show_commands_history()">
//
// Notes     : (none)
////////////////////

function show_commands_history()
{
	var count = editor_commands_history.length;
	var index;
	var message;

	if ( count <= 0 ) {
		alert("Commands History is currently empty.");
	}
	else {
		message = count + " commands currently in history\n";
		for ( index = 0 ; index < count ; ++index ) {
			message += "\n" + editor_commands_history[index];
		}
		alert(message);
	}
} // end of show_commands_history

////////////////////
// Function  : cmd_execute
//
// Purpose   : Execute requested command
//
// Inputs    : (none)
//
// Output    : appropriate data
//
// Returns   : ??
//
// Example   : <button onclick="cmd_execute()">
//
// Notes     : (none)
////////////////////
//
function cmd_execute()
{
	switch ( editor_command ) {
	case 'Change Text':
		cmd_change_text();
		break;
	case 'Delete Lines':
		cmd_delete_lines();
		break;
	case 'Find Text':
		cmd_find_text();
		break;
	case 'Reset Workspace Text':
		cmd_reset_workspace_text();
		break;
	case 'Save Workspace Text':
		cmd_save_workspace_text();
		break;
	case 'Change Background Color':
		cmd_change_bg_color();
		break;
	case 'Change Text Color':
		cmd_change_text_color();
		break;
	case 'Change Font Size':
		cmd_change_font_size();
		break;
	case 'Change Number of Rows':
		cmd_change_num_rows();
		break;
	case 'Change Number of Cols':
		cmd_change_num_cols();
		break;
	case 'Invert search Mode':
		cmd_invert_search_mode();
		break;
	case 'Show Commands History':
		cmd_show_history();
		break;
	case 'Undo Changes':
		cmd_undo_changes();
		break;
	case 'Close Editor':
		cmd_close_editor();
		break;
	case 'Add Line':
		cmd_add_line();
		break;
	case 'Copy To Clipboard':
		cmd_copy_to_clipboard();
		break;
	case 'Show Clipboard Data':
		cmd_show_clipboard();
		break;
	case 'Paste From Clipboard':
		cmd_paste_clipboard();
		break;
	default:
		alert("Valid command not yet selected");
	} // SWITCH

	return;
} // end of cmd_execute
