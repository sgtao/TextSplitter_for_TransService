'use strict';

var textarea_source = document.querySelector('#editarea');
var button_split = document.querySelector('#split');
var source_text="foo"; 

button_split.addEventListener('click', () => {
  console.log(source_text);
  source_text = textarea_source.value;
  console.log(textarea_source);
  console.log(source_text);
});
