"use client"

import { FileUpload } from '@/components/file-upload';
import React, { useState } from 'react';

interface IProjectsPageProps {

}

const ProjectsPage: React.FC<IProjectsPageProps> = (props) => {

  const [isEditing, setIsEditing] = useState(true);

    return (
      <div className='p-4 w-1/3 h-52'>
        {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                console.log(url)
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
      </div>
    );
};

export default ProjectsPage