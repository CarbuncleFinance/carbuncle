'use client'

import Box from '@mui/material/Box'
import MuiDialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@/components/ui/buttons/Button'
import { useLendingSupply } from '@/hooks/useLendingSupply'
import { createFieldValidator } from '@/utils/validation'
import { BRDGE_GAS_FEE_AMOUT_XRP } from '@/constants/app'
import { useNotification, NotificationVariant } from '@/hooks/useNotification'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  token: any
}

export default function Dialog({ open, onClose, title, token }: DialogProps) {
  const { showNotification } = useNotification()

  const handleSuccess = () => {
    showNotification('supplySuccess', NotificationVariant.SUCCESS)
    onClose()
  }

  const handleError = () => {
    showNotification('supplyFailed', NotificationVariant.ERROR)
  }

  const { form, isLoading, formSchema } = useLendingSupply(
    handleSuccess,
    handleError
  )

  return (
    <MuiDialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              await form.handleSubmit()
            } catch (error) {
              handleError()
            }
          }}
        >
          <Box sx={{ pt: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 1, textAlign: 'right' }}
            >
              Wallet balance: {token?.balance || 0} {token?.symbol || ''}
            </Typography>
            <form.Field
              name="amount"
              validators={{
                onChange: createFieldValidator('amount', formSchema)
              }}
            >
              {(field) => (
                <FormControl
                  error={field.state.meta.errors.length > 0}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <InputLabel htmlFor="bridge-amount-input">Amount</InputLabel>
                  <OutlinedInput
                    label="Amount"
                    id="bridge-amount-input"
                    type="text"
                    autoFocus={false}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <img
                          src={`/icons/${token?.symbol || ''}.png`}
                          alt={token?.symbol || ''}
                          width={24}
                          height={24}
                        />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography variant="body2" color="text.secondary">
                          {token?.symbol || ''}
                        </Typography>
                      </InputAdornment>
                    }
                    aria-describedby="bridge-amount-input-helper-text"
                    inputProps={{
                      'aria-label': 'bridge-amount-input'
                    }}
                  />
                  <FormHelperText>
                    {field.state.meta.errors.length > 0 ? 'Error' : ''}
                  </FormHelperText>
                </FormControl>
              )}
            </form.Field>
            <form.Field
              name="evmAddress"
              validators={{
                onChange: createFieldValidator('evmAddress', formSchema)
              }}
            >
              {(field) => (
                <FormControl
                  error={field.state.meta.errors.length > 0}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="bridge-evm-address-input">
                    EVM address
                  </InputLabel>
                  <OutlinedInput
                    label="EVM address"
                    id="bridge-evm-address-input"
                    type="text"
                    autoFocus={false}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-describedby="bridge-evm-address-input-helper-text"
                    inputProps={{
                      'aria-label': 'bridge-evm-address-input'
                    }}
                  />
                  <FormHelperText>
                    {field.state.meta.errors.length > 0 ? 'Error' : ''}
                  </FormHelperText>
                </FormControl>
              )}
            </form.Field>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Transaction overview
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 2
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Supply APY</Typography>
                <Typography variant="body1">5%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Collateralization</Typography>
                <Typography variant="body1">Yes</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Health factor</Typography>
                <Typography variant="body1">1.5</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Bridge fee</Typography>
                <Typography variant="body1">
                  {BRDGE_GAS_FEE_AMOUT_XRP} XRP
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={form.state.values.amount === '' || isLoading}
            >
              {isLoading ? 'Processing...' : `Supply ${token?.symbol || ''}`}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </MuiDialog>
  )
}
