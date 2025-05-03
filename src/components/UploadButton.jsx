import { useRef } from 'react';

function UploadButton({ file, setFile }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600"
      >
        Upload File
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {file && (
        <div className="mt-2 text-sm text-gray-700">
          <p><strong>File:</strong> {file.name}</p>
          {file.type.startsWith('image/') && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="mt-2 max-w-xs max-h-48 rounded border"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default UploadButton;
