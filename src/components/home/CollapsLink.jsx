import { useState } from 'react'
import {
  Group,
  Box,
  Collapse,
  getStylesRef,
  UnstyledButton,
  createStyles
} from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const useStyles = createStyles(theme => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
        0.1
      )
    }
  },
  sublink: {
    padding: `${theme.spacing.sm} 0`,
    display: 'flex',
    justifyContent: 'center'
  },
  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
        0.25
      ),
      [`& .${getStylesRef('icon')}`]: {
        opacity: 0.9
      }
    },
    border: '0.2px solid white'
  },
  sublinkActive: {
    borderBottom: '1px solid white'
  },
  chevron: {
    transition: 'transform 200ms ease'
  }
}))

export default function CollapseLink({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links
}) {
  const { classes, theme, cx } = useStyles()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
  const items = (hasLinks ? links : []).map(link => (
    <Link
      className={cx(classes.link, classes.sublink, {
        [classes.sublinkActive]: link.link === pathname
      })}
      to={link.link}
      key={link.link}
    >
      {link.label}
    </Link>
  ))

  return (
    <>
      <UnstyledButton
        onClick={() => {
          setOpened(o => !o)
          navigate(link)
        }}
        className={cx(classes.link, {
          [classes.linkActive]: link === pathname
        })}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={classes.linkIcon} stroke={1.5} />
            <Box ml='md'>{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size='1rem'
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none'
              }}
            />
          )}
        </Box>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
