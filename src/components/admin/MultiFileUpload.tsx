
import React, { useCallback } from 'react';
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Upload, X } from 'lucide-react';
import type { FileMetadata } from "../../types/files";

interface MultiFileUploadProps {
  onFilesSelect: (metadata: FileMetadata[]) => void;
  currentValues?: FileMetadata[];
  accept?: string;
  buttonText?: string;
}

export const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  onFilesSelect,
  currentValues = [],
  accept = "image/*",
  buttonText = "Upload Files"
}) => {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    try {
      const { uploadMultipleFiles } = await import('../../utils/uploadFile');
      const metadata = await uploadMultipleFiles(Array.from(files));
      onFilesSelect([...currentValues, ...metadata]);
      toast.success("Files uploaded successfully");
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Error uploading files");
    }
  }, [onFilesSelect, currentValues]);

  const handleRemove = (indexToRemove: number) => {
    const newMetadata = currentValues.filter((_, index) => index !== indexToRemove);
    onFilesSelect(newMetadata);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentValues.map((metadata, index) => (
          <div key={metadata.id} className="relative group">
            <img 
              src={metadata.url} 
              alt={metadata.name} 
              className="w-full h-24 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-xs">
              {metadata.name}
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <Button 
        type="button" 
        variant="outline"
        className="w-full"
        onClick={() => document.getElementById('multiFileInput')?.click()}
      >
        <Upload className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
      <input
        id="multiFileInput"
        type="file"
        multiple
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
}
