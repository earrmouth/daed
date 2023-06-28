import { Checkbox, Modal, NumberInput, Select, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { FormActions } from './FormActions'

export const NodeModal = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
  const { values, onSubmit, getInputProps, reset } = useForm({
    initialValues: {
      protocol: 'vmess',
      type: 'none',
      tls: 'none',
      net: 'tcp',
    },
  })

  return (
    <Modal opened={opened} onClose={onClose} title="Configure Node">
      <form
        onSubmit={onSubmit((values) => {
          console.log(values)
        })}
      >
        <Stack>
          <Select
            data={[
              { label: 'VMESS', value: 'vmess' },
              { label: 'VLESS', value: 'vless' },
            ]}
            {...getInputProps('protocol')}
          />

          <TextInput label="Name" {...getInputProps('ps')} />

          <TextInput label="Host" withAsterisk {...getInputProps('add')} />

          <NumberInput label="Port" withAsterisk min={0} max={65535} {...getInputProps('port')} />

          <TextInput label="ID" withAsterisk {...getInputProps('id')} />

          {values.protocol === 'vmess' && <NumberInput label="AlterID" min={0} max={65535} {...getInputProps('aid')} />}

          {values.protocol === 'vmess' && (
            <Select
              label="Security"
              data={[
                { label: 'auto', value: 'auto' },
                { label: 'aes-128-gcm', value: 'aes-128-gcm' },
                { label: 'chacha20-poly1305', value: 'chacha20-poly1305' },
                { label: 'none', value: 'none' },
                { label: 'zero', value: 'zero' },
              ]}
              {...getInputProps('scy')}
            />
          )}

          {values.type !== 'dtls' && (
            <Select
              label="TLS"
              data={[
                { label: 'off', value: 'none' },
                { label: 'tls', value: 'tls' },
                { label: 'xtls', value: 'xtls' },
              ]}
              {...getInputProps('tls')}
            />
          )}

          {values.tls !== 'none' && <TextInput label="SNI" {...getInputProps('sni')} />}

          {values.tls === 'xtls' && (
            <Select
              label="Flow"
              data={[
                { label: 'none', value: 'none' },
                { label: 'xtls-rprx-origin', value: 'xtls-rprx-origin' },
                { label: 'xtls-rprx-origin-udp443', value: 'xtls-rprx-origin-udp443' },
                { label: 'xtls-rprx-vision', value: 'xtls-rprx-vision-udp443' },
              ]}
              {...getInputProps('flow')}
            />
          )}

          {values.tls !== 'none' && (
            <Checkbox label="AllowInsecure" {...getInputProps('allowInsecure', { type: 'checkbox' })} />
          )}

          <Select
            label="Network"
            withAsterisk
            data={[
              { label: 'TCP', value: 'tcp' },
              { label: 'mKCP', value: 'kcp' },
              { label: 'WebSocket', value: 'ws' },
              { label: 'HTTP/2', value: 'h2' },
              { label: 'gRPC', value: 'grpc' },
            ]}
            {...getInputProps('net')}
          />

          {values.net === 'tcp' && (
            <Select
              label="Type"
              data={[
                { label: 'No obfuscation', value: 'none' },
                { label: 'Obfuscated as Video Calls (SRTP)', value: 'srtp' },
              ]}
              {...getInputProps('type')}
            />
          )}

          {values.net === 'kcp' && (
            <Select
              label="Type"
              data={[
                { label: 'No obfuscation', value: 'none' },
                { label: 'Obfuscated as Video Calls (SRTP)', value: 'srtp' },
                { label: 'Obfuscated as Bittorrent (uTP)', value: 'utp' },
                { label: 'Obfuscated as Wechat Video Calls', value: 'wechat-video' },
                { label: 'Obfuscated as DTLS1.2 Packets (forcibly TLS on)', value: 'dtls' },
                { label: 'Obfuscated as WireGuard Packets', value: 'wireguard' },
              ]}
              {...getInputProps('type')}
            />
          )}

          {(values.net === 'ws' ||
            values.net === 'h2' ||
            values.tls === 'tls' ||
            (values.net === 'tcp' && values.type === 'http')) && <TextInput label="Host" {...getInputProps('host')} />}

          {values.tls === 'tls' && <TextInput label="Alpn" {...getInputProps('alpn')} />}

          {values.net === 'ws' ||
            values.net === 'h2' ||
            (values.net === 'tcp' && values.type === 'http' && <TextInput label="Path" {...getInputProps('path')} />)}

          {values.net === 'mkcp' || (values.net === 'kcp' && <TextInput label="Seed" {...getInputProps('path')} />)}

          {values.net === 'grpc' && <TextInput label="ServiceName" {...getInputProps('path')} />}

          <FormActions reset={reset} />
        </Stack>
      </form>
    </Modal>
  )
}
