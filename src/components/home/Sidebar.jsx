import { useState } from 'react'
import { createStyles, Navbar, getStylesRef, rem } from '@mantine/core'
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout
} from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor
    }).background,
    height: '100%'
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      0.1
    ),
    color: theme.white,
    fontWeight: 700
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      0.1
    )}`
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: '38vh',
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      0.1
    )}`
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
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
  }
}))

const data = [
  { link: '/', label: 'Home', icon: IconBellRinging },
  { link: '/recharge', label: 'Recharge', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings }
]

export default function Sidebar() {
  const { classes, cx } = useStyles()
  const { pathname } = useLocation()

  const links = data.map(item => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === pathname
      })}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <Navbar p='md' className={classes.navbar}>
      <Navbar.Section grow>
        <h1 className='white mb-2'>DL Admin</h1>
        {links}
        <div className={classes.footer}>
          <a
            href='#'
            className={classes.link}
            onClick={event => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a
            href='#'
            className={classes.link}
            onClick={event => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </Navbar.Section>
    </Navbar>
  )
}
