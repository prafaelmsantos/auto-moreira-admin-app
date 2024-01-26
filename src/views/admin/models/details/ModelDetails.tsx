import { Autocomplete, Grid, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import TextFieldValidation from '../../../../components/form/TextFieldFormValidation';
import { IModel } from '../models/Model';
import { IMode } from '../../../../models/enums/Base';
import { IMark } from '../../marks/models/Mark';

interface IModelDetails {
  model: IModel;
  errors: FieldErrors<IModel>;
  register: UseFormRegister<IModel>;
  marks: IMark[];
}
export default function ModelDetails({
  model,
  errors,
  register,
  marks
}: IModelDetails) {
  return (
    <Grid container mt={5} px={5} spacing={2}>
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          label={'Nome'}
          //onChange={(event) => handleOnChange(event, 'description')}

          value={model.name}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Autocomplete
          fullWidth
          getOptionLabel={(option) => option.name}
          id="tags-standard"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          key={marks.length !== 0 ? marks[0].id : 0}
          /* onChange={(event, value) => {
                                handleChangeRoles(value);
                            }} */
          options={marks}
          renderInput={(params) => (
            <TextField
              {...params}
              /* error={rolesValidation && rolesValidation.error}
                                    helperText={
                                        rolesValidation && rolesValidation.message !== ''
                                            ? intl.formatMessage({ id: rolesValidation.message })
                                            : null
                                    } */
              label={'Marca'}
              placeholder={'Pesquisar'}
              required
            />
          )}
          value={marks.find((x) => x.id === model.markId)}
        />
      </Grid>
    </Grid>
  );
}
