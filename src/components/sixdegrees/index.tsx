import React from 'react';
import { Typography } from '@material-ui/core';
import { Graph } from 'formula1-graph-names';
import Table from 'material-table';

function TableShow({
   data,
   title
}: {
   data: (string | number | string[])[][];
   title: string;
}) {
   return (
      <>
         <Typography variant="h5">
            The Most {title} in Largest Connected SubComponent is{' '}
            <i>
               {' '}
               <b>{data[0][1]}</b>
            </i>
         </Typography>
         <Table
            columns={[
               {
                  title: 'Name',
                  field: '1'
               },
               {
                  title: 'Avg Distance',
                  field: '2'
               }
            ]}
            data={data}
            title={title}
            options={{
               pageSize: 3,
               sorting: true,
               showFirstLastPageButtons: false
            }}
         />
      </>
   );
}

export default function Closeness() {
   const graphT = new Graph();
   const {
      mostClosest,
      mostFarthest
   } = graphT.GetSixDegreesOfFreedomInMainComponent();
   console.log(mostClosest);

   return (
      <>
         <TableShow data={mostClosest} title="Closest" />
         <div style={{ marginTop: '3vh' }} />
         <TableShow data={mostFarthest} title="Farthest" />
      </>
   );
}
