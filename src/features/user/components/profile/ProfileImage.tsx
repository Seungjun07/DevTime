import ImageField from "../../../../components/common/Image/ImageField";
import { useImageFile } from "../../hooks/useImageFile";

type Props = {
  defaultImage?: string;
  onUploadComplete: (imageKey: string) => void;
};

export default function ProfileImage({
  defaultImage,
  onUploadComplete,
}: Props) {
  const { preview, imageKey, isUploading, selectFile } = useImageFile();

  if (imageKey) {
    onUploadComplete(imageKey);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <ImageField id="profile-image">
        <div className="flex gap-3">
          <ImageField.Uploader
            preview={preview}
            disabled={isUploading}
            onFileSelect={selectFile}
          />
          <ImageField.HelperText>
            5MB 미만의 .png, .jpg 파일
          </ImageField.HelperText>
        </div>
      </ImageField>
    </div>
  );
}
