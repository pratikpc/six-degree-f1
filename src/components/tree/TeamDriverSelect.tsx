import React from 'react';
import Grid from '@material-ui/core/Grid';

import {
   TeamIdAndNameLink,
   DriverIdAndNameLink
} from 'formula-one-six-degrees-metadata';

import Selector from './Selector';

function GenSeasons() {
   const seasons: { [val in string]: string } = {};
   const year = new Date().getUTCFullYear();
   for (let i = 1950; i <= year; i += 1) seasons[String(i)] = String(i);
   return seasons;
}
export function ProcessInput(props: { [val in string]: string }) {
   let data: string[][] = [];
   // eslint-disable-next-line guard-for-in
   for (const key in props) data.push([key, props[key]]);
   data = data.sort((left, right) => (left[1] < right[1] ? -1 : 1));
   return data;
}
export const typeVals = {
   team: 'Teams',
   driver: 'Drivers',
   season: 'Season'
};

export const dataTypes = {
   team: ProcessInput(TeamIdAndNameLink),
   driver: ProcessInput(DriverIdAndNameLink),
   season: ProcessInput(GenSeasons())
};
type dataTypeKeys = keyof typeof dataTypes;

const TeamDriverSelector: React.FC<{
   typeV: string[];
   setTypeV: React.Dispatch<React.SetStateAction<string[]>>;
   valV: string[];
   setValV: React.Dispatch<React.SetStateAction<string[]>>;
}> = props => {
   function UpdateTypeVals(vals: string[]) {
      props.setTypeV(vals);
      props.setValV(dataTypes[vals[0] as dataTypeKeys][0]);
   }
   return (
      <Grid container item spacing={2}>
         <Grid container item xs={12}>
            <Selector
               value={props.typeV}
               setValue={UpdateTypeVals}
               name="Start"
               key="222a2"
               data={ProcessInput(typeVals)}
               label="Type"
            />
         </Grid>{' '}
         <Grid container item xs={12}>
            <Selector
               value={props.valV ?? dataTypes.team}
               setValue={props.setValV}
               name="Start"
               key="222a1"
               label={props.typeV[1]}
               data={dataTypes[props.typeV[0] as dataTypeKeys]}
            />
         </Grid>
      </Grid>
   );
};

export default TeamDriverSelector;
