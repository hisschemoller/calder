const loggerEl = document.getElementById('logger');
const panelEl = loggerEl?.querySelector('.logger_panel');
const messages: string[] = [];

export default function log(message: string) {
  messages.push(message);
  if (panelEl) {
    panelEl.textContent = messages.join('\n');
  }
}
