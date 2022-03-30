chrome.runtime.onMessage.addListener(async (payload, sender, sendResponse) => {
  console.log({ payload });

  // TODO! set values of fields based on payload

  const body = document.createElement("div");
  body.innerText = payload.body;

  const subject = document.createElement("h1");
  subject.innerText = payload.subject + payload.to;

  document.body.innerHTML = ``;
  document.body.append(subject, body);

  return true;
});
