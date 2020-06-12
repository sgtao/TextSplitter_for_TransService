'use strict';

var textarea_source = document.querySelector('#editarea');
var button_split = document.querySelector('#split');
var button_flush = document.querySelector('#flush');
var source_text=""; 
var result_area = document.querySelector('#results');
var initial_element = "";

// subfunction for debug
function show_charcode(textstring){
  for (let c of textstring){
    console.log(c," : char code = ",c.charCodeAt(0).toString(16));
  }
}

// convert text to strings array.
function split_textstrings(textstring) {
  // dummy function
  let str_array = ["hogehoge.","foobar."];
  return str_array; 
}

// add splited text to target element by appendChild
function add_split_text(target, str) {
  let add_div = document.createElement('div');
  let add_hr = document.createElement('hr');
  add_div.setAttribute("class", "split_str");
  add_div.textContent = str;
  target.appendChild(add_div);
  target.appendChild(add_hr);
}

// invoke split text
button_split.addEventListener('click', () => {
  source_text = textarea_source.value;
  // console.dir(source_text);
  // show_charcode(source_text);

  // split source text to each one sentense.
  let str_array = new Array();
  str_array = split_textstrings(source_text);

  // show sentenses at each textboxs
  flush_Result_area();
  for (let i in str_array) {
    console.log(`${i} : ${str_array[i]}`);
    add_split_text(result_area, `${i} : ${str_array[i]}`);
  }

});

// rewrite target by initial string
function flush_Result_area() {
  result_area.innerHTML = initial_element;
}
// invoke flush Result
button_flush.addEventListener('click', () => {
  flush_Result_area();
});


window.onload = () =>{
  initial_element = result_area.innerHTML;
}

