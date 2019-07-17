export function copyToClipboard(data) {
    console.log("copy to clipboard",data)
  var textField = document.createElement("textarea");
  textField.innerText = data;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
}

export function copyFromAceEditor(editor) {
  var sel = editor.selection.toJSON(); // save selection
  editor.selectAll();
  editor.focus();
  document.execCommand("copy");
  editor.selection.fromJSON(sel); // restore selection
}
