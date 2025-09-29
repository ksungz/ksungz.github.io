/**
 * 간단한 마크다운 렌더링 유틸리티
 * 기본적인 마크다운 문법을 HTML로 변환
 */
export const renderMarkdown = (markdown) => {
  return markdown
    // 코드 블록 (``` 감싸진 부분)
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // 인라인 코드 (` 감싸진 부분)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 헤딩
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // 볼드
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 이탤릭
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 링크
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // 줄바꿈
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // 문단 감싸기
    .replace(/^(?!<[h1-6]|<pre|<ul|<ol)(.+)/gm, '<p>$1</p>')
    // 빈 문단 제거
    .replace(/<p><\/p>/g, '')
    // 연속된 br 태그 정리
    .replace(/(<br>){3,}/g, '<br><br>');
};

