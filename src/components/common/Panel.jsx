function Panel({ title, extra, className = '', children }) {
  return (
    <section className={`panel ${className}`.trim()}>
      <span className="panel__corner panel__corner--tl" aria-hidden="true" />
      <span className="panel__corner panel__corner--tr" aria-hidden="true" />
      <span className="panel__corner panel__corner--bl" aria-hidden="true" />
      <span className="panel__corner panel__corner--br" aria-hidden="true" />
      <header className="panel__header">
        <h2 className="panel__title">{title}</h2>
        {extra ? <div className="panel__extra">{extra}</div> : null}
      </header>
      <div className="panel__body">{children}</div>
    </section>
  )
}

export default Panel
