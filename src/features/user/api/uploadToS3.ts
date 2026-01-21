export async function uploadToS3(file: File, presignedUrl: string) {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) throw new Error("S3 업로드 실패");
}
