chrome.runtime.onMessage.addListener(async (payload, sender, sendResponse) => {
  // fill to field
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.value = payload.to;
  input.focus();
  input.select();
  document.execCommand("copy");

  const toField = document.querySelector("[aria-label='An']");
  toField.focus();
  document.execCommand("paste");

  // fill subject field
  input.value = payload.subject;
  input.focus();
  input.select();
  document.execCommand("copy");

  const subjectField = document.querySelector(
    "[placeholder='Betreff hinzufügen']"
  );
  subjectField.focus();
  document.execCommand("paste");
  subjectField.blur();

  // remove fake input
  input.remove();

  const bodyField = document.querySelector("[aria-label='Nachrichtentext']");
  bodyField.innerHTML = payload.body;

  return true;
});
