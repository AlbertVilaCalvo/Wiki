import * as React from 'react'
import styles from './DocLink.module.css'

export function DocLink({ to, ...props }) {
  return (
    <a href={to} {...props} className={styles.anchor}>{to}</a>
  )
}
