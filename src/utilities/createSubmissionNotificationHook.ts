import type { CollectionAfterChangeHook } from 'payload'

type FieldConfig = {
  label: string
  key: string
}

const NOTIFICATION_RECIPIENTS = ['usama@brandcaredigital.com']

export const createSubmissionNotificationHook = ({
  subject,
  fields,
}: {
  subject: string
  fields: FieldConfig[]
}): CollectionAfterChangeHook => {
  return async ({ doc, operation, req }) => {
    // Only notify on new submissions, not edits made in the dashboard
    if (operation !== 'create') return doc

    const rows = fields
      .map(({ label, key }) => {
        const value = doc[key]
        if (value === undefined || value === null || value === '') return null
        return `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#32312E;border-bottom:1px solid #eee;">${label}</td>
          <td style="padding:8px 12px;color:#32312E;border-bottom:1px solid #eee;">${String(value)}</td>
        </tr>`
      })
      .filter(Boolean)
      .join('')

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#32312E;">${subject}</h2>
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      </div>
    `

    try {
      await req.payload.sendEmail({
        to: NOTIFICATION_RECIPIENTS,
        subject,
        html,
      })
    } catch (err) {
      // Never block the submission from saving just because the email failed
      req.payload.logger.error(`Failed to send notification email for ${subject}: ${err}`)
    }

    return doc
  }
}
