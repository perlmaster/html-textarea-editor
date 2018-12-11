//
// Function  : savefile
//
// Purpose   : Write text data to a file on the local hard drive.
//
// Inputs    : f - the input form
//
// Output    : appropriate diagnostics
//
// Returns   : ??
//
// Example   : <script src="savefile.js" type="text/javascript"></script>
//             <FORM onsubmit="return savefile(this);" action="#">
//
// Notes     : (none)
//

function savefile( f ) {
 f = f.elements;  //  reduce overhead

 var w = window.frames.w;
 if( !w ) {
  w = document.createElement( 'iframe' );
  w.id = 'w';
  w.style.display = 'none';
  document.body.insertBefore( w, null );
  w = window.frames.w;
  if( !w ) {
   w = window.open( '', '_temp', 'width=100,height=100' );
   if( !w ) {
    window.alert( 'Sorry, the file could not be created.' ); return false;
   }
  }
 }

 var d = w.document,
  ext = f.ext.options[f.ext.selectedIndex],
  name = f.filename.value.replace( /\//g, '\\' ) + ext.text;

 d.open( 'text/plain', 'replace' );
 d.charset = ext.value;
 if( ext.text==='.txt' ) {
  d.write( f.txt.value );
  d.close();
 } else {  //  '.html'
  d.close();
  d.body.innerHTML = '\r\n' + f.txt.value + '\r\n';
 }

 if( d.execCommand( 'SaveAs', null, name ) ){
  window.alert( name + ' has been saved.' );
 } else {
  window.alert( 'The file has not been saved.\nIs there a problem?' );
 }
 w.close();
 return false;  //  don't submit the form
}
