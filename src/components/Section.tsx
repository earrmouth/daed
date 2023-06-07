import { ActionIcon, Group, Stack, Title, createStyles } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  section: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]}`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    boxShadow: theme.shadows.md,
  },
}))

export const Section = ({
  title,
  bordered,
  onCreate,
  actions,
  children,
}: {
  title: string
  bordered?: boolean
  onCreate: () => void
  actions?: React.ReactNode
  children: React.ReactNode
}) => {
  const { classes, theme, cx } = useStyles()

  return (
    <Stack className={cx({ [classes.section]: bordered })}>
      <Group position="apart">
        <Title order={4} color={theme.primaryColor}>
          {title}
        </Title>

        <Group>
          {actions}

          <ActionIcon onClick={onCreate}>
            <IconPlus />
          </ActionIcon>
        </Group>
      </Group>

      {children}
    </Stack>
  )
}