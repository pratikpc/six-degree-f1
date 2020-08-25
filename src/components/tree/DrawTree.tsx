import React from 'react';
import Tree from 'react-d3-tree';

export default function GraphDraw(props: { nodes: any }) {
   return (
      <Tree
         data={props.nodes}
         separation={{
            siblings: 0.5
         }}
         translate={{
            x: 30,
            y: 50
         }}
         orientation="horizontal"
         pathFunc="diagonal"
      />
   );
}
