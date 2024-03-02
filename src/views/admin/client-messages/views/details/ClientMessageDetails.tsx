import { Autocomplete, Grid, TextField } from '@mui/material';
import { IClientMessage } from '../../models/ClientMessage';
import { TextFieldSX } from '../../../../../components/form/style/TextFieldSX';
import ClientMessageLabel from '../components/label/ClientMessageLabel';
import { AutocompleteSX } from '../../../../../components/form/style/AutocompleteSX';
import { StatusMenu } from '../../models/enums/StatusEnum';

interface IClientMessageDetails {
  clientMessage: IClientMessage;
  setClientMessage: React.Dispatch<React.SetStateAction<IClientMessage>>;
}

export default function ClientMessageDetails({
  clientMessage,
  setClientMessage
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
              <Autocomplete
                value={
                  StatusMenu.find((x) => x.id === clientMessage.status) ??
                  StatusMenu[0]
                }
                disableClearable
                autoComplete={false}
                sx={{ mt: 1 }}
                isOptionEqualToValue={(option, value) => option === value}
                options={StatusMenu}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    variant="standard"
                    sx={AutocompleteSX(false)}
                  />
                )}
                onChange={(_, data) =>
                  setClientMessage((old) => ({ ...old, status: data.id }))
                }
              />
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
