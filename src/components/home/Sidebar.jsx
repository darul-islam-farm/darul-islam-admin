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
import CollapseLink from './CollapsLink'

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor
    }).background,
    height: '100%'
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
  }
}))

const navData = [
  {
    link: '/',
    label: 'Users',
    icon: IconBellRinging,
    links: [{ label: 'Pending Users', link: '/pending-users' }]
  },
  {
    link: '/recharge',
    label: 'Recharge',
    icon: IconReceipt2,
    links: [
      { label: 'Accepted', link: '/recharge/accepted' },
      { label: 'Rejected', link: '/recharge/rejected' }
    ]
  },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings }
]

export default function Sidebar() {
  const { classes } = useStyles()

  const links = navData.map((item, idx) => <CollapseLink key={idx} {...item} />)

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
