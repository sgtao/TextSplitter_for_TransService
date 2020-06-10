'use strict';

var textarea_source = document.querySelector('#editarea');
var button_split = document.querySelector('#split');
var source_text="foo"; 

function show_charcode(source_text){
  for (let c of source_text){
    console.log(c," : char code = ",c.charCodeAt(0).toString(16));
  }
}

button_split.addEventListener('click', () => {
  source_text = textarea_source.value;
  // console.dir(source_text);
  show_charcode(source_text);
});
