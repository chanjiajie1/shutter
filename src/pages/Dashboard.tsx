import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FolderPlus, ImagePlus, ChevronDown, ChevronRight, Upload, User, LogOut, Shield } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from "@/components/ui/input";
import PhotoGrid from '@/components/PhotoGrid';

// Session types
interface User {
  username: string;
  role: 'admin' | 'user';
}

interface Session {
  user: User;
  isAuthenticated: boolean;
}

interface Folder {
  id: string;
  name: string;
  path: string;
  children?: Folder[];
}

// Mock session and role
const mockSession: Session = {
  user: { username: 'admin', role: 'admin' }, // change to 'user' for regular user
  isAuthenticated: true,
};

function FolderTree({ folders, expanded, onToggle, onSelect, selectedId }: {
  folders: Folder[];
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (folder: Folder) => void;
  selectedId: string;
}) {
  return (
    <ul className="pl-2">
      {folders.map(folder => (
        <li key={folder.id}>
          <div
            className={`flex items-center cursor-pointer rounded px-2 py-1 hover:bg-blue-50 ${selectedId === folder.id ? 'bg-blue-100 font-bold' : ''}`}
            onClick={() => onSelect(folder)}
          >
            {folder.children && folder.children.length > 0 && (
              <span onClick={e => { e.stopPropagation(); onToggle(folder.id); }}>
                {expanded[folder.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            )}
            <span className="ml-1">{folder.name}</span>
          </div>
          {folder.children && folder.children.length > 0 && expanded[folder.id] && (
            <FolderTree
              folders={folder.children}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Dashboard(): JSX.Element {
  // Session and role
  const [session] = useState<Session>(mockSession);
  const isAdmin = session.user.role === 'admin';

  // Folder navigation
  const [folders, setFolders] = useState<Folder[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true });
  const [selectedFolder, setSelectedFolder] = useState<string>('root');
  const [currentFolderPath, setCurrentFolderPath] = useState<string>('\\server\\photos');

  // Upload state
  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  // Create folder state
  const [showCreateFolder, setShowCreateFolder] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');

  // Load folders on component mount
  useEffect(() => {
    async function fetchFolders() {
      try {
        const response = await fetch('http://localhost:3001/api/files?path=');
        if (response.ok) {
          const data = await response.json();
          setFolders(data);
          // Auto-expand root folder
          setExpanded({ root: true });
        }
      } catch (error) {
        console.error('Error loading folders:', error);
      }
    }
    
    fetchFolders();
  }, []);

  // Drag-and-drop
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles(e.dataTransfer.files);
      setShowUploadDialog(true);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  // Folder expand/collapse
  const handleToggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Folder select
  const handleSelect = (folder: Folder) => {
    setSelectedFolder(folder.id);
    setCurrentFolderPath(folder.path);
  };

  // File selection handler
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      setShowUploadDialog(true);
    }
  };

  // Upload logic
  const startUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setShowUploadDialog(false);
    setShowProgressBar(true);
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('photos', files[i]);
      }
      
      // Simulated progress - in a real application, you'd use XHR to track actual progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 95) {
            clearInterval(progressInterval);
          }
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 150);
      
      const response = await fetch(`http://localhost:3001/api/upload?path=${encodeURIComponent(currentFolderPath)}`, {
        method: 'POST',
        body: formData
      });
      
      clearInterval(progressInterval);
      
      if (response.ok) {
        setUploadProgress(100);
        // Success! Wait a moment before hiding the progress bar
        setTimeout(() => {
          setShowProgressBar(false);
          setUploading(false);
        }, 1200);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadProgress(0);
      setUploading(false);
      setShowProgressBar(false);
      // Show error message to user
    }
  };

  // Create folder logic
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    
    try {
      const response = await fetch('http://localhost:3001/api/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parentPath: currentFolderPath,
          folderName: newFolderName.trim()
        })
      });
      
      if (response.ok) {
        // Refresh folder structure
        const foldersResponse = await fetch('http://localhost:3001/api/files?path=');
        if (foldersResponse.ok) {
          const data = await foldersResponse.json();
          setFolders(data);
        }
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    }
    
    setShowCreateFolder(false);
    setNewFolderName('');
  };

  // Top-right nav
  const handleLogout = () => {
    // TODO: Clear session and redirect
    console.log("Logout clicked");
  };

  // In your Dashboard component or a custom hook
  const fetchRoot = async () => {
    const response = await fetch('http://localhost:3001/api/files?path=');
    const files = await response.json();
    // Set state with files/folders
  };

  // Example function to fetch and display contents of 'Picture 2'
  async function showPicture2Contents() {
    const response = await fetch('http://localhost:3001/api/files?path=Picture 2');
    const files = await response.json();
    // Set state and render files in your component
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 shadow-lg border-r border-gray-200 flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-700">Folders</h2>
          <Button size="icon" variant="ghost" onClick={() => setShowCreateFolder(true)}><FolderPlus /></Button>
        </div>
        <ScrollArea className="flex-1 pr-2">
          {folders.length > 0 && (
            <FolderTree 
              folders={folders} 
              expanded={expanded} 
              onToggle={handleToggle} 
              onSelect={handleSelect} 
              selectedId={selectedFolder} 
            />
          )}
        </ScrollArea>
        <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white" onClick={() => uploadInputRef.current?.click()}>
          <Upload className="mr-2" />Upload Photo
        </Button>
        <input 
          type="file" 
          multiple 
          hidden 
          ref={uploadInputRef} 
          onChange={handleFileSelection} 
          accept="image/*"
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative" onDrop={handleDrop} onDragOver={handleDragOver}>
        {/* Top Nav */}
        <nav className="flex justify-end items-center h-16 px-8 bg-white/70 shadow-sm">
          {isAdmin && <Button variant="ghost" className="mr-2"><Shield className="mr-1" />Admin</Button>}
          <Button variant="ghost" className="mr-2"><User className="mr-1" />My Profile</Button>
          <Button variant="outline" onClick={handleLogout}><LogOut className="mr-1" />Log Out</Button>
        </nav>
        {/* Header */}
        <div className="py-10 px-8">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">Photo Library</h1>
          <p className="text-lg text-gray-700 mb-6">A modern, colorful, and creative interface for managing your images.</p>
          <div className="rounded-2xl bg-white/80 shadow-lg p-8 min-h-[400px]">
            <PhotoGrid folderPath={selectedFolder} />
            <div className="mt-8 text-center text-gray-400 text-sm">Drag and drop images anywhere to upload.</div>
          </div>
        </div>
        {/* Upload Progress Bar */}
        {showProgressBar && (
          <div className="fixed bottom-6 left-6 z-50 w-72 bg-white/90 rounded-xl shadow-lg p-4 flex items-center">
            <span className="mr-4 text-blue-700 font-bold">Uploading...</span>
            <Progress value={uploadProgress} className="flex-1" />
          </div>
        )}
        {/* Upload Confirmation Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent>
            <DialogTitle>Upload Images</DialogTitle>
            <DialogDescription>
              {selectedFiles && `Upload ${selectedFiles.length} ${selectedFiles.length === 1 ? 'image' : 'images'} to ${currentFolderPath}?`}
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancel</Button>
              <Button onClick={() => startUpload(selectedFiles)}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Create Folder Modal */}
        <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
          <DialogContent>
            <DialogTitle>Create New Folder</DialogTitle>
            <Input 
              placeholder="Folder name" 
              value={newFolderName} 
              onChange={(e) => setNewFolderName(e.target.value)} 
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateFolder(false)}>Cancel</Button>
              <Button onClick={handleCreateFolder}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}