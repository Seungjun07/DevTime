import { useState } from "react";
import { usePresignedUrl } from "./mutations/usePresignedUrl";
import { uploadToS3 } from "../api/uploadToS3";

export function useImageFile() {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: getPresignedUrl } = usePresignedUrl();

  async function selectFile(file: File | null) {
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("png 또는 jpg 파일만 업로드 가능합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("5MB 이하 파일만 업로드 가능합니다.");
      return;
    }

    setPreview(URL.createObjectURL(file));

    setIsUploading(true);

    try {
      const { presignedUrl, key } = await getPresignedUrl(file);
      await uploadToS3(file, presignedUrl);

      setImageKey(key);
    } catch (error) {
      console.error("업로드 중 오류 발생", error);
      setIsUploading(false);
    } finally {
      setIsUploading(false);
    }
  }

  return { preview, imageKey, isUploading, selectFile };
}
