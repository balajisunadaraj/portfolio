import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const roles = [
  {
    title: 'Full Stack Developer',
  },
  {
    title: 'UI/UX Designer',
  },
  {
    title: 'Game Developer',
  },
  {
    title: 'Software Developer',
  },
  {
    title: 'Problem Solver',
  },
]

const navigationItems = [
  'Home',
  'Academics',
  'Skills',
  'Projects',
  'Achievements',
  'Certificates',
  'Contact',
]

const projects = [
  {
    number: '01',
    label: 'Srigifts Website',
    logo: '/project-logo-srigifts.png',
    link: 'https://www.srigifts.com/',
    description: 'Srigifts is an online gifting experience for discovering thoughtful presents, browsing curated collections, and finding the right gift for every occasion.',
    screenshots: [
      '/srigifts-screenshots/1.png',
      '/srigifts-screenshots/2.png',
      '/srigifts-screenshots/3.png',
      '/srigifts-screenshots/4.png',
      '/srigifts-screenshots/5.png',
      '/srigifts-screenshots/6.png',
      '/srigifts-screenshots/7.png',
    ],
  },
  {
    number: '02',
    label: 'ANJAC Navigator',
    logo: '/project-logo-anjac.png',
    link: 'https://balaji-sundaraj.itch.io/navigator',
    description: 'ANJAC Navigator is a campus guide that helps students and visitors discover college locations, explore campus services, and find directions through a 3D visual experience.',
    screenshots: [
      '/ANJAC Navigator-screenshots/1.jpg',
      '/ANJAC Navigator-screenshots/2.jpg',
      '/ANJAC Navigator-screenshots/3.jpg',
      '/ANJAC Navigator-screenshots/4.jpg',
      '/ANJAC Navigator-screenshots/5.jpg',
      '/ANJAC Navigator-screenshots/6.jpg',
      '/ANJAC Navigator-screenshots/7.jpg',
    ],
  },
  {
    number: '03',
    label: 'Medicare',
    logo: '/project-logo-medicare.png',
    link: 'https://medicare-ai-y7mb.onrender.com/',
    description: 'A healthcare interface designed to predict heart disease risks and cancer risks of an individual through the trained data model and can analyse the possibilities through the pie charts, bar graphs, and line charts and the user can get awared using the safety measures.',
    screenshots: [
      '/medicare-screenshots/1.png',
      '/medicare-screenshots/2.png',
      '/medicare-screenshots/3.png',
      '/medicare-screenshots/4.png',
      '/medicare-screenshots/5.png',
      '/medicare-screenshots/6.png',
    ],
  },
  {
    number: '04',
    label: 'Educare',
    logo: '/project-logo-educare.png',
    link: 'https://educare-scheduler.netlify.app/',
    description: 'Educare is a student learning platform that provides organized study schedules, online experimental simulations and an personal study AI for focused academic progress.',
    screenshots: [
      '/educare-screenshots/1.png',
      '/educare-screenshots/2.png',
      '/educare-screenshots/3.png',
      '/educare-screenshots/4.png',
      '/educare-screenshots/5.png',
      '/educare-screenshots/6.png',
      '/educare-screenshots/7.png',
      '/educare-screenshots/8.png',
    ],
  },
  {
    number: '05',
    label: 'Metal Plate Billing System',
    logo: '/project-logo-billing.png',
    link: 'https://billsy.netlify.app/',
    description: 'A billing system for managing metal plate orders and calculating customer bills and maintaining the seller and buyer company details.',
    screenshots: [
      '/billing system-screenshots/1.png',
      '/billing system-screenshots/2.png',
      '/billing system-screenshots/3.png',
      '/billing system-screenshots/4.png',
      '/billing system-screenshots/5.png',
      '/billing system-screenshots/6.png',
    ],
  },
  {
    number: '06',
    label: 'Cyber Shield',
    logo: '/project-logo-cybershield.png',
    link: 'https://balajisunadaraj.github.io/cyber-shield/index.html',
    description: 'A cybersecurity awareness website created using HTML, CSS, and JavaScript. It raises awareness about phishing emails, two-factor authentication, password strength, and cyber attacks.',
    screenshots: [
      '/cyber shield-screenshots/1.png',
      '/cyber shield-screenshots/2.png',
      '/cyber shield-screenshots/3.png',
      '/cyber shield-screenshots/4.png',
      '/cyber shield-screenshots/5.png',
      '/cyber shield-screenshots/6.png',
    ],
  },
]

function TypewriterText({ text, activeKey }) {
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    setVisibleText('')
    let characterIndex = 0
    const timer = window.setInterval(() => {
      characterIndex += 1
      setVisibleText(text.slice(0, characterIndex))
      if (characterIndex >= text.length) {
        window.clearInterval(timer)
      }
    }, 28)

    return () => window.clearInterval(timer)
  }, [text, activeKey])

  return (
    <p className="project-description" aria-live="polite">
      <NumericText>{visibleText}</NumericText>
      <span className="typewriter-caret" aria-hidden="true" />
    </p>
  )
}

function NumericText({ children }) {
  return String(children).split(/(\d+(?:[.,]\d+)*(?:[–-]\d+)*(?:%)?)/g).map((part, index) => (
    /\d/.test(part)
      ? <span className="display-numeral" key={index}>{part}</span>
      : part
  ))
}

function SkillItem({ name, logo, textLogo }) {
  return (
    <li className="skill-item">
      {logo ? (
        <img className="skill-logo" src={logo} alt="" loading="lazy" />
      ) : (
        <span className="skill-logo skill-logo-text" aria-hidden="true">{textLogo}</span>
      )}
      <span>{name}</span>
    </li>
  )
}

function SkillTitle({ title, icon, image }) {
  return (
    <h3 className="skill-title">
      {image ? (
        <>
          <img className="skill-title-image" src={image} alt="" />
          <span>{title}</span>
        </>
      ) : (
        <>
          <span className={`skill-title-mark skill-title-mark--${icon}`} aria-hidden="true">
            <span />
          </span>
          <span>{title}</span>
        </>
      )}
    </h3>
  )
}

function RoleBook() {
  const [currentRole, setCurrentRole] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [showNextLabel, setShowNextLabel] = useState(false)
  const labelTimer = useRef(null)
  const nextRole = roles[(currentRole + 1) % roles.length]
  const nextRoleNumber = ((currentRole + 1) % roles.length) + 1

  useEffect(() => () => {
    if (labelTimer.current !== null) {
      window.clearTimeout(labelTimer.current)
    }
  }, [])

  const startPageFlip = useCallback(() => {
    if (flipping) return
    setShowNextLabel(false)
    setFlipping(true)
    labelTimer.current = window.setTimeout(() => {
      setShowNextLabel(true)
      labelTimer.current = null
    }, 300)
  }, [flipping])

  useEffect(() => {
    if (flipping) return undefined

    const timer = window.setTimeout(startPageFlip, 800)
    return () => window.clearTimeout(timer)
  }, [currentRole, flipping, startPageFlip])

  function handlePageClick() {
    startPageFlip()
  }

  function handlePageFlipEnd(event) {
    if (event.animationName === 'page-lift-turn' && flipping) {
      setCurrentRole((role) => (role + 1) % roles.length)
      setShowNextLabel(false)
      setFlipping(false)
    }
  }

  return (
    <div className="notebook">
      <div className="spiral-holes" aria-hidden="true">
        {Array.from({ length: 20 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="spiral-pins" aria-hidden="true">
        {Array.from({ length: 20 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="page-next" aria-hidden="true" />
      {showNextLabel && (
        <div className="next-role-label" aria-hidden="true">
          <h2>{nextRole.title}</h2>
          <span className="role-counter">
            <NumericText>{nextRoleNumber}</NumericText>/<NumericText>{roles.length}</NumericText>
          </span>
        </div>
      )}
      <div
        className={`page${flipping ? ' flipping' : ''}`}
        role="button"
        tabIndex={0}
        onClick={handlePageClick}
        onAnimationEnd={handlePageFlipEnd}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handlePageClick()
          }
        }}
        aria-label="Turn the page to see the next role"
      >
        <div className="page-front">
          <h2>{roles[currentRole].title}</h2>
          <span className="role-counter">
            <NumericText>{currentRole + 1}</NumericText>/<NumericText>{roles.length}</NumericText>
          </span>
        </div>
        <div className="page-back">
          <h2>{nextRole.title}</h2>
          <span className="role-counter">
            <NumericText>{nextRoleNumber}</NumericText>/<NumericText>{roles.length}</NumericText>
          </span>
        </div>
      </div>
    </div>
  )
}

function AssociationNote({ boardRef, title, description, type }) {
  const noteRef = useRef(null)
  const dragRef = useRef(null)
  const skipClickRef = useRef(false)
  const [position, setPosition] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleOutsidePointerDown(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsidePointerDown)
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown)
  }, [isOpen])

  function handlePointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const board = boardRef.current
    const note = noteRef.current
    if (!board || !note) return

    const boardRect = board.getBoundingClientRect()
    const noteRect = note.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - (noteRect.left + noteRect.width / 2),
      offsetY: event.clientY - (noteRect.top + noteRect.height / 2),
      boardLeft: boardRect.left + board.clientLeft,
      boardTop: boardRect.top + board.clientTop,
      boardWidth: board.clientWidth,
      boardHeight: board.clientHeight,
      noteWidth: note.offsetWidth,
      noteHeight: note.offsetHeight,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  function handlePointerMove(event) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const movedX = event.clientX - drag.startX
    const movedY = event.clientY - drag.startY
    if (!drag.moved && Math.hypot(movedX, movedY) > 4) {
      drag.moved = true
      skipClickRef.current = true
    }

    const minX = drag.noteWidth / 2
    const minY = drag.noteHeight / 2
    const pixelPosition = {
      x: Math.max(minX, Math.min(drag.boardWidth - minX, event.clientX - drag.boardLeft - drag.offsetX)),
      y: Math.max(minY, Math.min(drag.boardHeight - minY, event.clientY - drag.boardTop - drag.offsetY)),
    }
    setPosition({
      x: (pixelPosition.x / drag.boardWidth) * 100,
      y: (pixelPosition.y / drag.boardHeight) * 100,
    })
  }

  function handlePointerEnd(event) {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return
    dragRef.current = null
    setIsDragging(false)
  }

  function handleClick() {
    if (skipClickRef.current) {
      skipClickRef.current = false
      return
    }
    setIsOpen((open) => !open)
  }

  return (
    <div
      ref={noteRef}
      className={`association-note association-note--${type}${isDragging ? ' is-dragging' : ''}${isOpen ? ' is-open' : ''}`}
      style={position ? { left: `${position.x}%`, top: `${position.y}%` } : undefined}
    >
      <button
        className="achievement-note-paper"
        type="button"
        aria-label={`${title}. ${description} Drag to move this note. Click to raise it.`}
        aria-pressed={isOpen}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
        onClick={handleClick}
      >
        <span className="achievement-note-pin" aria-hidden="true" />
        <strong className="achievement-note-title">{title}</strong>
        <span className="achievement-note-description">{description}</span>
      </button>
    </div>
  )
}

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [activeDoorRect, setActiveDoorRect] = useState(null)
  const [isMailComposerOpen, setIsMailComposerOpen] = useState(false)
  const [isPhoneChooserOpen, setIsPhoneChooserOpen] = useState(false)
  const noticeboardRef = useRef(null)
  const projectScrollPosition = useRef(0)
  const mailScrollPosition = useRef(0)
  const isProjectOpen = Boolean(activeProject)

  function openProject(project, doorElement) {
    if (!activeProject) {
      projectScrollPosition.current = window.scrollY
    }
    setActiveDoorRect(doorElement.getBoundingClientRect())
    setActiveProject(project)
  }

  function closeProject() {
    setActiveProject(null)
    setActiveDoorRect(null)
  }

  function openMailComposer() {
    mailScrollPosition.current = window.scrollY
    setIsMailComposerOpen(true)
  }

  function closeMailComposer() {
    setIsMailComposerOpen(false)
  }

  function openPhoneChooser() {
    setIsPhoneChooserOpen(true)
  }

  function closePhoneChooser() {
    setIsPhoneChooserOpen(false)
  }

  function handleMailSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const from = formData.get('from')
    const subject = formData.get('subject')
    const message = formData.get('message')
    const body = `From: ${from}\n\n${message}`
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('balajisundar2296@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    closeMailComposer()
  }

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') closeProject()
    }

    if (isProjectOpen) {
      const scrollPosition = projectScrollPosition.current
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition}px`
      document.body.style.left = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', closeOnEscape)
    }

    return () => {
      if (document.body.style.position === 'fixed') {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo({
          top: projectScrollPosition.current,
          left: 0,
          behavior: 'instant',
        })
      } else {
        document.body.style.overflow = ''
      }
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isProjectOpen])

  useEffect(() => {
    if (!isMailComposerOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') closeMailComposer()
    }

    const scrollPosition = mailScrollPosition.current
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.left = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
      window.scrollTo({ top: scrollPosition, left: 0, behavior: 'instant' })
    }
  }, [isMailComposerOpen])

  return (
    <div className="portfolio">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Portfolio home">
          Portfolio
        </a>
        <nav aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              className="nav-link"
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>
      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <h1 className="hero-title" id="hero-title">
            <span className="hero-greeting">Hi, i am</span>
            <span className="hero-name">BALAJI</span>
          </h1>
          
          <img
            className="hero-portrait"
            src="/balaji-portrait.png"
            alt="Balaji"
          />

          <RoleBook />
        </section>
        <section className="academics" id="academics" aria-labelledby="academics-title">
          <h2 className="academics-title" id="academics-title">Academics</h2>
          <div className="academics-grid">
            <article className="academic-card">
              <span className="academic-number"><NumericText>01</NumericText></span>
              <h3><NumericText>Secondary School Leaving Certificate</NumericText></h3>
              <strong className="academic-score"><NumericText>82%</NumericText></strong>
              <dl>
                <div><dt>School</dt><dd>Government Higher Secondary School, Naranapuram</dd></div>
                <div><dt>Board</dt><dd>Tamil Nadu State Board</dd></div>
                <div><dt>Duration</dt><dd><NumericText>2021–2022</NumericText></dd></div>
              </dl>
            </article>
            <article className="academic-card">
              <span className="academic-number"><NumericText>02</NumericText></span>
              <h3><NumericText>Higher Secondary Certificate (HSC)</NumericText></h3>
              <strong className="academic-score"><NumericText>69%</NumericText></strong>
              <dl>
                <div><dt>School</dt><dd>Velankanni Matha Higher Secondary School, Sivakasi</dd></div>
                <div><dt>Board</dt><dd>Tamil Nadu State Board</dd></div>
                <div><dt>Duration</dt><dd><NumericText>2023–2024</NumericText></dd></div>
              </dl>
            </article>
            <article className="academic-card academic-card-featured">
              <span className="academic-number"><NumericText>03</NumericText></span>
              <h3>Bachelor of Computer Applications (BCA)</h3>
              <strong className="academic-score"><NumericText>83%</NumericText></strong>
              <span className="academic-status">Pursuing</span>
              <dl>
                <div><dt>Institution</dt><dd>Ayya Nadar Janaki Ammal College, Sivakasi</dd></div>
                <div><dt>University</dt><dd>Madurai Kamaraj University</dd></div>
                <div><dt>Duration</dt><dd><NumericText>2024–2027</NumericText></dd></div>
              </dl>
            </article>
          </div>
        </section>
        <section className="skills" id="skills" aria-labelledby="skills-title">
          <h2 className="skills-title" id="skills-title">Skills</h2>
          <div className="skills-grid">
            <article className="skill-card">
              <span className="skill-number"><NumericText>01</NumericText></span>
              <SkillTitle title="Programming" image="/programming-title.png" />
              <ul>
                <SkillItem name="Java" logo="/java-logo.png" />
                <SkillItem name="C" logo="https://cdn.simpleicons.org/c" />
                <SkillItem name="C++" logo="https://cdn.simpleicons.org/cplusplus" />
                <SkillItem name="Python" logo="https://cdn.simpleicons.org/python" />
                <SkillItem name="C#" logo="\C-Sharp logo.png" />
              </ul>
            </article>
            <article className="skill-card">
              <span className="skill-number"><NumericText>02</NumericText></span>
              <SkillTitle title="Frontend" image="/frontend-title.png" />
              <ul>
                <SkillItem name="HTML" logo="https://cdn.simpleicons.org/html5" />
                <SkillItem name="CSS" logo="https://cdn.simpleicons.org/css" />
                <SkillItem name="JavaScript" logo="https://cdn.simpleicons.org/javascript" />
                <SkillItem name="React.js" logo="https://cdn.simpleicons.org/react" />
              </ul>
            </article>
            <article className="skill-card">
              <span className="skill-number"><NumericText>03</NumericText></span>
              <SkillTitle title="Backend" image="/backend-title.png" />
              <ul>
                <SkillItem name="Python" logo="https://cdn.simpleicons.org/python" />
                <SkillItem name="Node.js" logo="node.js logo.png" />
              </ul>
            </article>
            <article className="skill-card">
              <span className="skill-number"><NumericText>04</NumericText></span>
              <SkillTitle title="Tools & Frameworks" icon="tools" />
              <ul>
                <SkillItem name="VS Code" logo="/vscode-logo.png" />
                <SkillItem name="GitHub" logo="https://cdn.simpleicons.org/github" />
                <SkillItem name="Flask" logo="/flask-logo.png" />
                <SkillItem name="Antigravity" logo="/antigravity logo.png" />
                <SkillItem name="ASP .NET" logo="/asp.net logo.png" />
              </ul>
            </article>
            <article className="skill-card skill-card-wide">
              <span className="skill-number"><NumericText>05</NumericText></span>
              <SkillTitle title="Designing" image="/designing-title.png" />
              <ul>
                <SkillItem name="Adobe Photoshop" logo="/photoshop-logo.png" />
                <SkillItem name="Canva" logo="/canva-logo.png" />
                <SkillItem name="CapCut" logo="/capcut-logo.png" />
              </ul>
            </article>
            <article className="skill-card skill-card-wide">
              <span className="skill-number"><NumericText>06</NumericText></span>
              <SkillTitle title="Core Skills" icon="core" />
              <ul>
                <SkillItem name={"Data Structures & Algorithms"} textLogo="DSA" />
                <SkillItem name="Object Oriented Programming" textLogo="OOP" />
                <SkillItem name="Problem Solving" textLogo="PS" />
                <SkillItem name="Debugging" textLogo="DBG" />
              </ul>
            </article>
          </div>
        </section>
        <section className="projects" id="projects" aria-labelledby="projects-title">
          <h2 className="projects-title" id="projects-title">Projects</h2>
          <div className={`project-doors${activeProject ? ' is-open' : ''}`} aria-label="Project collection">
            {projects.map((project) => (
              <article
                className={`project-door door-${project.number}${activeProject?.number === project.number ? ' is-active' : ''}`}
                key={project.number}
                role="button"
                tabIndex={activeProject && activeProject.number !== project.number ? -1 : 0}
                aria-label={`Open ${project.label}`}
                style={activeDoorRect && activeProject?.number === project.number ? {
                  '--door-start-left': `${activeDoorRect.left}px`,
                  '--door-start-top': `${activeDoorRect.top}px`,
                  '--door-start-width': `${activeDoorRect.width}px`,
                  '--door-start-height': `${activeDoorRect.height}px`,
                } : undefined}
                onClick={(event) => openProject(project, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openProject(project, event.currentTarget)
                  }
                }}
              >
                <div className="door-frame">
                  <img className="door-project-logo" src={project.logo} alt="" aria-hidden="true" />
                  <div className="door-panel">
                    <span className="door-number"><NumericText>{project.number}</NumericText></span>
                    <span className="door-mark" aria-hidden="true" />
                    <span className="door-label">{project.label}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {activeProject && (
            <>
              <button
                className="project-backdrop"
                type="button"
                aria-label="Close project preview"
                onClick={closeProject}
              />
              <div className="project-showcase" role="dialog" aria-modal="true" aria-label={activeProject.label}>
                <button
                  className="project-close"
                  type="button"
                  aria-label="Close project preview"
                  onClick={closeProject}
                >
                  Close
                </button>
                {activeProject.description && (
                  <TypewriterText text={activeProject.description} activeKey={activeProject.number} />
                )}
                {activeProject.link && (
                  <a
                    className="project-open-link"
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                )}
                <div className="project-screenshots" aria-label={`${activeProject.label} screenshots`}>
                  {activeProject.screenshots ? (
                    <div
                      className={`project-screenshot-list${activeProject.number === '02' ? ' project-screenshot-row' : ''}`}
                    >
                      {activeProject.screenshots.map((screenshot, index) => (
                        <img
                          className="project-screenshot-item"
                          src={screenshot}
                          alt={`${activeProject.label} screenshot ${index + 1}`}
                          key={screenshot}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="project-screen project-screen-main">
                        <div className="screen-toolbar">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="screen-content">
                          <strong>{activeProject.label}</strong>
                          <div className="screen-lines">
                            <i />
                            <i />
                            <i />
                          </div>
                        </div>
                      </div>
                      <div className="project-screen project-screen-side">
                        <div className="screen-toolbar">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="screen-content screen-content-small">
                          <strong>Preview</strong>
                          <div className="screen-lines">
                            <i />
                            <i />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
        <section className="recognition-section" id="achievements" aria-labelledby="achievements-title">
          <h2 className="recognition-title" id="achievements-title">Achievements</h2>
          <div ref={noticeboardRef} className="noticeboard" aria-label="Achievements noticeboard">
            <AssociationNote
              boardRef={noticeboardRef}
              title="Student Treasurer"
              description="BCA Association · 2025–2026"
              type="treasurer"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="Student Secretary"
              description="BCA Association · 2026–2027"
              type="secretary"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="3rd Prize · TalentExpo"
              description="Secured 3rd Prize in TalentExpo for the CyberShield Website."
              type="talentexpo"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="2nd Prize · State-Level Hackathon"
              description="Secured 2nd Prize with ₹2,000 cash at the state-level hackathon organized by Rajapalayam Raju's College of Arts and Science."
              type="hackathon"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="1st Prize · Tri Fusion"
              description="Won 1st Prize in the Softech Association Event - “Tri Fusion” at Ayya Nadar Janaki Ammal College."
              type="trifusion"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="3rd Prize · Blind Spot"
              description="Won 3rd Prize in the Softech Association Event - “Blind Spot” at Ayya Nadar Janaki Ammal College."
              type="blindspot"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="1st Prize · Essay Writing"
              description="Won 1st Prize in the Essay Writing Competition organized by Kanthaga Tamil Ilakiya Mandram at Ayya Nadar Janaki Ammal College."
              type="essay"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="3rd Prize · Short Film Making"
              description="Won 3rd Prize in the Short Film Making Competition held as part of the INNOVEXA Intercollegiate Meet, organized by G. Venkatasawamy Naidu College, Kovilpatti."
              type="shortfilm"
            />
            <AssociationNote
              boardRef={noticeboardRef}
              title="4th Prize · Techkathon"
              description="Secured 4th Prize with ₹2,500 cash at Techkathon (Technical Hackathon) during E-Summit, PSG College of Arts and Science, Coimbatore."
              type="techkathon"
            />
          </div>
          
        </section>
        <section className="recognition-section" id="certificates" aria-labelledby="certificates-title">
          <h2 className="recognition-title" id="certificates-title">Certifications</h2>
          <div className="certificate-list">
            <a
              className="certificate-frame certificate-frame-link"
              href="https://drive.google.com/file/d/1JZaGv2H4O0WU525a9fO8eyLaGBTgAad2/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="certificate-kicker">Certificate of Completion</span>
              <h3>Full Stack Development</h3>
              <p>Certification Course · NoviTech</p>
              <span className="certificate-year"><NumericText>2025</NumericText></span>
            </a>
            <a
              className="certificate-frame certificate-frame-link"
              href="https://drive.google.com/file/d/1zFGUUfKkO4WJ_9IGD6zgsUojHAOgsTao/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="certificate-kicker">Certificate of Achievement</span>
              <h3>Programming in Java</h3>
              <p>Certification Course · NPTEL</p>
              <span className="certificate-year"><NumericText>2025</NumericText></span>
            </a>
            <article className="certificate-frame">
              <span className="certificate-kicker">Certificate of Completion</span>
              <h3>Python for Data Science</h3>
              <p>Ayya Nadar Janaki Ammal College</p>
              <span className="certificate-year"><NumericText>2025</NumericText></span>
            </article>
            <a
              className="certificate-frame certificate-frame-machine-learning certificate-frame-link"
              href="https://drive.google.com/file/d/1iw9gGiI_y1oozeu3sU4L4Q86srXabv_o/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="certificate-kicker">Certificate of Completion</span>
              <h3 className="certificate-title-two-lines">
                Machine Learning and Deep Learning
                <br />
                Fundamentals and Applications
              </h3>
              <p>Certification Course · NPTEL</p>
            </a>
          </div>
        </section>
      </main>
      <footer className="contact-footer" id="contact" aria-labelledby="contact-title">
          <h2 className="recognition-title" id="contact-title">Contact</h2>
          <div className="contact-layout">
            <div className="contact-grid">
              <article className="contact-item">
                <span className="contact-label">Phone</span>
                <button className="contact-phone-button" type="button" onClick={openPhoneChooser}>
                  9486520377
                </button>
              </article>
              <article className="contact-item">
                <span className="contact-label">Email</span>
                <button className="contact-email-button" type="button" onClick={openMailComposer}>
                  <NumericText>balajisundar2296@gmail.com</NumericText>
                </button>
              </article>
              <article className="contact-item">
                <span className="contact-label">GitHub</span>
                <a href="https://github.com/balajisunadaraj" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </article>
              <article className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/balaji-sundaraj-b41249426?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </article>
              <article className="contact-item">
                <span className="contact-label">Address</span>
                <address>2/226, Vinayagar Colony, Naranapuram, Sivakasi-626189</address>
              </article>
            </div>
            <aside className="contact-location" aria-label="Balaji's location">
              <div className="contact-map-frame">
                <iframe
                  title="Map marking Balaji's location"
                  src="https://maps.google.com/maps?q=9.444667,77.838528+(Balaji)&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                className="contact-map-link"
                href="https://www.google.com/maps/search/?api=1&query=9.444667%2C77.838528"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </aside>
          </div>
      </footer>
      {isMailComposerOpen && (
        <div className="mail-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeMailComposer()
        }}>
          <section className="mail-modal" role="dialog" aria-modal="true" aria-labelledby="mail-modal-title">
            <button
              className="mail-modal-close"
              type="button"
              aria-label="Close email form"
              onClick={closeMailComposer}
            >
              ×
            </button>
            <h2 id="mail-modal-title">Send a Message</h2>
            <form onSubmit={handleMailSubmit}>
              <label>
                To
                <output className="mail-modal-readonly">
                  <NumericText>balajisundar2296@gmail.com</NumericText>
                </output>
              </label>
              <label>
                From
                <input name="from" type="email" placeholder="Your email address" required />
              </label>
              <label>
                Caption
                <input name="subject" type="text" placeholder="Subject" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" placeholder="Write your message" required />
              </label>
              <button className="mail-send-button" type="submit">Open Gmail to Send</button>
            </form>
          </section>
        </div>
      )}
      {isPhoneChooserOpen && (
        <div className="phone-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closePhoneChooser()
        }}>
          <section className="phone-modal" role="dialog" aria-modal="true" aria-labelledby="phone-modal-title">
            <button
              className="phone-modal-close"
              type="button"
              aria-label="Close phone options"
              onClick={closePhoneChooser}
            >
              ×
            </button>
            <h2 id="phone-modal-title">Choose an option</h2>
            <p><NumericText>9486520377</NumericText></p>
            <div className="phone-modal-actions">
              <a href="tel:+919486520377" onClick={closePhoneChooser}>Call</a>
              <a
                href="https://wa.me/919486520377"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closePhoneChooser}
              >
                WhatsApp
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
