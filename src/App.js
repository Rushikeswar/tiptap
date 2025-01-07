import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'; // Default Tiptap extensions
import TagExtension from './components/TagExtension'; // Import custom extension
import './index.css';

const App = () => {
  const [customTag, setCustomTag] = useState(''); // To hold the custom tag input
  const [tags, setTags] = useState([]); // To hold all tags (from JSON/localStorage)

  // Load tags from localStorage or set default tag if none exist
  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem('tags')) || ['example']; // Default tag "example"
    setTags(savedTags);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, TagExtension], // Include custom extension
    content: '<p>Add your text and tags here!</p>', // Default editor content
  });

  const addTag = (tag) => {
    editor.chain().focus().insertTag(tag).run(); // Use custom command
  };

  const handleTagChange = (e) => {
    setCustomTag(e.target.value); // Update the custom tag state as the user types
  };

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) { // Prevent duplicate tags

      // Save the new tag in the tags state and localStorage
      const updatedTags = [...tags, customTag];
      setTags(updatedTags);
      localStorage.setItem('tags', JSON.stringify(updatedTags)); // Save tags to localStorage

      // Clear the input field
      setCustomTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    // Remove the tag from the tags state
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);

    // Update localStorage
    localStorage.setItem('tags', JSON.stringify(updatedTags));
  };

  return (
    <div className="app">
      <h1>Custom Tiptap Extension: Tagging System</h1>
      <div className="toolbar">
        {/* Dynamically render buttons for all tags */}
        {tags.map((tag, index) => (
          <div  key={index} className="tag-item">
            <button onClick={() => addTag(tag)} className="tag-button">
              # {tag}
            </button>
            <button style={{color:"white",backgroundColor:"black"}} onClick={() => handleRemoveTag(tag)} className="remove-tag-button">
              ✖
            </button>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={customTag}
          onChange={handleTagChange}
          placeholder="Enter custom tag"
          className="tag-input"
        />
        <button style={{ backgroundColor: 'green' }} onClick={handleAddCustomTag}>
          Add Custom Tag
        </button>
      </div>

      <EditorContent editor={editor} className="editor" />
    </div>
  );
};

export default App;
