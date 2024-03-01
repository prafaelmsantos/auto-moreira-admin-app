import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { IClientMessage } from '../../models/ClientMessage';
import { TextFieldSX } from '../../../../../components/form/style/TextFieldSX';
import ClientMessageLabel from '../components/label/ClientMessageLabel';
import { SelectSX } from '../../../../../components/form/style/AutocompleteSX';
import { StatusMenu } from '../../models/enums/StatusEnum';

interface IClientMessageDetails {
  clientMessage: IClientMessage;
}

export default function ClientMessageDetails({
  clientMessage
}: IClientMessageDetails) {
  return (
    <>
      <Grid container spacing={3} mt={5} px={5}>
        <Grid item xs={12} md={5} mt={3} px={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {ClientMessageLabel('Nome', true)}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel(clientMessage.name)}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel('Email', true)}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel(clientMessage.email)}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel('Contacto', true)}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel(clientMessage.phoneNumber)}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel('Data/Hora', true)}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel(
                `${new Date(
                  clientMessage.createdDate
                ).toLocaleDateString()} ${new Date(
                  clientMessage.createdDate
                ).toLocaleTimeString()}`
              )}
            </Grid>
            <Grid item xs={6}>
              {ClientMessageLabel('Estado', true)}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  variant="standard"
                  color="secondary"
                  value={clientMessage.status}
                  sx={SelectSX(false)}
                  //onChange={handleChange}
                >
                  {StatusMenu.map((x) => (
                    <MenuItem value={x.id}>{x.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={7}>
          <TextField
            multiline
            disabled
            rows={8}
            fullWidth
            margin="dense"
            defaultValue={clientMessage.message}
            InputProps={{
              style: {
                color: 'white'
              }
            }}
            sx={TextFieldSX(false)}
          />
        </Grid>
      </Grid>
    </>
  );
}
