chrome.runtime.onMessage.addListener(async (payload, sender, sendResponse) => {
  const subjectField = document.querySelector(
    "[placeholder='Betreff hinzufügen']"
  );
  subjectField.value = payload.subject;

  const bodyField = document.querySelector("[aria-label='Nachrichtentext']");
  bodyField.innerHTML = payload.body;

  return true;
});
