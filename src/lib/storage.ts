interface FileMetadata {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  lastModified: Date;
  thumbnailUrl?: string;
}

class StorageService {
  private basePath: string;
  private thumbnailCache: Map<string, string>;

  constructor(serverPath: string) {
    this.basePath = serverPath;
    this.thumbnailCache = new Map();
  }

  async listFiles(folderPath: string): Promise<FileMetadata[]> {
    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(folderPath)}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      return await response.json();
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async uploadFile(file: File, folderPath: string): Promise<FileMetadata> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', folderPath);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async downloadFile(fileId: string): Promise<Blob> {
    try {
      const response = await fetch(`/api/download/${fileId}`);
      if (!response.ok) throw new Error('Download failed');
      return await response.blob();
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  async createFolder(folderName: string, parentPath: string): Promise<void> {
    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: folderName,
          path: parentPath,
        }),
      });

      if (!response.ok) throw new Error('Failed to create folder');
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async generateThumbnail(fileId: string): Promise<string> {
    if (this.thumbnailCache.has(fileId)) {
      return this.thumbnailCache.get(fileId)!;
    }

    try {
      const response = await fetch(`/api/thumbnail/${fileId}`);
      if (!response.ok) throw new Error('Failed to generate thumbnail');
      const blob = await response.blob();
      const thumbnailUrl = URL.createObjectURL(blob);
      this.thumbnailCache.set(fileId, thumbnailUrl);
      return thumbnailUrl;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const storageService = new StorageService(import.meta.env.VITE_SERVER_PATH || ''); 