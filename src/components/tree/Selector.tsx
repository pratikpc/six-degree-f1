import React from 'react';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Select(props: {
   data: string[][];
   name: string;
   setValue:
      | ((_: string[]) => void)
      | React.Dispatch<React.SetStateAction<string[]>>;
   value: string[];
   label: string;
}) {
   const handleChange = (
      _event: React.ChangeEvent<{}>,
      values: string[] | null
   ) => {
      if (values != null) props.setValue(values);
   };
   return (
      <div>
         <Autocomplete
            id={`combo-box-demo-${props.name}`}
            options={props.data}
            getOptionLabel={item => {
               return item[1];
            }}
            style={{ width: 300 }}
            // defaultValue={props.data[0]}
            value={props.value}
            onChange={handleChange}
            autoSelect
            autoHighlight
            renderInput={params => (
               <TextField {...params} label={props.label} variant="outlined" />
            )}
         />
      </div>
   );
}
