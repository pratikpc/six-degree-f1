import React from 'react';
import {
   Grid,
   Checkbox,
   FormGroup,
   FormControlLabel,
   Typography
} from '@material-ui/core';
import Graph from 'formula-one-six-degree-graph-util';
import {
   TeamNamesAndDrivers,
   TeamNameT,
   DriverLinkNameT,
   DriverIdAndNameLink
} from 'formula-one-six-degrees-metadata';

import TeamDriverSelect, {
   dataTypes,
   ProcessInput,
   typeVals
} from './TeamDriverSelect';
import DrawGraph from './DrawTree';

const graph = new Graph();

function GetDriversBasedOnType(typeV: string, valV: string): DriverLinkNameT[] {
   if (typeV == null || typeV === '' || valV == null || valV === '')
      return [] as DriverLinkNameT[];
   if (typeV === 'team') {
      return TeamNamesAndDrivers[valV as TeamNameT] as DriverLinkNameT[];
   }
   if (typeV === 'driver') return [valV as DriverLinkNameT];
   if (typeV === 'season') return Graph.GetDriverIDsForSeason(Number(valV));
   return [] as DriverLinkNameT[];
}
function GetNodesBasedOnCloseness(
   driversL: DriverLinkNameT[],
   driversR: DriverLinkNameT[],
   closest: boolean
) {
   if (closest) return graph.GetClosestDriversPairing(driversL, driversR);
   return graph.GetFarthestDriverPairing(driversL, driversR);
}
function TreeObtain(
   valVL: string,
   typeVL: string,
   valVR: string,
   typeVR: string,
   closest: boolean
) {
   const driversL = GetDriversBasedOnType(typeVL, valVL);
   const driversR = GetDriversBasedOnType(typeVR, valVR);
   const nodes = GetNodesBasedOnCloseness(driversL, driversR, closest);
   if (Object.keys(nodes).length === 0)
      return [
         {
            name: DriverIdAndNameLink[driversL[0]],
            children: []
         },
         {
            name: DriverIdAndNameLink[driversR[0]],
            children: []
         }
      ];
   return Graph.PathToTree(nodes);
}

const TreeShow: React.FC<{}> = () => {
   // By Default Select Team
   const defDataTypeShow = ProcessInput(typeVals)[0];
   const [typeVL, setTypeVL] = React.useState<string[]>(defDataTypeShow);
   const [valVL, setValVL] = React.useState<string[]>(dataTypes.driver[0]);
   const [typeVR, setTypeVR] = React.useState<string[]>(defDataTypeShow);
   const [valVR, setValVR] = React.useState<string[]>(dataTypes.driver[0]);
   const [closest, setClosest] = React.useState<boolean>(true);
   const [nodes, setNodes] = React.useState<any>({});

   React.useEffect(() => {
      const path = TreeObtain(
         valVL[0],
         typeVL[0],
         valVR[0],
         typeVR[0],
         closest
      );
      setNodes(path);
   }, [valVL, typeVL, valVR, typeVR, closest]);

   return (
      <>
         <Typography variant="h4">
            SHORTEST PATH DISTANCE BETWEEN TEAMMATES
         </Typography>
         <div style={{ marginTop: '8vh' }} />
         <Grid container spacing={4}>
            <Grid container item xs={12} sm={5}>
               <TeamDriverSelect
                  setTypeV={setTypeVL}
                  typeV={typeVL}
                  valV={valVL}
                  setValV={setValVL}
               />
            </Grid>
            <Grid container item xs={12} sm={5}>
               <TeamDriverSelect
                  setTypeV={setTypeVR}
                  typeV={typeVR}
                  valV={valVR}
                  setValV={setValVR}
               />
            </Grid>
            <Grid container item xs={12} sm={2}>
               <FormGroup row>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={closest}
                           onChange={() => {
                              setClosest(!closest);
                           }}
                           name="checkedB"
                           color="primary"
                        />
                     }
                     label={closest ? 'Closest' : 'Farthest'}
                  />
               </FormGroup>
            </Grid>
         </Grid>
         <div
            style={{
               width: '100%',
               height: '60vh',
               marginTop: '5vh'
            }}
         >
            <DrawGraph nodes={nodes} />
         </div>
      </>
   );
};

export default TreeShow;
