import React from 'react';

// this component will be used to eventually make the widgets collpsible, movable etc etc
function ViewportWidget({ render }: { render: Function }) {
  return (
    <div>
      {render()}
    </div>
  );
}

export default ViewportWidget;