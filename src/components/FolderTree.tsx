import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface Folder {
  id: string;
  name: string;
  path: string;
  children: Folder[];
}

interface FolderTreeProps {
  folders: Folder[];
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (folder: Folder) => void;
  selectedId: string;
}

export default function FolderTree({ 
  folders, 
  expanded, 
  onToggle, 
  onSelect, 
  selectedId 
}: FolderTreeProps): JSX.Element {
  return (
    <ul className="pl-2">
      {folders.map(folder => (
        <li key={folder.id}>
          <div className={`flex items-center cursor-pointer rounded px-2 py-1 hover:bg-blue-50 ${selectedId === folder.id ? 'bg-blue-100 font-bold' : ''}`}
            onClick={() => onSelect(folder)}>
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