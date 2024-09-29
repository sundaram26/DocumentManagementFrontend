import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ content, setContent }) => {
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 200;

  const handleEditorChange = (newContent, editor) => {
    const text = editor.getContent({ format: 'text' });
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const currentWordCount = words.length;

    if (currentWordCount <= maxWords) {
      setContent(newContent);  // Update parent component with content
      setWordCount(currentWordCount);  // Update word count
    }
  };

  return (
    <div>
      <Editor
        apiKey="59coqvucehojydng66binqphfyhvf4lm0v9jysp8xafwg3df"  // Add your TinyMCE API key
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'textcolor'  // Add the textcolor plugin
          ],
          toolbar:
            'undo redo | formatselect | bold italic forecolor backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          setup: (editor) => {
            editor.on('init', () => {
              const text = editor.getContent({ format: 'text' });
              const words = text.split(/\s+/).filter(word => word.length > 0);
              setWordCount(words.length);  // Set initial word count
            });
          }
        }}
      />
      <div className="text-right mt-2 text-gray-600">
        {wordCount}/{maxWords} words
      </div>
      <style>
        {`
          .tox-tinymce-aux {
            overflow: hidden !important;
            height: 0 !important;
          }
          .tox-tinymce-aux .tox-tinymce-aux__branding {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default RichTextEditor;
