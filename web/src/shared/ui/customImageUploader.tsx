import { ImageIcon } from 'lucide-react';
import React, { useRef } from 'react';

type Props = {
  onImageSelected: (src: string) => void;
};

const CustomImageUploader: React.FC<Props> = ({ onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    onImageSelected(objectUrl);
  };

  return (
    <>
      <ImageIcon
        className="size-8 p-1.5 stroke-white bg-indigo-950 rounded-full cursor-pointer"
        onClick={handleUpload}
      />
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </>
  );
};

export default CustomImageUploader;
