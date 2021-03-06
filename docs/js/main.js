'use strict';

var textarea_source = document.querySelector('#editarea');
var button_split = document.querySelector('#split');
var button_flush = document.querySelector('#flush');
var result_area = document.querySelector('#results');
var separate_cond = document.querySelector('#separate_cond');
var source_text=""; 
var initial_element = "";
var separate_quate; // number of words for add separetor

// subfunction for debug
function show_charcode(textstring){
  for (let c of textstring){
    console.log(c," : char code = ",c.charCodeAt(0).toString(16));
  }
}

// convert text to strings array.
function split_textstrings(textstring) {
  let str_array = [];
  let tmp_str = '';
  let head_sentence= true, next_sentence = false;
  let cnt_newline = 0;

  function update_next_sentence(str_array, tmp_str) {
    str_array.push(tmp_str);
    head_sentence = true;
    next_sentence = false;
    cnt_newline = 0;
    return '';
  }

  for (let i = 0; i < textstring.length; i++) {
    let c_char = textstring.charAt(i);
    let c_code = textstring.charCodeAt(i);
    let n_code = textstring.charCodeAt(i+1);; // code of next charactor
    // console.log(c_char, " : char code = ", c_code.toString(16));

    // 1文字ずつ「result」に格納していく
    if (c_code === 0x0a) { 
      if (cnt_newline > 2) { // newline twice, update sentence
        tmp_str = update_next_sentence(str_array, tmp_str);
      } else {
        cnt_newline++;
      }
      continue;
    } // if newline, skip
    if (c_code === 0x20 && head_sentence === true) { continue; } // if space at head of sentence, skip
    tmp_str += c_char;

    // update newline flag
    if (c_code === 0x2e && head_sentence === true) { continue; } // if priod at head of sentence, no change newline flag }
    if ((c_code >= 0x30 && c_code <= 0x39) && head_sentence === true) { continue; } // if number at head of sentence, no change newline flag }
    head_sentence = false;

    // console.log(tmp_str);

    // if period , update next sentence.
    if (c_code === 0x2e && head_sentence === false) { 
      // next is space or newline, update sentence
      if (n_code === 0x20 || n_code === 0x0a) { 
        tmp_str =  update_next_sentence(str_array, tmp_str);
      }
    }
    // if double-quatation, update next sentence.
    if (c_code === 0x3b && head_sentence === false) {
      tmp_str = update_next_sentence(str_array, tmp_str);
    }
  }

  // let str_dummy = ["hoge  hoge.", "foobar."]; // for dummy
  str_array.push(tmp_str);
  return str_array;
}

// add splited text to target element by appendChild
function make_split_text(target, str) {
  let add_textarea = document.createElement('textarea');
  add_textarea.setAttribute("class", "split_text");
  add_textarea.setAttribute("rows", "3");
  add_textarea.setAttribute("cols", "70%");
  add_textarea.textContent = str + '\n';
  return add_textarea;
}
function add_split_text(target, str) {
  let tmp_str;
  tmp_str = target.textContent + str + '\n';
  target.textContent = tmp_str;
}
function add_separator(target) {
  let add_hr = document.createElement('hr');
  target.appendChild(add_hr);
}
function add_copy_button(button_id, copy_target_id) {
  let add_btn = document.createElement('span');
  add_btn.setAttribute("id", button_id);
  add_btn.setAttribute("class", "copy_btn");
  add_btn.textContent = "Copy.";

  add_btn.addEventListener('click', ()=>{
    let copyText = document.querySelector(copy_target_id);
    copyText.select();
    document.execCommand("copy");
    console.log('Copy : #', copy_target_id );
  });

  return add_btn;
}
// invoke split text
button_split.addEventListener('click', () => {
  source_text = textarea_source.value;
  separate_quate  = separate_cond.value;

  // split source text to each one sentense.
  let str_array = new Array();
  str_array = split_textstrings(source_text);

  // show sentenses at each textarea
  let sum_of_words = 0, nth_textarea = 1;
  let add_separate, add_text_area, add_copy_btn;
  flush_Result_area();
  for (let i in str_array) {
    console.log(`${i} : ${str_array[i]}`);
    // add_split_text(result_area, `${str_array[i]}`);
    if (sum_of_words === 0) {
      console.log("No. ", nth_textarea++);
      add_separate = document.createElement('div');
      add_separate.setAttribute("class", "add_sparate");
      add_text_area = make_split_text(result_area, `${str_array[i]}`);
      add_text_area.setAttribute('id',"split_textarea" + nth_textarea);
      add_copy_btn = add_copy_button("copy_btn" + nth_textarea, "#split_textarea" + nth_textarea);
      add_separate.appendChild(add_copy_btn);
      add_separate.appendChild(add_text_area);
      result_area.appendChild(add_separate);
    } else {
      add_split_text(add_text_area, `${str_array[i]}`);
    }
    sum_of_words += str_array[i].length;
    if (sum_of_words> separate_quate) {
      sum_of_words = 0;
    }
  }
});

// rewrite target by initial string
function flush_Result_area() {
  result_area.innerHTML = initial_element;
}
// invoke flush Result
button_flush.addEventListener('click', () => {
  textarea_source.value = '';
  flush_Result_area();
});


window.onload = () =>{
  initial_element = result_area.innerHTML;
}

