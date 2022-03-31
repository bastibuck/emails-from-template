const triggerVorlage1Btn = document.querySelector("#fill-email-1");
const triggerVorlage2Btn = document.querySelector("#fill-email-2");
const inputText = document.querySelector("#email-data");

const salutation = document.querySelector("#salutation");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const date = document.querySelector("#meeting-date");
const time = document.querySelector("#meeting-time");

const subject1Input = document.querySelector("#subject1");
const vorlage1TextArea = document.querySelector("#vorlage1");
const subject2Input = document.querySelector("#subject2");
const vorlage2TextArea = document.querySelector("#vorlage2");

chrome.storage.local.get(["subject1"], function ({ subject1 }) {
  subject1Input.value = subject1 ?? "";
});

chrome.storage.local.get(["vorlage1"], function ({ vorlage1 }) {
  vorlage1TextArea.value = vorlage1 ?? "";
});

chrome.storage.local.get(["subject2"], function ({ subject2 }) {
  subject2Input.value = subject2 ?? "";
});

chrome.storage.local.get(["vorlage2"], function ({ vorlage2 }) {
  vorlage2TextArea.value = vorlage2 ?? "";
});

triggerVorlage1Btn.addEventListener("click", () => messageContentScript(1));
triggerVorlage2Btn.addEventListener("click", () => messageContentScript(2));

subject1Input.addEventListener("input", function (event) {
  chrome.storage.local.set({ subject1: event.target.value });
});

vorlage1TextArea.addEventListener("input", function (event) {
  chrome.storage.local.set({ vorlage1: event.target.value });
});

subject2Input.addEventListener("input", function (event) {
  chrome.storage.local.set({ subject2: event.target.value });
});

vorlage2TextArea.addEventListener("input", function (event) {
  chrome.storage.local.set({ vorlage2: event.target.value });
});

inputText.addEventListener("input", function (event) {
  const cols = event.target.value.split(";");

  salutation.value =
    cols[0] === "weiblich" ? "Frau" : cols[0] === "männlich" ? "Herr" : "";
  lastName.value = cols[1] ?? "";
  email.value = cols[2] ?? "";

  const [dateValue, timeValue] = cols[3]
    ? cols[3].replace(" Uhr", "").split(" ")
    : ["", ""];

  date.value = `2022-${dateValue.split(".")[0]}-${dateValue.split(".")[1]}`;
  time.value = timeValue;
});

function messageContentScript(vorlage) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let newBody = "";

    if (vorlage === 1) {
      newBody = vorlage1TextArea.value;
    }

    if (vorlage === 2) {
      newBody = vorlage2TextArea.value;
    }

    newBody = newBody.replace(/###salutation###/g, salutation.value);
    newBody = newBody.replace(/###lastname###/i, lastName.value);
    newBody = newBody.replace(/###date###/g, date.value);
    newBody = newBody.replace(/###time###/g, time.value);

    const payload = {
      subject: `Neue E-Mail aus Vorlage ${vorlage} an `,
      body: newBody,
      to: email.value,
    };

    chrome.tabs.sendMessage(tabs[0].id, payload, function (response) {
      window.close();
    });
  });
}
