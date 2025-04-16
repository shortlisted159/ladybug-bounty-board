import React, { useState } from 'react';

const Bugs = () => {
  const [newBug, setNewBug] = useState({
    title: '',
    description: '',
    status: 'New',
    severity: 'Medium',
    bucket: '',
    assignedTo: 'unassigned',
  });

  return (
    <div>
      <h1>Bugs Page</h1>
      {/* Bug management interface would go here */}
    </div>
  );
};

export default Bugs;
