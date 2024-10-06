export const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      ['bold', 'italic', 'underline'],
      // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
    //   ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      // [{ 'align': [] }],
      ['clean'] // remove formatting button
    ],

    keyboard: {
      bindings: {
        enter: {
          key: 13, // Enter key
          handler: function(range, context) {
            // Handle Enter key press inside Quill
            // console.log("Enter pressed inside Quill editor");
            // Allow the default Quill behavior (e.g., inserting new lines)
            return true;
          }
        }
      }
    }
};
