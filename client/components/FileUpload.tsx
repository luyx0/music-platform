import React, {LegacyRef, ReactNode, useRef} from 'react';

interface FileUploadProps{
    setFile: Function;
    accept: string;
    children: ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    }

    return (
        <div onClick={() => ref.current?.click()}>
            <input
                type="file"
                accept={accept}
                style={{display: "none"}}
                ref={ref as LegacyRef<HTMLInputElement>}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;