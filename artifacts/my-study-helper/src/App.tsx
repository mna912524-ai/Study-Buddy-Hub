import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { searchStudyTopics, studySubjects, type StudyQuestion, type StudySubject, type StudyTopic } from '@/data/studyContent';
import {
  ArrowDownRight, ArrowRight, BookOpen, BookmarkCheck, Check, CheckCircle2,
  ChevronDown, CircleHelp, ClipboardList, Compass, GraduationCap, Lightbulb,
  ListChecks, Menu, MessageCircle, RotateCcw, Search, Sparkles, Target,
  X,
} from 'lucide-react';

type QuizQuestion = StudyQuestion;
type Topic = StudyTopic;
type Subject = StudySubject;
const subjects = studySubjects;

const readStringList = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : [];
const getQuiz = (topic?: Topic): QuizQuestion[] => topic?.quiz ?? [];
const safeText = (value: unknown) => typeof value === 'string' ? value.trim() : '';

function App() {
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? '');
  const selectedSubject = subjects.find((subject) => subject.id === subjectId) ?? subjects[0];
  const [topicId, setTopicId] = useState(selectedSubject?.topics?.[0]?.id ?? '');
  const selectedTopic = selectedSubject?.topics?.find((topic) => topic.id === topicId) ?? selectedSubject?.topics?.[0];
  const [activeSection, setActiveSection] = useState('overview');
  const [askText, setAskText] = useState('');
  const [askResponse, setAskResponse] = useState('');
  const [askPrompt, setAskPrompt] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('study-helper-checklist') || '[]') as string[]; }
    catch { return []; }
  });
  const [quizScore, setQuizScore] = useState<number>(() => {
    try { return Number(localStorage.getItem('study-helper-score') || '0') || 0; }
    catch { return 0; }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const questions = getQuiz(selectedTopic);
  const currentQuestion = questions[quizIndex];
  const allTopics = useMemo(() => subjects.flatMap((subject) =>
    (subject.topics ?? []).map((topic) => ({ subject, topic })),
  ), []);
  const completedCount = checklist.length;
  const allTaskCount = subjects.reduce((total, subject) => total + (subject.topics?.length ?? 0) * 3, 0);

  useEffect(() => {
    localStorage.setItem('study-helper-checklist', JSON.stringify(checklist));
  }, [checklist]);
  useEffect(() => {
    localStorage.setItem('study-helper-score', String(quizScore));
  }, [quizScore]);
  useEffect(() => {
    setTopicId(selectedSubject?.topics?.[0]?.id ?? '');
    setQuizIndex(0);
    setSelectedAnswer(null);
  }, [subjectId]);
  useEffect(() => {
    setQuizIndex(0);
    setSelectedAnswer(null);
  }, [topicId]);

  const sections = [
    { id: 'overview', label: 'Study notes', icon: BookOpen },
    { id: 'questions', label: 'Important questions', icon: CircleHelp },
    { id: 'practice', label: 'Quick practice', icon: Target },
    { id: 'ask', label: 'Ask a question', icon: MessageCircle },
    { id: 'plan', label: 'My study list', icon: ListChecks },
  ];

  const jumpTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const toggleTask = (key: string) => setChecklist((old) =>
    old.includes(key) ? old.filter((item) => item !== key) : [...old, key],
  );
  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = askText.trim();
    if (!query) return;
    setAskPrompt(query);
    const matchedTopics = searchStudyTopics(query);
    const matches = matchedTopics.map((topic) => {
      const subject = subjects.find((item) => item.topics.some((candidate) => candidate.id === topic.id));
      return subject ? { subject, topic } : undefined;
    }).filter((item): item is { subject: Subject; topic: Topic } => Boolean(item));
    if (matches.length === 0) {
      setAskResponse('I could not find that in the study notes yet. Try a topic name or a key term from the chapter, and I will look through the built-in content.');
      return;
    }
    const best = matches[0];
    const details = [
      safeText(best.topic.overview),
      ...(best.topic.keyPoints ?? []).slice(0, 3),
      safeText(best.topic.example),
    ].filter(Boolean);
    setAskResponse(`${best.subject.name} · ${best.topic.title}\n\n${details.join('\n\n') || 'Open the topic notes above to review this section.'}`);
  };
  const pickAnswer = (index: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;
    setSelectedAnswer(index);
    if (index === currentQuestion.answerIndex) setQuizScore((score) => score + 1);
  };
  const nextQuestion = () => {
    setQuizIndex((index) => index + 1 >= questions.length ? 0 : index + 1);
    setSelectedAnswer(null);
  };
  const resetPractice = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
  };
  const topicTasks = selectedTopic ? [
    { id: `${selectedTopic.id}:read`, label: `Read ${selectedTopic.title} notes` },
    { id: `${selectedTopic.id}:questions`, label: 'Review the important questions' },
    { id: `${selectedTopic.id}:practice`, label: 'Try a quick practice question' },
  ] : [];
  const progressPercent = allTaskCount > 0 ? Math.min(100, Math.round(completedCount / allTaskCount * 100)) : 0;

  return (
    <div className="min-h-[100dvh] bg-[#f3f8fd] text-[#1d3551]">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} data-testid="link-home">
            <span className="brand-mark"><GraduationCap size={21} strokeWidth={2.2} /></span>
            <span className="brand-copy"><strong>My Study Helper</strong><small>Class 12 · your study space</small></span>
          </a>
          <div className="header-note"><span className="status-dot" /> Here whenever you need a hand</div>
          <button className="mobile-menu-button" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenuOpen((open) => !open)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      <div className="app-layout" id="top">
        <aside className={`side-rail ${mobileMenuOpen ? 'side-rail-open' : ''}`} aria-label="Study navigation">
          <div className="rail-label">YOUR DESK</div>
          {sections.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`rail-link ${activeSection === id ? 'rail-link-active' : ''}`} onClick={() => jumpTo(id)} data-testid={`nav-${id}`}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{activeSection === id && <span className="rail-active-mark" />}
            </button>
          ))}
          <div className="rail-progress">
            <div className="rail-progress-icon"><BookmarkCheck size={17} /></div>
            <span className="rail-progress-label">Your progress</span>
            <strong>{progressPercent}%</strong>
            <div className="progress-track"><span style={{ width: `${progressPercent}%` }} /></div>
            <small>{completedCount} study steps checked off</small>
          </div>
          <div className="rail-footnote">Small steps count.<br />Keep going at your pace.</div>
        </aside>

        <main className="main-content page-enter">
          <section className="welcome-strip">
            <div className="welcome-copy">
              <span className="eyebrow"><span className="eyebrow-line" /> A little clearer, one topic at a time</span>
              <h1>Good to see you.<br /><em>Let’s make this click.</em></h1>
              <p>Pick a subject, find a topic, and take the next small step.</p>
            </div>
            <div className="welcome-illustration" aria-hidden="true">
              <div className="sun-disc" />
              <div className="book-stack"><div /><div /><div /></div>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="sparkle sparkle-one" /><div className="sparkle sparkle-two" />
              <div className="illus-note">one page<br />at a time</div>
            </div>
          </section>

          <section className="find-topic panel" aria-label="Choose subject and topic">
            <div className="section-kicker"><Compass size={16} /> START HERE</div>
            <div className="finder-row">
              <label className="select-field">
                <span>Subject</span>
                <span className="select-wrap">
                  <select value={selectedSubject?.id ?? ''} onChange={(event) => setSubjectId(event.target.value)} aria-label="Choose a subject" data-testid="select-subject">
                    {subjects.length === 0 && <option value="">No subjects available</option>}
                    {subjects.map((subject) => <option value={subject.id} key={subject.id}>{subject.name}</option>)}
                  </select><ChevronDown size={17} />
                </span>
              </label>
              <label className="select-field">
                <span>Topic</span>
                <span className="select-wrap">
                  <select value={selectedTopic?.id ?? ''} onChange={(event) => setTopicId(event.target.value)} aria-label="Choose a topic" data-testid="select-topic">
                    {(selectedSubject?.topics ?? []).length === 0 && <option value="">No topics available</option>}
                    {(selectedSubject?.topics ?? []).map((topic) => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
                  </select><ChevronDown size={17} />
                </span>
              </label>
              <button className="primary-button finder-button" onClick={() => jumpTo('overview')} disabled={!selectedTopic} data-testid="button-open-topic">
                Open topic <ArrowRight size={17} />
              </button>
            </div>
            {!selectedTopic && <div className="data-empty" data-testid="status-no-content"><BookOpen size={20} /><span>Study material will appear here as soon as it is added.</span></div>}
          </section>

          <div className="content-grid">
            <div className="lesson-column">
              <section className="lesson-section" id="overview">
                <div className="section-heading">
                  <div><div className="section-kicker"><BookOpen size={16} /> THE SHORT VERSION</div><h2>Start with the idea</h2></div>
                  {selectedTopic && <span className="topic-chip">{selectedSubject?.name}</span>}
                </div>
                {selectedTopic ? (
                  <article className="topic-card panel">
                    <div className="topic-card-top">
                      <div><span className="topic-overline">YOUR CURRENT TOPIC</span><h3>{selectedTopic.title}</h3></div>
                      <div className="topic-number"><span>01</span><ArrowDownRight size={19} /></div>
                    </div>
                    <p className="overview-text">{safeText(selectedTopic.overview) || 'Take a moment to explore the key ideas in this topic.'}</p>
                    {readStringList(selectedTopic.keyPoints).length > 0 && (
                      <div className="keypoints-wrap">
                        <h4><Sparkles size={15} /> Keep these in mind</h4>
                        <ul className="keypoints-list">{readStringList(selectedTopic.keyPoints).map((point, index) => <li key={`${selectedTopic.id}-point-${index}`}><span className="point-bullet">{String(index + 1).padStart(2, '0')}</span><span>{point}</span></li>)}</ul>
                      </div>
                    )}
                    {safeText(selectedTopic.example) && <div className="example-box"><div className="example-label"><Lightbulb size={15} /> A quick example</div><p>{safeText(selectedTopic.example)}</p></div>}
                    <button className={`inline-check ${checklist.includes(topicTasks[0]?.id ?? '') ? 'inline-check-done' : ''}`} onClick={() => topicTasks[0] && toggleTask(topicTasks[0].id)} data-testid="button-mark-read">
                      {checklist.includes(topicTasks[0]?.id ?? '') ? <CheckCircle2 size={16} /> : <Check size={16} />}
                      {checklist.includes(topicTasks[0]?.id ?? '') ? 'Notes read — nice work' : 'Mark these notes as read'}
                    </button>
                  </article>
                ) : (
                  <EmptyCard icon={<BookOpen size={23} />} title="No notes just yet" detail="Choose another subject or check back when study content is available." />
                )}
              </section>

              <section className="lesson-section" id="questions">
                <div className="section-heading">
                  <div><div className="section-kicker"><CircleHelp size={16} /> EXAM-READY THINKING</div><h2>Important questions</h2></div>
                  {selectedTopic && <span className="count-pill">{readStringList(selectedTopic.importantQuestions).length} prompts</span>}
                </div>
                {selectedTopic && readStringList(selectedTopic.importantQuestions).length ? (
                  <div className="question-list panel">
                    {readStringList(selectedTopic.importantQuestions).map((question, index) => (
                      <div className="important-question" key={`${selectedTopic.id}-question-${index}`}>
                        <span className="question-index">{String(index + 1).padStart(2, '0')}</span>
                        <p data-testid={`text-important-question-${index}`}>{question}</p>
                        <button className="question-ask" aria-label={`Ask about question ${index + 1}`} onClick={() => { setAskText(question); setAskPrompt(''); setAskResponse(''); jumpTo('ask'); }} data-testid={`button-ask-question-${index}`}><ArrowRight size={17} /></button>
                      </div>
                    ))}
                    <button className={`inline-check questions-check ${checklist.includes(topicTasks[1]?.id ?? '') ? 'inline-check-done' : ''}`} onClick={() => topicTasks[1] && toggleTask(topicTasks[1].id)} data-testid="button-mark-questions">
                      {checklist.includes(topicTasks[1]?.id ?? '') ? <CheckCircle2 size={16} /> : <Check size={16} />}
                      {checklist.includes(topicTasks[1]?.id ?? '') ? 'Questions reviewed' : 'Mark questions reviewed'}
                    </button>
                  </div>
                ) : <EmptyCard icon={<CircleHelp size={23} />} title="No questions listed for this topic" detail="You can still ask a question about the notes below." />}
              </section>

              <section className="lesson-section" id="practice">
                <div className="section-heading">
                  <div><div className="section-kicker"><Target size={16} /> LOW-PRESSURE PRACTICE</div><h2>Quick practice</h2></div>
                  {questions.length > 0 && <span className="count-pill">{quizIndex + 1} of {questions.length}</span>}
                </div>
                {currentQuestion ? (
                  <div className="quiz-card panel">
                    <div className="quiz-head"><span className="quiz-label">CHECK YOUR UNDERSTANDING</span><span className="score-badge"><Target size={14} /> {quizScore} correct</span></div>
                    <h3>{currentQuestion.prompt}</h3>
                    <div className="answer-list" role="group" aria-label="Answer choices">
                      {currentQuestion.options.map((option, index) => {
                        const isCorrect = selectedAnswer !== null && index === currentQuestion.answerIndex;
                        const isWrong = selectedAnswer === index && index !== currentQuestion.answerIndex;
                        return <button key={`${quizIndex}-${index}`} className={`answer-option ${selectedAnswer === index ? 'answer-selected' : ''} ${isCorrect ? 'answer-correct' : ''} ${isWrong ? 'answer-wrong' : ''}`} disabled={selectedAnswer !== null} onClick={() => pickAnswer(index)} data-testid={`button-answer-${index}`}>
                          <span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{isCorrect && <CheckCircle2 size={18} className="answer-result-icon" />}
                        </button>;
                      })}
                    </div>
                    {selectedAnswer !== null && <div className={`answer-feedback ${selectedAnswer === currentQuestion.answerIndex ? 'feedback-correct' : 'feedback-wrong'}`} role="status" data-testid="status-quiz-feedback">
                      <strong>{selectedAnswer === currentQuestion.answerIndex ? 'That’s right.' : 'Not quite — keep going.'}</strong>
                      {safeText(currentQuestion.explanation) && <span>{currentQuestion.explanation}</span>}
                    </div>}
                    <div className="quiz-footer">
                      <span>{selectedAnswer === null ? 'Choose the answer that feels right.' : 'A little practice adds up.'}</span>
                      {selectedAnswer !== null && <button className="text-button" onClick={nextQuestion} data-testid="button-next-question">Next question <ArrowRight size={15} /></button>}
                    </div>
                    {selectedAnswer !== null && <button className="reset-quiz" onClick={resetPractice} data-testid="button-reset-practice"><RotateCcw size={14} /> Start this set again</button>}
                  </div>
                ) : (
                  <EmptyCard icon={<Target size={23} />} title="Practice questions will show up here" detail="This topic does not have a quiz yet. You can still review its notes and key questions." />
                )}
                {selectedTopic && questions.length > 0 && <button className={`inline-check practice-check ${checklist.includes(topicTasks[2]?.id ?? '') ? 'inline-check-done' : ''}`} onClick={() => topicTasks[2] && toggleTask(topicTasks[2].id)} data-testid="button-mark-practice">
                  {checklist.includes(topicTasks[2]?.id ?? '') ? <CheckCircle2 size={16} /> : <Check size={16} />}
                  {checklist.includes(topicTasks[2]?.id ?? '') ? 'Practice complete' : 'Mark practice complete'}
                </button>}
              </section>

              <section className="lesson-section" id="ask">
                <div className="section-heading">
                  <div><div className="section-kicker"><MessageCircle size={16} /> GROUNDED IN YOUR NOTES</div><h2>Ask about a topic</h2></div>
                </div>
                <div className="ask-card panel">
                  <div className="ask-intro"><div className="ask-icon"><MessageCircle size={19} /></div><div><strong>What are you stuck on?</strong><p>Answers come from the study material on this page.</p></div></div>
                  <form className="ask-form" onSubmit={submitQuestion}>
                    <label className="sr-only" htmlFor="ask-input">Ask a question or enter a topic</label>
                    <input id="ask-input" value={askText} onChange={(event) => setAskText(event.target.value)} placeholder="Try a topic name or question…" data-testid="input-ask-question" />
                    <button className="primary-button ask-submit" type="submit" disabled={!askText.trim()} data-testid="button-submit-question"><span>Find help</span><ArrowRight size={17} /></button>
                  </form>
                  {!askResponse && <div className="ask-suggestions"><span>Try:</span>
                    {(selectedTopic ? [selectedTopic.title, ...readStringList(selectedTopic.importantQuestions).slice(0, 1)] : allTopics.slice(0, 2).map(({ topic }) => topic.title)).map((suggestion, index) => <button key={`${suggestion}-${index}`} onClick={() => { setAskText(suggestion); setAskPrompt(''); setAskResponse(''); }} data-testid={`button-suggestion-${index}`}>{suggestion}</button>)}
                  </div>}
                  {askResponse && <div className="answer-panel" role="status" data-testid="status-ask-answer"><div className="answer-panel-top"><span><Sparkles size={15} /> STUDY NOTES</span><button onClick={() => { setAskResponse(''); setAskPrompt(''); }} aria-label="Clear answer" data-testid="button-clear-answer"><X size={16} /></button></div><p className="asked-prompt">You asked: {askPrompt}</p><p className="answer-copy">{askResponse}</p></div>}
                  <p className="local-note"><span /> No account, no outside AI — just the content provided here.</p>
                </div>
              </section>
            </div>

            <aside className="right-column">
              <section className="study-list-card panel" id="plan">
                <div className="list-card-head"><div><span className="section-kicker"><ClipboardList size={15} /> YOUR LITTLE PLAN</span><h2>My study list</h2></div><span className="list-icon"><ListChecks size={19} /></span></div>
                <p className="list-description">Three gentle steps for this topic. Check them off as you go.</p>
                {topicTasks.length > 0 ? <div className="study-tasks">
                  {topicTasks.map((task, index) => {
                    const checked = checklist.includes(task.id);
                    return <button key={task.id} className={`study-task ${checked ? 'study-task-done' : ''}`} onClick={() => toggleTask(task.id)} data-testid={`button-task-${index}`}>
                      <span className="task-checkbox">{checked && <Check size={13} />}</span><span className="task-label">{task.label}</span>
                    </button>;
                  })}
                </div> : <div className="checklist-empty"><span className="empty-check"><Check size={16} /></span><p>Your study steps will appear when you choose a topic.</p></div>}
                <div className="list-progress"><div className="list-progress-top"><span>OVERALL PROGRESS</span><strong>{progressPercent}%</strong></div><div className="progress-track"><span style={{ width: `${progressPercent}%` }} /></div><p>{completedCount ? `${completedCount} ${completedCount === 1 ? 'step' : 'steps'} completed. You’re building momentum.` : 'Every finished step is a win.'}</p></div>
                <button className="clear-progress" onClick={() => { if (checklist.length && window.confirm('Clear all checked study steps?')) setChecklist([]); }} disabled={checklist.length === 0} data-testid="button-clear-progress">Clear checked steps</button>
              </section>
              <section className="encouragement-card">
                <div className="encouragement-symbol"><span /><span /><span /></div>
                <span className="encouragement-label">A NOTE TO SELF</span>
                <p>You don’t have to know it all today. Just understand the next thing.</p>
                <div className="encouragement-rule" />
                <span className="encouragement-signoff">Steady is strong.</span>
              </section>
              <section className="catalog-card panel">
                <div className="catalog-head"><Search size={16} /><h3>Explore topics</h3></div>
                {allTopics.length ? <div className="catalog-topics">
                  {allTopics.map(({ subject, topic }, index) => <button key={`${subject.id}-${topic.id}`} className={`catalog-topic ${selectedTopic?.id === topic.id ? 'catalog-topic-active' : ''}`} onClick={() => { setSubjectId(subject.id); setTopicId(topic.id); setActiveSection('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} data-testid={`button-catalog-topic-${index}`}>
                    <span className="catalog-dot" /><span><small>{subject.name}</small><strong>{topic.title}</strong></span><ArrowRight size={15} />
                  </button>)}
                </div> : <p className="catalog-empty">Your topic library will be ready here.</p>}
              </section>
            </aside>
          </div>
          <footer className="page-footer"><span>MY STUDY HELPER</span><span>Built for your next small step.</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-back-to-top">Back to top <ArrowDownRight size={14} /></button></footer>
        </main>
      </div>
    </div>
  );
}

function EmptyCard({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return <div className="empty-card panel" data-testid="status-empty-content"><span className="empty-card-icon">{icon}</span><div><strong>{title}</strong><p>{detail}</p></div></div>;
}

export default App;
