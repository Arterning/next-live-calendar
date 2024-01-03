import LinkCard from '@/components/link-card';
import React from 'react';

interface IDashBoardPageProps {

}

const DashBoardPage: React.FC<IDashBoardPageProps> = (props) => {

    return (
      <div className='p-6'>
        <h2>DashBoardPage</h2>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <LinkCard href="#TODO" title="Docs" desc="Find in-depth information about Next.js features and API."/>
        </div>
      </div>
    );
};

export default DashBoardPage