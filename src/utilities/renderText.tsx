import React from 'react'

/**
 * Renders inline formatting in a plain text string:
 *  - \n → <br />
 *  - <b>…</b> or <strong>…</strong> → <strong>…</strong>
 *
 * Use this for CMS text fields (not rich text) that need basic formatting.
 */
export function renderText(text: string): React.ReactNode {
  if (!text.includes('\n') && !/<\/?(?:b|strong)>/i.test(text)) return text

  const lines = text.split('\n')
  return lines.map((line, lineIndex) => (
    <React.Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {renderBold(line)}
    </React.Fragment>
  ))
}

const BOLD_RE = /<(?:b|strong)>(.*?)<\/(?:b|strong)>/gi

function renderBold(text: string): React.ReactNode {
  if (!BOLD_RE.test(text)) return text
  BOLD_RE.lastIndex = 0

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = BOLD_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(<strong key={match.index}>{match[1]}</strong>)
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 1 ? parts[0] : parts
}
